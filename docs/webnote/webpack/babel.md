[1800字了解babel的使用](https://zhuanlan.zhihu.com/p/471350036)
npm install -D babel-loader @babel/core @babel/preset-env webpack

- @babel/preset-env              ES2015+ 语法
- @babel/preset-typescript    TypeScript
- @babel/preset-react            React
- @babel/preset-flow              Flow

### babel插件和预设的执行顺序

- 插件比预设先执行
- 插件执行顺序 前向后  
- 预设执行顺序 后向前

![](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151245066.webp)

## 配置写法

### webpack.config.js

```javascript
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: "defaults" }]
          ],
          plugins: ['@babel/plugin-proposal-class-properties'],
          // 缓存 loader 的执行结果到指定目录，默认为node_modules/.cache/babel-loader，之后的 webpack 构建，将会尝试读取缓存
          cacheDirectory: true,
        }
      }
    }
  ]
}

```

### packages.json

```javascript
{
     "dependencies": {},
     "babel": { 
       "presets": ["@babel/preset-env"] 
     }
}
```

### babel.config.js

```javascript
module.exports = (api) => {
  return {
    presets: [
      '@babel/preset-react',
      [
        '@babel/preset-env', {
          useBuiltIns: 'usage',
          corejs: '2',
          targets: {
            chrome: '58',
            ie: '10'
          }
        }
      ]
    ],
    "plugins": [
      // 解决多个地方使用相同代码导致打包重复的问题
      ["@babel/plugin-transform-runtime"]
    ],
    "ignore": [
      "node_modules/**"
    ]
  };
};
```

### 演示

入口源代码

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151245390.png)
只配置babel-loader的话

```javascript
{
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {loader: "babel-loader",},
        ],
},
```

输出代码
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151245330.png)
配置@babel/preset-env后

```javascript
{
  test: /\.js$/,
    exclude: /node_modules/,
    use: [
    {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
        plugins:[]
      },
    },
  ],
},
```

输出代码
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151245122.png)

## polyfill
>
> 在开发过程中，如果我们写的代码是es6语法的，其中有很多语法如：async、Array.isArray、Object.assign等等是低版本浏览器所不支持的。为了保证我们写的es6语法能够在各个新旧客户端上撒欢跑，我们需要引入polyfill对这些新的语法进行全局注入。

#### 方法一 全量引入

##### 直接引入

 import '@babel/polyfill'
但上面那个已经废弃，现在全量引入是下面两句

import "core-js/stable";
import "regenerator-runtime/runtime";

##### 按需引入--优化

@babel/polyfill要装在**依赖**上
再配置@babel/preset-env，useBuiltIns：'usage'

```javascript
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "usage"
      }
    ]
  ]
}
```

#### 方法二

使用插件@babel/transform-runtime

```javascript
{ 
  "presets": [
  [
    "@babel/env",
    {
      "modules": "commonjs",  //设置ES6 模块转译的模块格式 默认是 commonjs
    }
  ]
],
  // 插件执行是正序
  "plugins": [
    "@babel/transform-react-jsx", //如果是需要支持 jsx 这个东西要单独装一下。
    "@babel/transform-runtime", 
  ] 
}
```

### 总结

#### 打包体积

全局引入 @babel/polyfill + "useBuiltIns": "usage"的方式
可以根据环境判断要引入哪些polyfill
这个可以有效减少打包后代码的体积

babel-polyfill 是配置了执行环境的，通过环境看你需要哪些 polyfill

而 transform-runtime，是发现我们代码需要什么 polyfill就重写哪些polyfill

所以使用transform-runtime后打包体积是小于@babel/polyfill + "useBuiltIns": "usage"的

#### 全局污染

@babel/polyfill比较暴力，会重写代码中的原生对象、方法
而transform-runtime不会。  

#### polyfill的广度

instance 上新添加的一些方法
babel-plugin-transform-runtime 是没有做处理的
比如 数组的 includes, filter, fill 等

