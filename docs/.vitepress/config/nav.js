import { webnote_nav, sourceCode_nav } from "./sidebar";
import { DefaultTheme } from "vitepress";

/** @type {DefaultTheme.NavItem[]} */
const navList = [
  { text: "首页", link: "/" },
  {
    text: "笔记",
    // link: "/webnote/",
    activeMatch: "/webnote/",
    items: webnote_nav,
  },
  {
    text: "源码分析",
    activeMatch: "/source-code/",
    items: sourceCode_nav,
  },
  // {
  //   text: "我的标签",
  //   link: "/tags",
  // }
];
export default navList;
