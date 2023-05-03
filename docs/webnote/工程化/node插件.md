# node插件

## 打印文件树

方法一 tree-node-cli

// <https://www.npmjs.com/package/tree-node-cli>

npm install -g tree-node-cli



1.如果我们要显示某个项目下 3 层的所有文件结构，同时又过滤 node_modules 文件夹，最后输出到 tree.md，在自己根目录下运行下面命令：

tree -L 3 -I "node_modules" > tree-node-cli.txt 2.同时排除掉多个文件夹

tree -I "node**modules|cache|test**\*\***" > tree.txt (test**\_****代表以 test\_开头的文件夹都不会被显示出来)



方法二 treer

npm install treer -g

treer -e ./treer.txt -i .git  ------------输出treer.txt

treer -i .git   ---------不输出

