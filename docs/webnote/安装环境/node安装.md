# node安装



https://nodejs.org/en/

下载安装包，一路默认确定

①在NodeJS的主目录下，创建"node_global"及"node_cache"两个文件夹

②、启动cmd，输入

```javascript
npm config set prefix "C:\Program Files\nodejs\node_global"
npm config set cache "C:\Program Files\nodejs\node_cache"
#更改registry指向
npm config set registry http://registry.npm.taobao.org
npm config set registry https://registry.npm.taobao.org
#查看设置是否成功
npm config ls
#如果想还原npm仓库地址的话，只需要在把地址配置成npm镜像就可以了
npm config set registry https://registry.npmjs.org/
```



③、随便安装一个常用的全局模块express,

在cmd命令行里面，输入`npm install express -g`

（“-g”意思是装到“C:\Program Files\nodejs\node_global”里面。）。

待cmd里面的安装过程滚动完成后，会提示“express”装在了哪、版本还有它的目录结构是怎样。

④、关闭cmd，打开系统对话框，“我的电脑”右键“属性”-“高级系统设置”-“高级”-“环境变量”。

⑤、进入环境变量--系统变量--新建"NODE_PATH"

-->输入”C:\Program Files\nodejs\node_global\node_modules“。

（ps：这一步相当关键。）
用户变量--PATH：C:\Users\admin\AppData\Roaming\npm

​				--修改为--C:\Program Files\nodejs\node_global

要不使用module的时候会导致输入命令出现“xxx不是内部或外部命令，也不是可运行的程序或批处理文件”这个错误。



⑥、以上步骤都OK的话，我们可以再次开启cmd命令行，进入node，输入“require('express')”来测试下node的模块全局路径是否配置正确了。正确的话cmd会列出express的相关信息。如下图（如出错一般都是NODE_PATH的配置不对，可以检查下第④⑤步）
————————————————
原文链接：https://blog.csdn.net/shenggaofei/article/details/80361627



### 安装淘宝镜像

```javascript
#管理员运行cmd
npm install -g cnpm --registry=https://registry.npm.taobao.org
#卸载
npm uninstall cnpm -g
```



​	因为cnpm会被安装到--C:\Program Files\nodejs\node_global\node_modules--里，

​	但cnpm.cmd文件在--C:\Program Files\nodejs\node_global，

​	所以系统变量path设置为--C:\Program Files\nodejs\node_global

​	在**系统变量**path下添加该路径即可正常使用cnpm。

输入cnpm -v命令，查看结果!



### 常用命令



```javascript
npm init //npm init --yes #初始化，生成package.json文件
npm install moduleName # 安装模块
npm install moduleName@xxx # 指定版本安装
npm install -g moduleName  # -g 安装到全局，位置路径通过 npm config prefix 查询。
npm install -save xxx   # -save 安装到package文件的dependencies节点（运行依赖）。
npm install -save-dev xxx  # -save-dev 在package文件的devDependencies节点开发依赖。
npm info moduleName #查看包的信息
#查看所有全局安装的模块 
npm ls -g
#通过--depth参数指定输出深度
npm ls -g --depth=0
#查看npm默认设置（部分） 
npm config ls
#查看npm默认设置（全部） 
npm config ls -l
## 卸载全局包
 npm uninstall -g nodemon
 npm uninstall -g vue-cli
npm install -g @vue/cli
yarn global remove vue-cli
yarn global add @vue/cli
#清缓存
npm cache clean --force
#安装rimraf删除node_module文件夹
npm install rimraf -g
rimraf node_modules
```