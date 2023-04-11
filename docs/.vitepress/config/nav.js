import { webnote_nav } from "./sidebar";

export default [
  { text: "首页", link: "/" },
  {
    text: "笔记",
    // link: "/webnote/",
    activeMatch: "/webnote/",
    items: webnote_nav,
  },
  // {
  //   text: "我的标签",
  //   link: "/tags",
  // },
];
