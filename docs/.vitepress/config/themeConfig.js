import sidebar from "./sidebar";

/** @type {import("vitepress").DefaultTheme.Config} */
const themeConfig = {
  logo: "/github.png",
  // 搜索
  // algolia: {
  //   apiKey: "your_api_key",
  //   indexName: "index_name",
  // },
  socialLinks: [{ icon: "github", link: "https://github.com/xxxsjan" }],
  footer: {
    message: "Released under the MIT License.",
    copyright: "Copyright © 2022-07-27～present aehyok",
  },
  lastUpdated: true, // 最后更新时间
  // editLinkText: '编辑此页',
  // selectText: '选择语言',
  // sidebarDepth: 2,
  docFooter: {
    prev: "上一篇",
    next: "下一篇",
  },
  sidebar: {
    ...sidebar,
    // "/component/": [
    //   {
    //     text: "文件夹1",
    //     items: [{ text: "icon", link: "/component/icon" }],
    //   },
    //   {
    //     text: "文件夹2",
    //     items: [],
    //   },
    // ],
    "/guide/": [
      {
        text: "Guide",
        items: [
          { text: "Index", link: "/guide/" }, // /guide/index.md
          { text: "One", link: "/guide/one" }, // /guide/one.md
          { text: "Two", link: "/guide/two" }, // /guide/two.md
        ],
      },
    ],
  },
  nav: [
    // 结尾找 index.md 名字结尾找 名字.md
    { text: "首页", link: "/" },
    { text: "笔记", link: "/webnote/" },
    { text: "Guide", link: "/guide/" },
  ],
};
export default themeConfig;
