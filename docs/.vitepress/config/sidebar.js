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

function createSideNav(docDirName) {
  const _sideBar = genSideBar(docDirName);
  const _nav = toNav(_sideBar, docDirName);
  return [_sideBar, _nav];
}

const arr = [
  { text: "笔记", docDirName: "webnote" },
  // { text: "源码分析", docDirName: "source-code" },
  // { text: "js相关", docDirName: "doc-js" },
  // { text: "读书笔记", docDirName: "doc-reading-notes" },
  { text: "环境安装", docDirName: "doc-env-install" },
  { text: "docker", docDirName: "doc-docker" },
  // { text: "life", docDirName: "doc-life" },
];
function createSideNavData() {
  const navList = [];
  const sideBarObj = {};
  for (let item of arr) {
    const data = createSideNav(item.docDirName);
    navList.push({
      text: item.text,
      activeMatch: `/${item.docDirName}/`,
      items: data[1],
    });
    sideBarObj[`/${item.docDirName}/`] = [{ text: item.text, items: data[0] }];
  }
  return {
    navList,
    sideBarObj,
  };
}

const { navList, sideBarObj } = createSideNavData();

export { navList, sideBarObj };
