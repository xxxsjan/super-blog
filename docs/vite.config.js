import { defineConfig } from "vite";
import { SearchPlugin } from "./.vitepress/plugins/vitepress-plugin-flexsearch/index.js";
import { searchProvider } from "./.vitepress/config/searchProvider.js";

export default defineConfig({
  plugins:
    searchProvider === "flexsearch"
      ? [
          SearchPlugin({
            previewLength: 80,
            buttonLabel: "搜索",
            placeholder: "请输入关键词",
          }),
        ]
      : [],
});
