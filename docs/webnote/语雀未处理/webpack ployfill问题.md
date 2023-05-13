[http://www.45fan.com/article.php?aid=1D8hPfZrDF1Z3Pfq](http://www.45fan.com/article.php?aid=1D8hPfZrDF1Z3Pfq)
```javascript
1.在 webpack 配置文件的resolve中配置fallback
module.exports = {
    ...
    resolve: {
        fallback:  {
            "crypto": require.resolve("crypto-browserify"), // 如果不需要，那么就直接改为 false 就可以了
        }
    }
}
2.如果觉得上面的方法很麻烦，那么可以使用node-polyfill-webpack-plugin：
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
{
  ...
  plugins: [
    ...
    new NodePolyfillPlugin(),
    ...
  ]
}
```
