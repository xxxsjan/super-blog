[https://juejin.cn/post/7023242274876162084#heading-33](https://juejin.cn/post/7023242274876162084#heading-33)
### FriendlyErrorsPlugin
```javascript
devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
  compilationSuccessInfo: {
    messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
  },
  onErrors: config.dev.notifyOnErrors
  ? utils.createNotifierCallback()
  : undefined
}))


devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
  compilationSuccessInfo: {
    messages: [
      `App runing at: `,
      `Local: http://${devWebpackConfig.devServer.host}:${port}`,
      `Network: http://${require('ip').address()}:${port}`,
    ],
    
  },
  onErrors: config.dev.notifyOnErrors
  ? utils.createNotifierCallback()
  : undefined
}))
```

### 输出css
插件：mini-css-extract-plugin
> 开发用style-loader即可， 生产环境则可以考虑使用mini-css-extract-plugin

**原理步骤：**先拿到css-loader输出的js，拿到后loader缓存内容，等到plugin执行时机到了就可以生成文件输出了
```javascript
modules.exports = {
  rules:[
    {
      test:/.css$/
        use:[
  // 'style-loader',
  {loader:MiniCssExtract.loader},
  'css-loader',
 // css兼容处理
      {
        loader:'postcss-loader',
        options:{
          ident:'postcss',
          plugins:()=>{
            require('postcss-preset-env')()
          }
    	}
]
}
],
plugins:[
  new MiniCssExtract({
    filename:'[name].css' // 可选配置
  })
  // 压缩css
    new OPtimizeCssAssetsWebpackPlugin()
]
}
```
build.js
```javascript
const webpack = require("webpack");
const webpackConfig = require("./webpack.prod.js");
const chalk = require("chalk");
const ora = require("ora");

const spinner = ora("building for production...");
spinner.start();

webpack(webpackConfig, (err, stats) => {
  spinner.stop();
  if (err) throw err;
  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false,
    }) + "\n\n"
  );
  if (stats.hasErrors()) {
    console.log(chalk.red("  Build failed with errors.\n"));
    process.exit(1);
  }
  console.log(chalk.cyan("Build complete(打包成功).\n"));
  console.log(chalk.yellow("输出目录dist"));
});

```

###  compiler 钩子

- entryOption : 在 webpack 选项中的 entry 配置项 处理过之后，执行插件。
- afterPlugins : 设置完初始插件之后，执行插件。
- compilation : 编译创建之后，生成文件之前，执行插件。。
- emit : 生成资源到 output 目录之前。
- done : 编译完成。
链接：https://juejin.cn/post/6844904070868631560


### 压缩 CSS
optimize-css-assets-webpack-plugin 
```javascript
// ...
// 压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// ...

const config = {
  // ...
  optimization: {
    minimize: true,
    minimizer: [
      // 添加 css 压缩配置
      new OptimizeCssAssetsPlugin({}),
    ]
  },
 // ...
}

// ...
```
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151300754.png)

### 压缩 JS
因为 webpack5 内置了[terser-webpack-plugin](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fterser-webpack-plugin) 插件，所以我们不需重复安装，直接引用就可以了，具体配置如下
```javascript
const TerserPlugin = require('terser-webpack-plugin');

const config = {
  // ...
  optimization: {
    minimize: true, // 开启最小化
    minimizer: [
      // ...
      new TerserPlugin({})
    ]
  },
  // ...
}
```
### 清除无用的 CSS
[purgecss-webpack-plugin](https://link.juejin.cn/?target=https%3A%2F%2Fwww.purgecss.cn%2Fplugins%2Fwebpack.html%23%25E7%2594%25A8%25E6%25B3%2595) 会单独提取 CSS 并清除用不到的 CSS
```javascript
// ...
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin')
const glob = require('glob'); // 文件匹配模式
// ...

function resolve(dir){
  return path.join(__dirname, dir);
}

const PATHS = {
  src: resolve('src')
}

const config = {
  plugins:[ // 配置插件
    // ...
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, {nodir: true})
    }),
  ]
}

```
### HtmlWebpackPlugin
```
module.exports = {
	module:{},
	plugins:[
		new HtmlWebpackPlugin({
			template:'./src/index.html',
			minify:{
				collapseWhitespace:true,//移除空格
				removeComment:true//移除console
			}
		})
	]
}
```

## code split代码分割 splitChunk
```javascript
module.exports ={
	// 多入口
	entry:{
		main:'./src/index.js',
		test:'./src/test.js'
	}
	output:{
		flename:'js/[name].[contenthash:10].js',
		path:resolve(__dirname,'build')
	},
  // 单入口：将node_modules的代码单独打包到chunk输出
  // 多入口js共用到的包，单独打包成一个chunk输出
  optimization:{
     splitChunk:{
       chunks:'all'
     },
      splitChunks:{
        cacheggroups:{
          common:{
            chunk:'initial',
            minSize:0,//多大开始抽离
            minChunks:2//调用几次开始抽离
          },
          vendor:{
						priority:1, // 权重
            test:/node_modules/,
            chunks:'initial',
            minSize:0,
            minChunks:2
          }
        }
      }
   }
}
// js引入的js不想合并打包，使用动态加载方式
// js里面动态加载,webpackChunkName: 'test' 打包后的名字，不写显示id
import(/* webpackChunkName: 'test' */ './test')
  .then()
	.catch()
```
## PWA-没网也能显示
渐进式页面和离线应用、消息推送等功能
```javascript
// webpack.config.js
const WorkWebpackPlugin = require('workbox-webpack-plugin')
module.exports={
	module:{},
	plugins:[
		new WorkWebpackPlugin.GenerateSW({
			clientsClaim:true,
			skipWaiting:true
		})
	]
}
// index.js,代码得在server端运行
// 注册serviceworker
if('serviceWorker' in navigator){
	window.addEventListener('load',()=>{
		navigator.serviceWorker
			.register('/service-worker.js')
			.then()
			.catch()
	})
}
package.json
"eslintConfig":{
  "env":{
    "browser":true // 支持浏览器全局变量navigator,window这些
  }
}
```
## 一些插件
new webpack.NamedModulesPlugin() // 打印更新的模块路径
new webpack.HotModuleReplacementPlugin()//热更新查件

