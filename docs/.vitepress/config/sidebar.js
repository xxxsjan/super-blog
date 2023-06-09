const fg = require("fast-glob");
const path = require("path");

const docsPath = process.cwd();

function getPath(p) {
  return path.join(docsPath, "./docs", p);
}
function getDirs(p) {
  return fg.sync("**", {
    onlyFiles: false,
    cwd: getPath(p),
    deep: 1,
    ignore: ["*.md"],
  });
}

function getMdFiles(p) {
  return fg.sync("**", {
    onlyFiles: true,
    cwd: getPath(p),
    deep: 1,
    ignore: ["index.md"],
  });
}
/**
 *
 * @param {String} dirName docs文件所在目录下的某个文件夹名
 * @returns
 */
function genSideBar(dirName) {
  // dirName 文件夹下的所有文件夹
  const dirs = getDirs(`${dirName}`);
  const mdFiles = getMdFiles(`${dirName}`);
  let res = [
    // 有文件夹
    ...dirs.map((dir) => {
      let obj = {
        text: dir,
        items: genSideBar(`${dirName}/${dir}`),
        // collapsible: true,
        collapsed: false,
      };
      if (obj.items.length === 0) {
        delete obj.items;
        obj.link = `/${dirName}/${dir}/`;
      }
      return obj;
    }),
    // 有md文件
    ...mdFiles.map((file) => {
      const text = file.replace(".md", "");
      return {
        text: text,
        link: `/${dirName}/${text}`,
      };
    }),
  ];
  return res;
}
function toNav(sideBar, dirName) {
  return sideBar.map((item) => {
    return {
      text: item.text,
      link: item.items
        ? `/${dirName}/${item.text}/${item.items[0].text}`
        : `/${dirName}/${item.text}`,
    };
  });
}

const webnote = genSideBar("webnote");
// console.log("自动生成：", JSON.stringify(webnote, null, 2));
export const webnote_nav = toNav(webnote, "webnote");
const sourceCodeSidebar = genSideBar("source-code");
export const sourceCode_nav = toNav(sourceCodeSidebar, "source-code");
const jsDocSidebar = genSideBar("doc-js");
export const jsDoc_nav = toNav(jsDocSidebar, "doc-js");

// console.log(sourceCode_nav);
export default {
  "/webnote/": [
    {
      text: "笔记",
      items: webnote,
    },
  ],
  "/source-code/": [
    {
      text: "源码分析",
      items: sourceCodeSidebar,
    },
  ],
  "/doc-js/": [
    {
      text: "js相关",
      items: jsDocSidebar,
    },
  ],
};
