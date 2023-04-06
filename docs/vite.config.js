import { SearchPlugin } from "vitepress-plugin-search";
import { defineConfig } from "vite";
import flexSearchIndexOptions from "flexsearch";
// https://chodocs.cn/program/vitepress-local-search/
//default options
var options = {
  ...flexSearchIndexOptions,
  previewLength: 100, //搜索结果预览长度
  buttonLabel: "搜索",
  placeholder: "请输入英文关键词（本地搜索暂不支持中文）",
};

export default defineConfig({
  plugins: [SearchPlugin(options)],
});
