## 抽离css

用到clean-webpack-plugin

```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module:{
  rules:[
    {
      test: /\.css/,
      use: [
        {loader: MiniCssExtractPlugin.loader,},
        // "style-loader", // style-loader不需要 用minicss即可
        "css-loader",
      ],
    },
  ]
},
plugins:[
  new MiniCssExtractPlugin({
    filename: "css/[name].css",// 生成文件在css目录下
  })
]
```

## 抽离scss或less

通过 extract-text-webpack-plugin 插件

```javascript
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module:{
  rules:[
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader", "sass-loader"],
      }),
    },
  ]
},
plugins:[
  // new ExtractTextPlugin('style.css'),// 输出文件就叫style.css
  // ExtractTextPlugin写法1
  // new ExtractTextPlugin('scss/style.css'),
  // ExtractTextPlugin写法2
  new ExtractTextPlugin({ filename: "scss/[name].css" }),
]
```

## 依赖参考

版本不一样可能会有api的报错，这里放出作为参考
node 是12.22.9版本，这个可能会影响node-scss的使用

```json
{
  "name": "w4-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "clean-webpack-plugin": "^4.0.0",
    "css-loader": "^3.5.3",
    "extract-text-webpack-plugin": "^4.0.0-beta.0",
    "html-webpack-plugin": "^4.5.2",
    "mini-css-extract-plugin": "^1.3.3",
    "node-sass": "^4.14.1",
    "sass-loader": "^7.1.0",
    "style-loader": "^2.0.0",
    "webpack": "^4.6.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.9.0"
  }
}

```

如果想在 style 资源中注入内容，导入 css / sass / scss / less / stylus 这些内容。可以安装 style-resources-loader。
主要作用是导入一些公共的样式文件，比如：variables / mixins / functions，避免在每个样式文件中手动的 @import 导入。

```javascript
module.exports = {
  // ...
  module: {
    rules: [{
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader', {
        loader: 'style-resources-loader',
        options: {
          patterns: [
            path.resolve(__dirname, 'path/to/scss/variables/*.scss'),
            path.resolve(__dirname, 'path/to/scss/mixins/*.scss'),
          ]
        }
      }]
    }]
  },
  // ...
}
```
