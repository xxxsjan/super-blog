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
/**
 * sideBar 转 nav
 * @param {*} sideBar
 * @param {*} dirName
 * @returns
 */
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

function createSideNav(docName) {
  const _sideBar = genSideBar(docName);
  const _nav = toNav(_sideBar, docName);
  return [_sideBar, _nav];
}

export const [webnote, webnote_nav] = createSideNav("webnote");
// console.log("自动生成：", JSON.stringify(webnote, null, 2));
export const [sourceCodeSidebar, sourceCode_nav] = createSideNav("source-code");
export const [jsDocSidebar, jsDoc_nav] = createSideNav("doc-js");
export const [readingNotes_sidebar, readingNotes_nav] =
  createSideNav("doc-reading-notes");
export const [env_sidebar, env_nav] = createSideNav("doc-env-install");
export const [docker_sidebar, docker_nav] = createSideNav("doc-docker");

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
  "/doc-reading-notes/": [
    {
      text: "读书笔记",
      items: readingNotes_sidebar,
    },
  ],
  "/doc-docker/": [
    {
      text: "Docker",
      items: docker_sidebar,
    },
  ],
};
