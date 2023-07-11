import head from "./config/head";
import themeConfig from "./config/themeConfig";

const baseMap = {
  production: "/blog-vitepress/",
  github: "/blog-vitepress/",
  vercel: "/",
};

// console.log(baseMap[process.env.BUILD_ENV || process.env.NODE_ENV]);
// console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);
// console.log("process.env.BUILD_ENV: ", process.env.BUILD_ENV);

// https://vitepress.vuejs.org/config/app-configs

/** @type {import("vitepress").LocaleConfig}  **/
const config = {
  base: baseMap[process.env.BUILD_ENV || process.env.NODE_ENV] || "/", // 会影响部署的读取路径
  appearance: true, // Whether to enable dark mode or not. Default: true
  lang: "zh-cn", // build时才会放到html标签里
  title: "so~blog",
  description: "记录前端学习", // 站点的描述。 这将作为<meta>标记渲染在页面HTML中。
  lastUpdated: true,
  head,
  // srcDir: useLocalDoc ? './' : '../../web-note/docs', // Default: .--The directory where your markdown pages are stored, relative to project root.
  markdown: {
    lineNumbers: false,
    // options for markdown-it-anchor
    anchor: { permalink: false },
    // options for markdown-it-toc
    toc: { includeLevel: [1, 2] },
    config: (md) => {
      // use more markdown-it plugins!
      // md.use(require('markdown-it-xxx'));
    },
  },
  themeConfig,
};

module.exports = config;
