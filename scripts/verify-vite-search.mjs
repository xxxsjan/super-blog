import FlexSearch from "flexsearch";

function tokenize(text) {
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
      if (run.length === 1) tokens.push(run);
      else {
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

const ports = [5173, 5174, 5175];
let text = "";
let port = null;
for (const p of ports) {
  try {
    const res = await fetch(
      `http://127.0.0.1:${p}/@id/virtual:search-data?t=${Date.now()}`
    );
    if (res.ok) {
      text = await res.text();
      port = p;
      break;
    }
  } catch {}
}
if (!port) {
  console.log("no server");
  process.exit(1);
}

const data = new Function(text.replace("export default", "return"))();
const index = new FlexSearch.Index({
  encode: (s) => tokenize(s),
  tokenize: "forward",
});
index.import("reg", data.INDEX_DATA.reg);
index.import("map", data.INDEX_DATA.map);
index.import("ctx", data.INDEX_DATA.ctx);

console.log("port", port, "sections", Object.keys(data.PREVIEW_LOOKUP).length);
for (const q of ["数据库", "压缩", "sequelize", "vue"]) {
  const ids = index.search(q, { limit: 8 });
  console.log("\n" + q);
  for (const id of ids) {
    console.log(" -", data.PREVIEW_LOOKUP[id]?.t, "|", data.PREVIEW_LOOKUP[id]?.l);
  }
}
