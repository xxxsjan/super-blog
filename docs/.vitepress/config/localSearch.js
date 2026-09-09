/** VitePress 内置本地搜索（MiniSearch），无需 Algolia */
export default {
  provider: "local",
  options: {
    locales: {
      root: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            displayDetails: "显示详细列表",
            resetButtonTitle: "清除查询条件",
            backButtonTitle: "关闭搜索",
            noResultsText: "无法找到相关结果",
            footer: {
              selectText: "选择",
              selectKeyAriaLabel: "输入",
              navigateText: "切换",
              navigateUpKeyAriaLabel: "上箭头",
              navigateDownKeyAriaLabel: "下箭头",
              closeText: "关闭",
              closeKeyAriaLabel: "Esc",
            },
          },
        },
      },
    },
  },
};
