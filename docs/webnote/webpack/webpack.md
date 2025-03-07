# webpack

## loader

<https://juejin.cn/post/7067051380803895310#heading-3>

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

链接：https://juejin.cn/post/7067051380803895310

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

### url-loader

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

会把引用的 svg文件 塞到一个个 symbol 中，合并成一个大的SVG sprite，使用时则通过 SVG 的 <use/> 传入图标 id 后渲染出图标。最后将这个大的 svg 放入 body 中。symbol的id如果不特别指定，就是你的文件名。

该loader可以搭配**svgo-loader** 一起使用，svgo-loader是svg的优化器，它可以删除和修改SVG元素，折叠内容，移动属性等，具体不展开描述。感兴趣的可以移步 [官方介绍](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fsvg%2Fsvgo-loader)。

原理：利用 svg 的 symbol 元素，将每个 icon 包裹在 symbol 中，通过 use 使用该 symbol。

```javascript
// js文件里用法
// import webpack from './webpack/webpack.svg';
// const type = 'webpack';
// const dom = `
// <div class="tag">
//     <svg>
//       <use xlink:href="#${type}"/>
//     </svg>
// </div>`;
// document.getElementById('react-app').innerHTML = dom;
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

## 老东西

### 详解CommonsChunkPlugin的配置和用法

<https://segmentfault.com/a/1190000012828879>

### 移除未引用代码(tree shaking )

<https://dandelioncloud.cn/article/details/1486720561085796354>

<https://blog.csdn.net/weixin_45844049/article/details/120043245>

> **"sideEffects": false** **代表：所有代码都没有副作用（都可以进行tree shaking），这是sideEffects的默认值**，这可能会把css / @babel/polyfill （副作用）等文件干掉

新的 webpack 4 正式版本，扩展了这个检测能力，

通过 package.json 的 “sideEffects” 属性作为标记，

向 compiler 提供提示，表明项目中的哪些文件是 “pure(纯的 ES2015 模块)”，

由此可以安全地删除文件中未使用的部分。

```tsx
"sideEffects": [
  "**/*.css",
  "**/*.scss",
  "./esnext/index.js",
  "./esnext/configure.js"
],
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

## tree shaking

package.json

```plain
"sideEffect":false   // 可能会干掉css/@babel/polyfill
"sideEffect":["*.css"]
```
