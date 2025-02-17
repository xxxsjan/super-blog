
# 发布npm

## 上传到npm官网

<https://www.npmjs.com/>

## 切换镜像地址

首先源得是官网的，不是淘宝的，

```
npm config set registry https://registry.npmjs.org/
```

## 然后进行登录

```
npm adduser --registry https://registry.npmjs.org/
```

期间可能会输邮件验证码

注意一下即可，都是 写简单的为英文

## 发布

package.json目录下执行：

npm publish

跑完就可发布完成

上npm官网看发布结果

## package.json内容说明

```json
{
  "name": "@liyongning/ts-cli"
  "main": "./lib/index.js",
  "keywords": ["typescript", "cli", "typescript 脚手架", "ts 脚手架", "ts-cli", "脚手架"],
  "author": "",
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

```
