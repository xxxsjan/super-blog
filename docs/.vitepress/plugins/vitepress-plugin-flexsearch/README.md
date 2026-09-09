# vitepress-plugin-flexsearch

VitePress 本地中文搜索（FlexSearch），零 Algolia 依赖。

## 用法

```js
// docs/vite.config.js
import { defineConfig } from "vite";
import { SearchPlugin } from "./.vitepress/plugins/vitepress-plugin-flexsearch/index.js";

export default defineConfig({
  plugins: [
    SearchPlugin({
      previewLength: 80,
      buttonLabel: "搜索",
      placeholder: "请输入关键词",
    }),
  ],
});
```

`themeConfig.search` 请留空（或不要配置 `provider: 'local' | 'algolia'`），以免出现两个搜索按钮。

## 依赖

- `flexsearch`
- `markdown-it`
- `vitepress`
- `vue`
