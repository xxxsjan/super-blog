
### mpm
npm cache clean --force
### yarn
**查看已缓存包的列表**
yarn cache list
**查询cache缓存文件目录路径**
yarn cache dir
**清理缓存包**
yarn 清除缓存 yarn cache clean

**改变 yarn 的缓存路径**
```javascript
yarn config set cache-folder <path>

// 通过指定 --cache-folder 的参数来指定缓存目录
yarn <command> --cache-folder <path>
```


###  pnpm
pnpm 是一个包管理工具，它可以用来安装、升级和管理 Node.js 应用程序所依赖的包。
要清除 pnpm 缓存，可以使用 pnpm cache clean 命令。
清除某个特定的包缓存，可以使用 pnpm cache clean [package] 命令，其中 [package] 是包的名称。
请注意，清除 pnpm 缓存可能会导致下次安装包时重新下载所有包，因此可能会消耗较多的时间和带宽。