### 使用

npm i -D @babel/core @babel/preset-env babel-loader core-js

core-js就是处理高级的api，Promise什么的
babel只是负责转译js，core-js相当于拓展了babel的能力

```javascript
// -->module/rules
{
  test:/\.js$/,
    use:[
    {
      loader:'babel-loader',
      options:[
        presets:[
        [
          // 指定环境的插件
          "@babel/preset-env",
          // 配置信息
          {
            targets:{
              "chrome":"66",
              "ie":"11"
            },
            "core-js":"3",
            // 使用core-js的方式    usage是按需加载
            "useBuildIns":"usage"
          }
        ]
        ]
      ]
    }
    }
}
```

postcss

```javascript
test:/\.less$/,
  user:['style-loader','css-loader',
        {
          loader:'postcss-loader',
          optiobns:{
            postcssOptions:{
              plugins:[
                ["posetcss-preset-env",
                 {
                   browsers:"last 2 versions"
                 }
                ]
              ]
            }
          }
        },
'less-loader']
```

写一个babel插件
[https://juejin.cn/post/7114486435487023112](https://juejin.cn/post/7114486435487023112)
babel.config.js

```javascript

{
  "presets": [
  ],
    "plugins": [
    ["./src/plugins/my-plugin.js", { // 此处配置插件
      "a": 1
    }]
  ]
}


```

src/plugins/my-plugin.js

```javascript
// src/plugins/my-plugin.js
module.exports = function(api, options, dirname) {
  return {
    pre(file) {
      this.addHelper('asyncToGenerator') // 关键代码
    },
    visitor: {
    }
  };
};
```

## babel缓存

开启：cacheDirectory: true   即可
hash  webpack构建时生成的hash
chunkhash   同一个打包文件chunkhash一样
contenthash 根据内容创建hash，唯一

```
module.exports = {
 ...
 module: {
  rules: [
   ...
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include:resolve(__dirname,'src')
        loader: 'babel-loader',
        enforce:"pre",// "post"
        options: {
        presets: [
         ...
       ],
        //开启babel缓存，第二次构建时，会读取之前的缓存
        cacheDirectory: true
        }
      }
  ]
 }
}

// 方法二：.bablerc
{
    // "presets": [["@babel/preset-react", {"modules": false }]],
    "presets": ["@babel/preset-env", "@babel/preset-react"],
    "plugins": ["babel-plugin-transform-runtime"]
}
```

## 多进程打包thread-loader

项目多使用，消耗时间长的时候使用，这里帮babel多进程打包

```javascript
npm i -D thread-loader
babel使用
module.exports = {
module:{
 rules:[{
  test:/\.js$/,
  exclude:/node_modules/,
  use:[
   'thread-loader',// 开启多进程打包，启动消耗600ms，大于600ms使用就不亏
   {
        //写法1
    loader:'babel-loader',
        // 写法2
        {
         loader:'babel-loader',
         options:{
          workers:2
        }
        }
    options:{
     preset:[
      [
       '@babel/preset-env',
       {
        useBuiltIns:'usage',
        corejs:{verson:3},
        targets:{
         chrome:'60',
         firefox:'50'
        }
       }
      ]
     ] 
    }
   }
  ]
 }]
}
```

## Happypack

```javascript
module.exports={
 module:{
  rules:[
   {
        test:/.\js$/,
        exclude:/node_modules/,
        include:path.resolve('src'),
        use:'Happypack/loader?id=js'
   },
   {
    test:/.\.css$/,
    // use:['style-loader','css-loader'],
    use:'Happypack/loader?id=css'
   }
  ]
 },
 plugins:[
  new Happypack({
   id:'js',
      use:[{
        loader:'babel-loader',
        options:{
          presets:[
            '@babel/preset-env',
            '@babel/preset-react'
          ]
   }}]
  })
    new Happypack({
   id:'css',
     use:['style-loader','css-loader'],
  })
 ]
}
```
