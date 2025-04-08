import { sideBarObj } from "./sidebar";
import nav from "./nav";
import crawlerConfig from "../../../crawlerConfig.json";

// const icpRecordCode = "粤ICP备2021026613号";
const icpRecordCode = "粤ICP备2024285819号";
const copyright = `Copyright © 2019-${new Date().getFullYear()} xxxsjan`;
// const publicSecurityRecordCode = "粤ICP备2021026613号-1";

/** @type {import("vitepress").DefaultTheme.Config} */
const themeConfig = {
  logo: "/code.png",

  search: {
    //   provider: 'local',
    provider: "algolia", // algolia搜索 https://www.algolia.com/apps/YBYUHFPZ1C/dashboard
    options: {
      indexName: crawlerConfig.index_name,
      appId: "YBYUHFPZ1C",
      apiKey: "d4076b979399477f79c55eec660730ec",

      // locales: {
      // zh: {
      placeholder: "搜索文档",
      translations: {
        button: {
          buttonText: "搜索文档",
          buttonAriaLabel: "搜索文档",
        },
        modal: {
          searchBox: {
            resetButtonTitle: "清除查询条件",
            resetButtonAriaLabel: "清除查询条件",
            cancelButtonText: "取消",
            cancelButtonAriaLabel: "取消",
          },
          startScreen: {
            recentSearchesTitle: "搜索历史",
            noRecentSearchesText: "没有搜索历史",
            saveRecentSearchButtonTitle: "保存至搜索历史",
            removeRecentSearchButtonTitle: "从搜索历史中移除",
            favoriteSearchesTitle: "收藏",
            removeFavoriteSearchButtonTitle: "从收藏中移除",
          },
          errorScreen: {
            titleText: "无法获取结果",
            helpText: "你可能需要检查你的网络连接",
          },
          footer: {
            selectText: "选择",
            navigateText: "切换",
            closeText: "关闭",
            searchByText: "搜索提供者",
          },
          noResultsScreen: {
            noResultsText: "无法找到相关结果",
            suggestedQueryText: "你可以尝试查询",
            reportMissingResultsText: "你认为该查询应该有结果？",
            reportMissingResultsLinkText: "点击反馈",
          },
        },
        // },
        // },
      },
    },
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
