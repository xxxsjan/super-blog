import { sideBarObj } from "./sidebar";
import nav from "./nav";
import algoliaConfig from "./algolia";

// const icpRecordCode = "粤ICP备2021026613号";
const icpRecordCode = "粤ICP备2024285819号";
const copyright = `Copyright © 2019-${new Date().getFullYear()} xxxsjan`;
// const publicSecurityRecordCode = "粤ICP备2021026613号-1";

/** @type {import("vitepress").DefaultTheme.Config} */
const themeConfig = {
  logo: "/code.png",
  search: {
    // provider: 'local',
    ...algoliaConfig,
  },
  socialLinks: [{ icon: "github", link: "https://github.com/xxxsjan" }],
  nav,
  lastUpdated: true, // 最后更新时间
  lastUpdatedText: "最后更新", // 最后更新时间文本配置, 需先配置lastUpdated为true
  editLink: {
    pattern: "https://github.com/xxxsjan/super-blog/edit/main/docs/:path",
    text: "在 GitHub 上编辑此页面",
  },
  // sidebarDepth: 2,
  docFooter: {
    prev: "上一篇",
    next: "下一篇",
  },
  sidebar: {
    ...sideBarObj,
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
