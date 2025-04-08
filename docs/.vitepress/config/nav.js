import { navList } from "./sidebar";

import { DefaultTheme } from "vitepress";

/** @type {DefaultTheme.NavItem[]} */
const _navList = [
  { text: "首页", link: "/" },
  ...navList,
  // {
  //   text: "我的标签",
  //   link: "/tags",
  // }
  {
    text: "留言板",
    link: "/comment",
  },
];
export default _navList;
