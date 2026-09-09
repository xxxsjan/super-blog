/**
 * 中英混合分词：中文双字（单字保留），英文/数字按词
 * 建索引与前端搜索必须使用同一实现
 */
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
