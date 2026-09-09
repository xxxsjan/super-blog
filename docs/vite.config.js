import { defineConfig } from "vite";
import { LocalFlexSearchPlugin } from "./.vitepress/plugins/localFlexSearch.js";
import { searchProvider } from "./.vitepress/config/searchProvider.js";

export default defineConfig({
  plugins:
    searchProvider === "flexsearch"
      ? [
          LocalFlexSearchPlugin({
            previewLength: 80,
            buttonLabel: "搜索",
            placeholder: "请输入关键词",
          }),
        ]
      : [],
});
