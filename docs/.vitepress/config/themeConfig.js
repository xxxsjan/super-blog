import sidebar from "./sidebar";
import nav from "./nav";
import crawlerConfig from "../../../crawlerConfig.json";

/** @type {import("vitepress").DefaultTheme.Config} */
const themeConfig = {
  logo: "/code.png",
  // algolia搜索 https://www.algolia.com/apps/YBYUHFPZ1C/dashboard
  algolia: {
    indexName: crawlerConfig.index_name,
    appId: "YBYUHFPZ1C",
    apiKey: "d4076b979399477f79c55eec660730ec",
  },
  // 本地搜索
  // search: {
  //   provider: 'local',
  // },
  socialLinks: [{ icon: "github", link: "https://github.com/xxxsjan" }],
  nav,
  lastUpdated: true, // 最后更新时间
  lastUpdatedText: "最后更新", // 最后更新时间文本配置, 需先配置lastUpdated为true
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
    // "/guide/": [
    //   {
    //     text: "Guide",
    //     items: [
    //       { text: "Index", link: "/guide/" }, // /guide/index.md
    //       { text: "One", link: "/guide/one" }, // /guide/one.md
    //       { text: "Two", link: "/guide/two" }, // /guide/two.md
    //     ],
    //   },
    // ],
  },
  footer: {
    message: "粤ICP备2021026613号-1",
    copyright: "Copyright © 2019-2023 xxsjan",
  },
  // 自定义扩展: 页脚配置
  footerConfig: {
    showFooter: true, // 是否显示页脚
    icpRecordCode: "粤ICP备2021026613号", // ICP备案号
    publicSecurityRecordCode: "粤ICP备2021026613号-1", // 联网备案号
    copyright: `Copyright © 2019-${new Date().getFullYear()} xsjan`, // 版权信息
  },
};
export default themeConfig;
