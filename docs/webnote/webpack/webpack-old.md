# webpack-old


 
## rules-oneOf

一个文件不会被多个loader过一遍

```plain
module.exports ={
 module:{
  rules:[
   {test:xxxxx},
   {oneOf:[{test:xxx},{tst:xxx}]}
  ]
 }
}
```

## tree shaking

package.json

```plain
"sideEffect":false   // 可能会干掉css/@babel/polyfill
"sideEffect":["*.css"]
```

 
## dll

动态链接库

```javascript
// webpack.dll.js
module.exports={
 entry:{
  //[name]:官方名
  jqueryVentor:['jquery']
 },
 output:{
  filename:'[name].js',
  path:resolve(__dirname,'dll'),
  library:'[name].[hash]' // 打包的库向外暴露叫什么名字
 },
 plugins:[
  new webpack.DllPlugin({
   name:'[name].[hash]',
   path:resolve(__dirname,'dll/manifest.json') // 输出文件
  })
 ]
}
package.json script
"dll":'webpack --config ./webpack.dll.js'

webpack.config.js
module.exports={
 plugins:[
    // 读取dll打包，webpack不用再给dll打包的包打包
  new webpack.DllReferencePlugin({
   manifest:resolve(__dirname,'dll/manifest.json')
  })
    // html里引入js
    new AddAssetHtmlWebpackplugin({
     filename:resolve(__dirname,'dll/jqueryVentor.js')
    })
 ]
}
```

new 插件写法

```javascript
const path = require('path')
const webpack = require('webpack')

const dllPath = 'dll/' // dll文件存放的目录

const libs = {
    'ui': ['ant-design-vue'],
    'frame': ['vue', 'vuex', 'vue-router', 'moment', 'quill'],
    'chart': ['@antv/g2', '@antv/data-set']
}

module.exports = {
  entry: {
    // 需要提取的库文件
    ...libs
  },
  output: {
    path: path.join(__dirname, dllPath),
    filename: '[name].dll.js',
    // vendor.dll.js中暴露出的全局变量名
    // 保持与 webpack.DllPlugin 中名称一致
    library: '[name]_[hash]'
  },
  plugins: [
    // manifest.json 描述动态链接库包含了哪些内容
    new webpack.DllPlugin({
      path: path.join(__dirname, dllPath, '[name]-manifest.json'),
      // 保持与 output.library 中名称一致
      name: '[name]_[hash]',
      context: process.cwd()
    })
  ]
} 
// vue.config.js
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const CompresssionPlugin = require('compression-webpack-plugin')
config.plugins = [
    ...config.plugins,
    new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require('./dll/ui-manifest.json')
    }),
    new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require('./dll/frame-manifest.json')
    }),
    new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require('./dll/chart-manifest.json')
    })
   new AddAssetHtmlPlugin({
        filepath: path.resolve(__dirname, './dll/*.js'), // dll文件位置
        publicPath: './js', // dll 引用路径
        outputPath: './js' // dll最终输出的目录
    })
    new CompressionPlugin({
        test: /\.js$|\.html$|\.css$/,
        deleteOriginalAssets: false // 是否删除原文件
    })
]
```
