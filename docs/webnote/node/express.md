# express

https://www.cnblogs.com/kk199578/articles/14327146.html



```javascript
// 创建应用
const app = express()
// express内置urlencode中间件
app.use(express.urlencoded({ extended:false }));

app.listen(9000,()=>{})
```



### session管理

```typescript
const session = require("express-session")
app.use(
  session({
    name: "ikun", // 设置 session 对应 cookie 的名称
    secret: "ikun", // 服务器生成 session 的签名
    cookie: {
      // cookie 配置与cookie-parser的配置一致
      maxAge: 1000 * 60 * 60,
      secure: false,
    },
  }));
```

### 跨域设置

```typescript
// 自己处理
app.all("*", (req, res, next) => {
  // 开启跨域
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const origin = req.get("Origin");
  // 允许的地址 http://127.0.0.1:9000 这样的格式
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  // 允许跨域请求的方法
  res.setHeader("Access-Control-Allow-Methods","POST, GET, OPTIONS, DELETE, PUT");
  // 允许跨域请求 header 携带哪些东西
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since"
  );
  next();
});

// 使用cors插件
const cors = require('express-cors)
app.use(cors)
```



### 接收数据

#### bodyParser

```typescript
const bodyParser = require('body-parser');

// extended:false表示方法内部使用querystring模块处理请求参数的格式
// extended:true表示方法内部使用第三方模块qs处理请求参数的格式
app.use(bodyParser.urlencoded({ extended: false }));// urlencoded

app.use(bodyParser.raw());// 二进制buffer

app.use(bodyParser.json());// json

app.use(bodyParser.text());// text/plain

// 也可以单独作为中间件
app.get('/test',bodyParser.json(),function(req,res){})
```



### 路由

```typescript
const router = require("./router");
app.use("/aa", router);

// router.js
const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
    res.send('hello, express aa')
    //  res.redirect('/pages/index.html')
})

module.exports = router
```

### 一些工具方法

#### 获取用户ip

```typescript
/**
 * 获取真实客户端 ip
 * @param req
 * @returns {*|string}
 */
function getClientIp(req) {
  if (!req) {
    return "";
  }
  return (
    req.headers["x-forwarded-for"] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    req.connection?.socket?.remoteAddress ||
    req.ip
  );
}
```

#### 使用express-generator创建

npm i express-generator -g

```typescript
// -e === --view=ejs
express demo --view=ejs
express demo -e
```



#### res返回有几种

```typescript
res.end(JSON.stringify({
  code: 0,
  message: "file is upload success",
}))
res.send({msg:'树枝666'})
res.sendFile('file path')
res.json({
  msg:"树枝666"
})
```





### 自动代理 托管静态文件

express.static('ikun')不以斜杆开头，后面可跟斜杆

```javascript
// 自动代理 托管静态文件
app.use('/ikun', express.static('ikun')); // http://localhost:8080/AstronautsWatch/
app.use('/img', express.static('ikun/img')); // http://localhost:8080/img/shuzhi666.png
app.use(express.static('public')); // http://localhost:8080/images/1.png
```



### http包express

```javascript
var express = require('express');
var app = express();

var http_server = http.createServer(app);
http_server.listen(4500, () => {
  console.warn('http :4500');
});

// https
var https = require('https');
var filePathKey = path.join(__dirname, './cert/1557605_www.learningrtc.cn.key');
var filePathCert = path.join(__dirname, './cert/1557605_www.learningrtc.cn.pem');
var options = {
  key: fs.readFileSync(filePathKey),
  cert: fs.readFileSync(filePathCert),
};
var https_server = https.createServer(options, app);
https_server.listen(4400, () => {
  console.warn('https :4400');
});
```

socket.io包http

```javascript
var socketIo = require('socket.io');

var io;
if (process.env.NODE_ENV == 'development') {
  io = socketIo.listen(http_server);
  console.warn('仅支持本地电脑的一个浏览器开启窗口输入 http://localhost:4500 进行测试');
} else if (process.env.NODE_ENV == 'production') {
  io = socketIo.listen(https_server);
  console.warn('可以在局域网内的2个电脑之间输入 https://局域网内ip地址:4400 进行测试');
}
```



## 代理webpack项目

### webpack-dev-middleware

```markdown
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
);
const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.tsx'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000'
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.ttf$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new MonacoWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin()
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.html']
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    publicPath: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  output: {
    filename: '[name].bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist')
  }
};
```