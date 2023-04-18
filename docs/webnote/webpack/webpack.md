# webpack

## loader

https://juejin.cn/post/7067051380803895310#heading-3

### markdown-loader

markdown编译器和解析器

```javascript
 // file.js 
import md from 'markdown-file.md'; 
console.log(md);
// wenpack.config.js 
const marked = require('marked'); 
const renderer = new marked.Renderer(); 
module.exports = {   // ...   
  module: {     
    rules: [       
      {         
        test: /\.md$/,         
        use: [            
          {             
            loader: 'html-loader' 
          },         
          {           
            loader: 'markdown-loader',     
            options: {                 
              pedantic: true,             
              renderer        
            }    
          }      
        ]    
      }    
    ],  
  },
};
```





### raw-loader

可将文件作为字符串导入

```javascript
// app.js
import txt from './file.txt';
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }
    ]
  }
}

作者：腾讯TNTWeb前端团队
链接：https://juejin.cn/post/7067051380803895310
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

### file-loader

用于处理文件类型资源，如jpg，png等图片。返回值为publicPath为准

```javascript
// file.js
import img from './webpack.png';
console.log(img); // 编译后：https://www.tencent.com/webpack_605dc7bf.png
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name]_[hash:8].[ext]',
          publicPath: "https://www.tencent.com",
        },
      },
    ],
  },
};
```

css文件里的图片路径变成如下：

```javascript
/* index.less */
.tag {
  background-color: red;
  background-image: url(./webpack.png);
}
/* 编译后：*/
background-image: url(https://www.tencent.com/webpack_605dc7bf.png);
```

### url-loader: 

它与file-loader作用相似，也是处理图片的，只不过url-loader可以设置一个根据图片大小进行不同的操作，如果该图片大小大于指定的大小，则将图片进行打包资源，否则将图片转换为base64字符串合并到js文件里。

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
              // 这里单位为(b) 10240 => 10kb
              // 这里如果小于10kb则转换为base64打包进js文件，如果大于10kb则打包到对应目录
              limit: 10240,
            }
          }
        ]
      }
    ]
  }
}
```

### svg-sprite-loader

会把引用的 svg文件 塞到一个个 symbol 中，合并成一个大的SVG sprite，使用时则通过 SVG 的 <use> 传入图标 id 后渲染出图标。最后将这个大的 svg 放入 body 中。symbol的id如果不特别指定，就是你的文件名。

该loader可以搭配**svgo-loader** 一起使用，svgo-loader是svg的优化器，它可以删除和修改SVG元素，折叠内容，移动属性等，具体不展开描述。感兴趣的可以移步 [官方介绍](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fsvg%2Fsvgo-loader)。

原理：利用 svg 的 symbol 元素，将每个 icon 包裹在 symbol 中，通过 use 使用该 symbol。

```javascript
// js文件里用法
import webpack from './webpack/webpack.svg';
const type = 'webpack';
const svg =  `<svg>
    <use xlink:href="#${type}"/>
  </svg>`;
const dom = `<div class="tag">
  ${svg}
  </div>`;
document.getElementById('react-app').innerHTML = dom;
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg)$/,
        use: [
          {
            test: /\.svg$/,
            use: [
                {
                  loader: 'svg-sprite-loader'
                },
                'svgo-loader'
            ]
          },
        ]
      }
    ]
  }
}
```

 

### postcss-loader

PostCSS 是一个允许使用 JS 插件转换样式的工具。 这些插件可以检查（lint）你的 CSS，支持 CSS Variables 和 Mixins， 编译尚未被浏览器广泛支持的先进的 CSS 语法，内联图片，以及其它很多优秀的功能。

PostCSS 在业界被广泛地应用。PostCSS 的 **autoprefixer** 插件是最流行的 CSS 处理工具之一。

autoprefixer 添加了浏览器前缀，它使用 Can I Use 上面的数据。

 安装

```javascript
npm install postcss-loader autoprefixer --save-dev

// webpack.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDev = process.NODE_ENV === 'development';
module.exports = {
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
              loader: 'less-loader',
              options: {
                  lessOptions: {
                      javascriptEnabled: true
                  }
              }
          }
        ]
      }
    ]
  }
}
```

postcss.config.js

必须设置支持的浏览器才会自动添加添加浏览器兼容

```javascript
module.exports = {
  plugins: [
    require('precss'),
    require('autoprefixer')({
      'browsers': [
        'defaults',
        'not ie < 11',
        'last 2 versions',
        '> 1%',
        'iOS 7',
        'last 3 iOS versions'
      ]
    })
  ]
}
```

## plugin

Webpack 就像一条生产线，要经过一系列处理流程后才能将源文件转换成输出结果。 这条生产线上的每个处理流程的职责都是单一的，多个流程之间有存在依赖关系，只有完成当前处理后才能交给下一个流程去处理。 插件就像是一个插入到生产线中的一个功能，在特定的时机对生产线上的资源做处理。


著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。Webpack 通过 Tapable 来组织这条复杂的生产线。 Webpack 在运行过程中会广播事件，插件只需要监听它所关心的事件，就能加入到这条生产线中，去改变生产线的运作。 Webpack 的事件流机制保证了插件的有序性，使得整个系统扩展性很好。



```javascript
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProd = process.env.NODE_ENV === 'production';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      }
    ],
  }, 
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "./css/index.css",
    })
    new webpack.DefinePlugin({
  PAGE_URL: JSON.stringify(isProd
                           ? 'https://www.tencent.com/page'
                           : 'http://testsite.tencent.com/page'
                          )
}), 
  new CopyPlugin({
    patterns: [
      { 
        from: './template/page.html', 
        to: `${__dirname}/output/cp/page.html` 
      },
    ],
  }),
  new HtmlWebpackPlugin({
    title: 'news page',
    // 生成的文件名称 相对于webpackConfig.output.path路径而言
    filename: 'pages/news.html',
    // 生成filename的文件模板
    template: path.resolve(__dirname, '../template/news/index.html'),
    chunks: ['news']

  }),
  new HtmlWebpackPlugin({
    title: 'video page',
    // 生成的文件名称
    filename: 'pages/video.html',
    // 生成filename的文件模板
    template: path.resolve(__dirname, '../template/video/index.html'),
    chunks: ['video']
  }), 
  new BundleAnalyzerPlugin()
],
  }; 
```

## splitChunk

### 示例

```javascript
module.exports = {
  optimization: {
    splitChunks: {
      // 分隔符
      // automaticNameDelimiter: '~', 
      
      // 以下是默认值
      // minSize: 20000, // 分割代码最小的大小
      // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
      // minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
      // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
      // maxInitialRequests: 30, // 入口js文件最大并行请求数量
      // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
      // cacheGroups: { // 组，哪些模块要打包到一个组
      //   defaultVendors: { // 组名
      //     test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
      //     priority: -10, // 权重（越大越高）
      //     reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
      //   },
      //   default: { // 其他没有写的配置会使用上面的默认值
      //     minChunks: 2, // 这里的minChunks权重更大
      //     priority: -20,
      //     reuseExistingChunk: true,
      //   },
      // },
      
      chunks: 'all',// all, async, and initial
      // 它可以继承/覆盖上面 splitChunks 中所有的参数值，除此之外还额外提供了三个配置，分别为：test, priority 和 reuseExistingChunk
      cacheGroups: {
        vendors: {
          // 表示要过滤 modules，默认为所有的 modules，可匹配模块路径或 chunk 名字，当匹配的是 chunk 名字的时候，其里面的所有 modules 都会选中
          test: /[\\/]node_modules\/antd\//,
          // priority：表示抽取权重，数字越大表示优先级越高。因为一个 module 可能会满足多个 cacheGroups 的条件，那么抽取到哪个就由权重最高的说了算；
          // priority: 3,
          // reuseExistingChunk：表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
          reuseExistingChunk: true,
          name: 'antd'
        }
      }
    }
  },
}
```

### maxInitialRequests的理解

https://www.cnblogs.com/kwzm/p/10316217.html

maxInitialRequests最大请求数

首先三个入口文件对应entry1 entry2 entry3，没有问题

然后上面配置maxInitialRequests设置的是3

entry1 引入了 react 、$、orgchart 

entry2 引入了 react 、$、

entry3 引入了 react 、orgchart 

1 2都用了第三方库rreact react-dom 所以default~ entry1 ~entry2.chunkhash.chunk.js

1 2都用了公用模块jquery 所以 vendors~entry1~entry2

现在分出来的已经有三个和entry1有关了

1 3公用 react 、orgchart ，但最大引用已达3，所以entry1剩下的引用就不参与分割了，而是一起整合打包，所以vendors~entry1~entry2~entry3

4、page1因为是在entry1.js里面动态引入的所以被拆分出来

5、vendors~page1就是page1里面引入的第三方库lodash



## 老东西

### [详解CommonsChunkPlugin的配置和用法](https://segmentfault.com/a/1190000012828879)



### 移除未引用代码(tree shaking )

https://dandelioncloud.cn/article/details/1486720561085796354

https://blog.csdn.net/weixin_45844049/article/details/120043245

> **"sideEffects": false** **代表：所有代码都没有副作用（都可以进行tree shaking），这是sideEffects的默认值**，这可能会把css / @babel/polyfill （副作用）等文件干掉

新的 webpack 4 正式版本，扩展了这个检测能力，

通过 package.json 的 “sideEffects” 属性作为标记，

向 compiler 提供提示，表明项目中的哪些文件是 “pure(纯的 ES2015 模块)”，

由此可以安全地删除文件中未使用的部分。

```tsx
// ...
"sideEffects": [
  "**/*.css",
  "**/*.scss",
  "./esnext/index.js",
  "./esnext/configure.js"
],
// ...
```