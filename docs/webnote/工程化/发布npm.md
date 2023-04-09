# 发布npm

## 上传到npm官网 

https://www.npmjs.com/

## 切换镜像地址

首先源得是官网的，不是淘宝的，

不然会让你addUser ，但你还是会403，add不进去

所以老老实实切回官方的

npm config set registry https://registry.npmjs.org/

## 然后进行登录

期间可能会输邮件验证码

注意一下即可，都是 写简单的为英文

npm adduser --registry https://registry.npmjs.org/

## 发布 

发布的包的目录下，也就是package.json同目录下

npm publish

跑完就可发布完成

上官网瞄一眼，就会发现有了



## package.json内容说明

```json
{
  "name": "@liyongning/ts-cli"
  "main": "./lib/index.js",
  "keywords": ["typescript", "cli", "typescript 脚手架", "ts 脚手架", "ts-cli", "脚手架"],
  "author": "李永宁",
  "files": ["package.json", "README.md", "lib"],
  "repository": {
    "type": "git",
    "url": "https://github.com/liyongning/ts-cli.git"
  },
}


name: 包名，在包名称前加自己的 npm 账户名，采用 npm scope 的方式，包目录的组织方式和普通包不一样，而且可以有效的避免和他人的包名冲突
main：表示包的入口位置
keywords：关键字，方面别人搜索到你的包
files：告诉 npm，publish 时发布哪些包到 npm 仓库
repository：项目仓库

npm 的账户名、密码就不用说，必不可少

作者：李永宁
链接：https://juejin.cn/post/6901552013717438472
```