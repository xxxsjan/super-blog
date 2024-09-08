import {sideBarObj} from "./sidebar";
import nav from "./nav";
import crawlerConfig from "../../../crawlerConfig.json";

// const icpRecordCode = "粤ICP备2021026613号";
const icpRecordCode = "粤ICP备2024285819号";
const copyright = `Copyright © 2019-${new Date().getFullYear()} xxxsjan`;
// const publicSecurityRecordCode = "粤ICP备2021026613号-1";

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
    ...sideBarObj,
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
    message: icpRecordCode,
    copyright: copyright,
  },
  // 自定义扩展: 页脚配置
  footerConfig: {
    showFooter: true, // 是否显示页脚
    icpRecordCode: icpRecordCode, // ICP备案号
    // publicSecurityRecordCode: publicSecurityRecordCode, // 联网备案号
    copyright: copyright,
  },
};
export default themeConfig;
