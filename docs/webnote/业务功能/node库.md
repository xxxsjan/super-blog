# node库



## lowdb

json存储方案

commonjs推荐下载1.0.0版本

https://www.npmjs.com/package/lowdb/v/1.0.0



## **node执行ts文件**

### ts-node

需要ts-node nodemon一起

```javascript
"start:dev": "cross-env nodemon --watch 'src/**/*' -e ts,tsx --exec 'npx ts-node' ./src/server.ts",
```

也可以结合typescript编译后，启动

```javascript
 "start": "tsc && node dist/server.js",
```

## 日志打印morgan

参考ejs模板的app.js

```typescript
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
```

## prettier

.prettierrc.js

```typescript
module.exports = {
  printWidth: 100,
  arrowParens: "avoid",
  bracketSpacing: true,
  endOfLine: "lf",
  bracketSameLine: false,
  quoteProps: "as-needed",
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "none",
  useTabs: false,
  vueIndentScriptAndStyle: false,
  multiline: {
    delimiter: "none",
    // "requireLast": true
  },
};
```



parser可选值

```typescript
export type BuiltInParserName ='angular'
    | 'babel-flow'
    | 'babel-ts'
    | 'babel'
    | 'css'
    | 'espree'
    | 'flow'
    | 'glimmer'
    | 'graphql'
    | 'html'
    | 'json-stringify'
    | 'json'
    | 'json5'
    | 'less'
    | 'lwc'
    | 'markdown'
    | 'mdx'
    | 'meriyah'
    | 'scss'
    | 'typescript'
    | 'vue'
    | 'yaml';
```

格式化

```typescript
const prettier = require("prettier");

const bundleContent = `
(function(modules) {
function require(fileName) {
const fn = modules[fileName];
const module = { exports:{}};
fn(require, module, module.exports)
return module.exports
}
require('${this.entry}')
})({${modules}})
`;
const prettierConfig = await prettier.resolveConfig(path.resolve('.prettierrc.js'))

fs.writeFileSync(
  outputPath,
  prettier.format(bundleContent, { ...prettierConfig, parser: 'babel' }),
  'utf-8'
    )
```

## **上传文件**

https://github.dev/CodeSteppe/dnd-file-uploader

[https://www.bilibili.com/video/BV1mW4y1y7vE](https://www.bilibili.com/video/BV1mW4y1y7vE?p=1&share_from=ugc&share_medium=android&share_plat=android&share_session_id=d7f57936-d84e-45b6-a707-58c48d52eec0&share_source=WEIXIN&share_tag=s_i&timestamp=1659331125&unique_k=oEE4dQf&vd_source=11e14f37a256537712e73b4b7f52411c)

可以学习到：

使用到了multer作为服务端上传中间件

```typescript
const express = require("express")
const app = express()
const cors = require('cors')
const multer = require('multer')

app.use(cors())

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      // 文件夹需要提前建好
      callback(null, "./uploads");
    },
    filename: function (req, file, callback) {
      const filename = req.headers["x-file-name"];
      callback(null, `${Date.now()}-${decodeURIComponent(filename)}`);
    },
  }),
});

app.post('/upload', upload.single('file'), (req, res) => {
  console.log('req', req.file);
  res.json({ url: `http://localhost:3000/uploads/${req.file.filename}` })
});

app.listen(3000,()=>{})
```



## 解析html

https://github.com/taoqf/node-html-parser





## portfinder获取端口



```
const Portfinder = require("portfinder");
Portfinder.basePort = 9080;

portfinder.getPort((err, port) => {
  if (err) {
    console.error('Error finding available port:', err);
  } else {
    console.log('Available port:', port);
  }
});
```





## rollup

watch

```
const watcher = rollup.watch(opt);
watcher.on("change", (filename) => {
      // 主进程日志部分
      logStats("Main-FileChange", filename);
    });
watcher.on("event", (event) => {
      if (event.code === "END") {
        
       
      } else if (event.code === "ERROR") {
       
      }
});
```

## 抽离已用css

https://v1.purgecss.com/#cli

```
npx sass ./index.scss ./index.css
npx purgecss --css './index.css' --content './profile.vue' --output './optimized.css'
```

