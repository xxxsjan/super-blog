# webpack-old



## webpack.config.js

https://www.bilibili.com/video/BV1e7411j7T5



```javascript
process.env.NODE_ENV = "devolopment"
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports ={
  // 单入口打包 index同级有多少js就打包多少个
  entry:'./src/index.js', 
  // 多入口打包1，还是打包成一个，少用
  entry:['./src/index.js','./src/add.js'], 
  // 多入口打包2
  entry:{
    index:'./src/index.js',
    add:'./src/add.js'
  }
  output:{
    filename:'[name].js',
    path:resolve(__dirname,'build')
  }
  // loader options
  module:{
    rules:[{
    test:/\.js$/,
    // 使用那些loader进行处理 执行顺序从下到上，右到左
    use:[  'style-loader','css-loader'] },
     // 将css 打包成js
    { test:/\.less$/, use:[ 'style-loader','css-loader','less-loader' ]},
    {test:/\.(jpg|png|gif)$/,loader:'url-loader',
      options:{
        limit:8*1024,esModule:false,
        name:'[hash:10].[ext]',
        outputPath:'imgs',//输入到build/imgs文件夹
      }}
    {test:/\.html$/,loader:'html-loader'}
		// 处理其他格式资源
    {exclude:/\.(js|css|html)$/,loader:'file-loader'}
    }]
  },
  plugins:[
    //  创建一个空的html（可通过template设置），并自动引入打包好的文件
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ],
  mode:'development',
    // 自动在内存打包，不在本地 npx webpack-dev-server（cli3.x）npx webpack serve(cli5)
    devSever：{ 
      contentBase:resolve(__dirname,'build')
      compress:true, // gzip
      port：3000,
      open:true ,
      clientLogLevel:'none',// 不显示日志
      quiet:true, // 显示重要信息，其他不显示
      overlay:false,//出错不全屏提示
      proxy:{
	 			'/api':{
          target:'http://localhost:3000',
          pathRewrite:{
						"^/api":""
          }
        }
      }
    }
}
```



### browserslist

```javascript
 // package.json
"browserslist":{
	"development":[
		"last 1 chrome version",
		"last 1 firefox version",
		"last 1 safari version"
	],
	"production":[
    ">0.2%",
    "not dead",
    "not op_mini all"
	]
}
```



#### 

#### babel

处理箭头函数兼容性，promise不行

- babel-loader   
- @babel/preset-env   
- @babel/core

全部兼容

@babel/polyfill   --- 在js  import'@babel/polyfill '  体积大

按需兼容

```javascript
module.exports = {
  module:{
    
      rules:[
      {	
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader',
        options:{
          presets:[
            [
              '@babel/preset-env',
              {
                useBuiltIns:'usage',// 按需加载
                corejs:{ verson:3 },
                targets:{
                  chrome:'60',
                  firefox:'60',
                  ie:'9',
                  safari:'10',
                  edge:'17'}
              }
            ]
          ]
        }
          ]
  }, 
}
```



## 开发环境优化



```plain
module,exports ={
	...
  devSever：{ 
    contentBase:resolve(__dirname,'build')
    compress:true, // gzip
    port：3000,
    open:true ,
    hot:true
  }
}
```



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

## 

## tree shaking



去除无用代码



1 必须使用es6 模块化引入 （import）



2 production环境



package.json

```plain
"sideEffect":false   // 可能会干掉css/@babel/polyfill
"sideEffect":["*.css"]
```





## js懒加载 || 预加载

index.js

预加载，其他加载完了再偷偷加载

懒加载，触发了事件再加载

预加载好于懒加载，但兼容差

```plain
document.getElementById('btn').onclick(function(){
	import(/* webpackChunkName: 'test',webpackPrefetch:true*/ './test').then().catch()
})
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

## 

## webpack -h 提示安装webpack-cli

webpack与webpack-cli

https://segmentfault.com/a/1190000013699050