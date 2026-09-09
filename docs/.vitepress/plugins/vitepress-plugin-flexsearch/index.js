import MarkdownIt from "markdown-it";
import FlexSearch from "flexsearch";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { tokenize } from "./tokenize.js";

const md = new MarkdownIt();
const Index = FlexSearch.Index || FlexSearch;
const searchVue = fileURLToPath(new URL("./Search.vue", import.meta.url));

const DEFAULT_OPTIONS = {
  previewLength: 80,
  buttonLabel: "搜索",
  placeholder: "请输入关键词",
};

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
  const index = new Index({
    encode: (str) => tokenize(str),
    tokenize: "forward",
  });
  for (const doc of docs) index.add(doc.id, doc.text);

  const previewLength = options.previewLength;
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
    buttonLabel: options.buttonLabel,
    placeholder: options.placeholder,
  };

  // 双层 JSON：避免 Vite 转换巨型 object literal 时弄坏转义
  return `export default JSON.parse(${JSON.stringify(
    JSON.stringify({ INDEX_DATA, PREVIEW_LOOKUP, Options })
  )})`;
}

/**
 * VitePress 本地中文搜索插件（FlexSearch）
 *
 * @example
 * // docs/vite.config.js
 * import { SearchPlugin } from './.vitepress/plugins/vitepress-plugin-flexsearch/index.js'
 * export default defineConfig({
 *   plugins: [SearchPlugin({ buttonLabel: '搜索' })]
 * })
 *
 * // themeConfig.search 请留空，避免与内置/Algolia 搜索按钮重复
 *
 * @param {object} [options]
 * @param {number} [options.previewLength=80]
 * @param {string} [options.buttonLabel='搜索']
 * @param {string} [options.placeholder='请输入关键词']
 */
export function SearchPlugin(options = {}) {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const virtualId = "virtual:search-data";
  const resolvedVirtual = "\0" + virtualId;
  let root = "";

  return {
    name: "vitepress-plugin-flexsearch",
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
      console.log("  🔎 Indexing (vitepress-plugin-flexsearch)...");
      const docs = await buildDocs(root);
      const code = buildIndexPayload(docs, opts);
      console.log("  🔎 Done.", docs.length, "sections");
      return code;
    },
  };
}

/** @deprecated 使用 SearchPlugin */
export const LocalFlexSearchPlugin = SearchPlugin;

export { tokenize };
export default SearchPlugin;
