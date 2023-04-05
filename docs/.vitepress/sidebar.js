const fg = require('fast-glob');
const path = require('path');
import { useLocalDoc } from './custom';

const docsPath = useLocalDoc ? process.cwd() : path.resolve(process.cwd(), '../web-note');
console.log(docsPath);
// console.log(
//   fg.sync('**', {
//     onlyFiles: false,
//     cwd: docsPath,
//     deep: 1,
//   })
// );

function getPath(p) {
  return path.join(docsPath, './docs', p);
}
function getDirs(p) {
  return fg.sync('**', {
    onlyFiles: false,
    cwd: getPath(p),
    deep: 1,
    ignore: ['*.md'],
  });
}
function getMdFiles(p) {
  return fg.sync('**', {
    onlyFiles: true,
    cwd: getPath(p),
    deep: 1,
    ignore: ['index.md'],
  });
}
/**
 *
 * @param {String} dirPath docs文件所在目录下的某个文件夹名
 * @returns
 */
function genSideBar(dirPath) {
  // dirPath 文件夹下的所有文件夹
  const dirs = getDirs(`${dirPath}`);
  const mdFiles = getMdFiles(`${dirPath}`);
  let res = [
    // 有文件夹
    ...dirs.map((dir) => {
      let obj = {
        text: dir,
        items: genSideBar(`${dirPath}/${dir}`),
      };
      if (obj.items.length === 0) {
        delete obj.items;
        obj.link = `/${dirPath}/${dir}/`;
      }
      return obj;
    }),
    // 有md文件
    ...mdFiles.map((file) => {
      const text = file.replace('.md', '');
      return {
        text: text,
        link: `/${dirPath}/${text}`,
      };
    }),
  ];
  return res;
}
const webnote = genSideBar('webnote');
console.log(JSON.stringify(webnote));

export default {
  '/webnote/': [
    {
      text: 'webnote',
      items: webnote,
    },
  ],
};
