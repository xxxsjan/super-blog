import MarkdownIt from "markdown-it";
import FlexSearch from "flexsearch";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const md = new MarkdownIt();
const searchVue = fileURLToPath(
  new URL("../components/LocalSearch.vue", import.meta.url)
);

/** 中英混合分词：中文用双字（单字保留），英文/数字按词（需与 LocalSearch.vue 保持一致） */
export function tokenize(text) {
  if (!text) return [];
  const s = String(text).toLowerCase();
  const tokens = [];
  let i = 0;
  while (i < s.length) {
    const ch = s[i];
    if (/[a-z0-9_]/.test(ch)) {
      let j = i + 1;
      while (j < s.length && /[a-z0-9_]/.test(s[j])) j++;
      tokens.push(s.slice(i, j));
      i = j;
      continue;
    }
    if (/[\u4e00-\u9fff]/.test(ch)) {
      let j = i + 1;
      while (j < s.length && /[\u4e00-\u9fff]/.test(s[j])) j++;
      const run = s.slice(i, j);
      if (run.length === 1) {
        tokens.push(run);
      } else {
        for (let k = 0; k < run.length - 1; k++) {
          tokens.push(run.slice(k, k + 2));
        }
      }
      i = j;
      continue;
    }
    i++;
  }
  return tokens;
}

async function walkMarkdown(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.name === "node_modules" || ent.name === ".vitepress") continue;
    if (ent.isDirectory()) out.push(...(await walkMarkdown(full)));
    else if (ent.name.endsWith(".md")) out.push(full);
  }
  return out;
}

function stripMd(content) {
  return content
    .replace(/^---[\s\S]*?---/, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1");
}

function slugify(s) {
  return String(s)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u4e00-\u9fff-]/g, "");
}

async function buildDocs(root) {
  const files = await walkMarkdown(root);
  const docs = [];
  let fileIdx = 0;
  for (const file of files) {
    const raw = await fs.readFile(file, "utf8");
    const content = stripMd(raw);
    const parts = content.split(/(?:^|\n)##\s+/);
    let sectionIdx = 0;
    for (const part of parts) {
      if (!part.trim()) continue;
      const lines = part.split("\n");
      const title = (lines.shift() || path.basename(file, ".md"))
        .trim()
        .replace(/^#+\s*/, "")
        .replace(/\*\*/g, "");
      const body = lines.join("\n").trim();
      const rel = path.relative(root, file).split(path.sep).join("/");
      let link = rel.replace(/\.md$/, ".html");
      const anchor = slugify(title);
      if (sectionIdx > 0 && anchor) link += `#${anchor}`;
      docs.push({
        id: `${fileIdx}.${sectionIdx}`,
        link,
        t: title.replace(/["'\\]/g, " "),
        a: anchor,
        b: body,
        text: `${title} ${body}`,
      });
      sectionIdx++;
    }
    fileIdx++;
  }
  return docs;
}

function buildIndexPayload(docs, options) {
  // FlexSearch 0.7：自定义分词应挂在 encode 上（tokenize 字符串模式才生效）
  const index = new FlexSearch.Index({
    encode: (str) => tokenize(str),
    tokenize: "forward",
  });
  for (const doc of docs) index.add(doc.id, doc.text);

  const previewLength = options.previewLength || 80;
  const PREVIEW_LOOKUP = {};
  for (const doc of docs) {
    let preview = md.render(doc.b || "").replace(/<[^>]+>/g, "");
    if (!preview) preview = doc.b || "";
    if (preview.length > previewLength) {
      preview = preview.slice(0, previewLength) + " ...";
    }
    preview = preview.replace(/["'\\]/g, " ");
    PREVIEW_LOOKUP[doc.id] = {
      t: doc.t,
      p: preview,
      l: doc.link,
      a: doc.a,
    };
  }

  const INDEX_DATA = {
    reg: JSON.stringify(index.registry),
    cfg: JSON.stringify(index.cfg),
    map: JSON.stringify(index.map),
    ctx: JSON.stringify(index.ctx),
  };

  const Options = {
    previewLength,
    buttonLabel: options.buttonLabel || "搜索",
    placeholder: options.placeholder || "请输入关键词",
  };

  // 双层 JSON：避免 Vite 转换巨型 object literal 时弄坏转义（原插件的坑）
  return `export default JSON.parse(${JSON.stringify(
    JSON.stringify({ INDEX_DATA, PREVIEW_LOOKUP, Options })
  )})`;
}

export function LocalFlexSearchPlugin(options = {}) {
  const virtualId = "virtual:search-data";
  const resolvedVirtual = "\0" + virtualId;
  let root = "";

  return {
    name: "local-flex-search",
    enforce: "pre",
    config() {
      return {
        resolve: {
          alias: {
            "./VPNavBarSearch.vue": searchVue,
          },
        },
      };
    },
    configResolved(config) {
      root = config.root;
    },
    resolveId(id) {
      if (id === virtualId) return resolvedVirtual;
    },
    async load(id) {
      if (id !== resolvedVirtual) return;
      console.log("  🔎 Indexing (local-flex-search)...");
      const docs = await buildDocs(root);
      const code = buildIndexPayload(docs, options);
      console.log("  🔎 Done.", docs.length, "sections");
      return code;
    },
  };
}
