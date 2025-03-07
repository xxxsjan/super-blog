入口

```js
entry: {
    index: path.resolve(__dirname, "../src/pages/index/index.js"),
    user: path.resolve(__dirname, "../src/pages/user/user.js"),
},
```

这样输出的包名 默认就是index 和 user
同样的需要两份html

```js
 plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "../src/pages/index/index.html"),
      title: "index",
      chunks: ["index", "common"],
      minify: {
        removeComments: true,
        collapseWhitespace: false,
        removeAttributeQuotes: false,
        minifyJS: false, //压缩html中的js
        minifyCSS: false, //压缩html中的css
      },
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      filename: "user.html",
      template: path.resolve(__dirname, "../src/pages/user/user.html"),
      title: "user",
      chunks: ["user", "common"],
      minify: {
        removeComments: true,
        collapseWhitespace: false,
        removeAttributeQuotes: false,
        minifyJS: false, //压缩html中的js
        minifyCSS: false, //压缩html中的css
      },
      inject: "body",
    }),
  ],
```

webapck的splitChunk缓存组输出 index user common这三个包的

假如只是一个入口就是 入口名 common 两个

webpack5的话是 defaultVendors和 default

所以在对应的html里可以配置chunks: ["user", "common"] 只引入对应的包就行，

引入其他入口的包就是多余的
