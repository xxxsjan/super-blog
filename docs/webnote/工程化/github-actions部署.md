# github action



使用npm

https://juejin.cn/post/6844903821995409422

package.json添加homepage

homepage不会改变setting里的page地址

```javascript
{
  "name": "earth3d",
  "version": "0.1.0",
  "homepage": "https://xxxsjan.github.io/earth3d",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
  "devDependencies": {
    "gh-pages": "^2.0.1"
  }
}
```



使用action

创建git仓库

使用工作流action自动部署

.github\workflows\deploy.yml

```javascript
name: Deploy

on:
  push:
    branches:
      - main
# https://vitepress.vuejs.org/guide/deploying#deploying
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v3
        with:
          node-version: 16
          cache: yarn
      - run: yarn install --frozen-lockfile

      - name: Build
        run: yarn build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: dist
```

原理是新建了一个分支gh-page，该分支为输出build的文件

setting-page可以设置选择分支使用对应html作为page