```javascript
const express = require('express')
const webpackDevMid = require('webpack-dev-middleware');
const webpackHotMid = require('webpack-hot-middleware')
const webpack = require('webpack');
const app = express()
const config = require('./webpack.common')
Object.keys(config.entry).forEach(function(name) {
    config.entry[name] = ['webpack-hot-middleware/client?noinfo=true&reload=true'].concat(config.entry[name])
})
const compiler = webpack(config)
app.use(webpackDevMid(compiler, {}))
app.use(webpackHotMid(compiler, {
    overlayStyles: true
}))
 
app.listen(2000)
```
[https://blog.csdn.net/qq_41831345/article/details/108979107](https://blog.csdn.net/qq_41831345/article/details/108979107)
