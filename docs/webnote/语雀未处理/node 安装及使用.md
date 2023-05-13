
## 一些链接

#### NodeJS、NPM安装配置步骤(windows版本) 以及环境变量详解

[https://blog.csdn.net/shenggaofei/article/details/80361627](https://blog.csdn.net/shenggaofei/article/details/80361627)

#### [web前端node.js常用命令](https://www.cnblogs.com/caoxiangwang/p/11444146.html)

[https://www.cnblogs.com/caoxiangwang/p/11444146.html](https://www.cnblogs.com/caoxiangwang/p/11444146.html)

#### npm install 报错(npm ERR!errno -4048)

[https://blog.csdn.net/wanlixingzhe/article/details/81020236](https://blog.csdn.net/wanlixingzhe/article/details/81020236)

#### 使用npm踩过的坑

[https://blog.csdn.net/taylorzun/article/details/81233404](https://blog.csdn.net/taylorzun/article/details/81233404)

#### npm安装依赖errno -4048报错

[https://www.jianshu.com/p/3d209a682d7d](https://www.jianshu.com/p/3d209a682d7d)

#### Node.js安装及环境配置之Windows篇

[https://www.cnblogs.com/zhouyu2017/p/6485265.html](https://www.cnblogs.com/zhouyu2017/p/6485265.html)


## 常见问题

### win10 在使用powershell时不能运行cnpm命令

解决淘宝镜像安装后使用不了问题
安装淘宝镜像后运行cnpm报错如下

解决方法
以管理员身份运行powershell
执行：get-ExecutionPolicy，显示Restricted，表示状态是禁止的
然后执行set-ExecutionPolicy RemoteSigned

输入A Enter就解决了


# webpack4

"dev": "webpack-dev-server --inline --hot --env.dev",

 "dev":"webpack-dev-server --open(自动打开浏览器) --port 3000(改端口) --hot --progress(进度) --compress(压缩) --host 127.0.0.1(改localhost)"

# 创建web服务器
## http

```javascript
const http = require('http')
const app = http.createServer((req,res)=>{
  //req里有url
  //res可以用来设置参数返回
  res.writeHead(200, { 'Content-type': 'text/html' } 
  res.write(data)
  res.end()
});
app.on('request',(req,res)=>{
	res.end() 
})
app.listen(3000,()=>{
  console.log('服务器启动成功，http://loacalhost:3000')
})
```

## express@4

--http升级版

| express | npm i express@4 -s |
| --- | --- |
| 日志模块 | npm install express morgan |
| 数据库 | npm install mysql -s |
| favicon | npm install serve-favicon -s |


### app.js

```javascript
##app.js---------------------------------
const express = require('express') 
const logger = require("morgan") 
const app = express()
app.use(logger("dev"))

//设置跨域访问
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// 获取post请求的数据  req.body 即可获取
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//这个是直接归属根目录
app.use(require('./routes/router'))
//下面的是设置父级目录
app.use('/users', require('./routes/users'));
app.use('/order', require('./routes/order'));
// 配置static静态资源文件夹的父级
app.use(express.static(__dirname+"/src")) 
app.get('/', (req, res, next) => {
  res.send("ok")
})
app.listen(3000, () => {
  console.log('服务器启动成功，http://loacalhost:3000'
              }) 

##router.js---------------------------------------
const express = require("express")
const router = express.Router
router.get('/', function (req, res) {
  //  res.send('hello, express')
  res.redirect('/pages/index.html')
})
router.get('/:id', function (req, res) {
  res.send(`${req.params.id} 用户信息`);
});
router.post('/login',(req,res)=>{})
module.exports = router
```

### url模块

```javascript
const querystring = require('querystring')
querystring.parse()

const path = require('path')
const url = require('url')
const fs = require('fs')
const mime = require('mime')
app.on('request',(req,res)=>{
  //拼接路径
  // url.parse(req.url,true).query 
  let pathname = url.parse(req.url).pathname
  let realPath = path.join(__dirname,'pubilc'+pathname
                           let type = mime.getType(realPath) 
  //读取文件
  fs.readFile(realPath,(error,result)=>{
    if(error !== null){
      res.writeHead(404,{'content-type':'text/plain;charset=utf-8'})    
      res.end('读取文件失败') 
      return
    }
    // 成功返回状态码和类型
    res.writeHead(200,{ 'content-type':type})
    res.end(result)
  })
})
```

### promisify模块--读取文件

```javascript
const fs = require('fs')
const promisify = promisify('util').promisify
const readFile = promisify(fs.readFile)
async function run(){
  let r1 = await readFile('./1.txt','utf-8')
  let r2 = await readFile('./2.txt','utf-8')
  let r3 = await readFile('./3.txt','utf-8')
}
run()
```

### 数据库模块

```javascript
##mysql.js
const mysqlModule = require("mysql")
module.exports = {dbConfigFun}
function dbConfigFn(sql,params,fn){
  // 创建连接
  let db = mysqlModule.createConnection({
		host:"localhost",
    port:"3306",
    user:"root",
    password:"root",
    database:"demoDB"  
	})
  db.connect()
  //执行语句
  db.query(sql,parmas,fn)
	db.end()
}

##app.js
const dbFn = require('..dbConfigFun')
let sql1 = "select * from tableName where usernam = ? and pwd = ?"
let sql2 = "insert into tableName values (null,?,?,?)"
let params = [username,password]
dbFn.dbConfigFn(sql1,params,(err,data)=>{
   // data是个数组，没查到数组长度为0
  if(data.length){console.log("登录成功")}
})
#用模板字符串把sql处理好在传入参数，这种方法会有漏洞，别人可以通过sql注入：密码随便设，后面加上'or 1='1'便可登录，不建议使用，所以上面传入数据的方式安全
let sql1 = `select * from tableName where usernam = '${usernam}' and pwd = '${password}'`
dbFn.dbConfigFn(sql1,[],(err,data)=>{
   // data是个数组，没查到数组长度为0
  if(data.length){console.log("登录成功")}
})
```

### 连接池

app.js==>router.js==>controller.js==>dao==>dbPool

控制器：我有数据

dao：我有模型，我就是拼各种模型的

连接池：我有做模型的方法

```javascript
##mysqlPool.js
const mysql = require('mysql')
const poolCig ={
  host:"localhost",
  port:"3306",
  user:"root",
  password:"root",
  database:"demoDB"  
}
cosnt dbPool ={
  pool:{},
  create(){ this.pool = mysql.createPool(poolCig) },
  connect(sql ,arr ,fn){
    this.pool.getConnection((err,connection)=>{
      connection.query(sql,arr,fn)
      connection.release()
    })
  }
}
dbPool.create()
module.exports = dbPool

##dao层 userDao.js
const dbPool = require('mysqlPool.js')
module.exports = {
  addUser(sql,arr,cb){
    dbPool.connect(sql,arr,(err,data)=>{
      //dbPool 中fn直接把原本的回调(err,data)=>{}替换了，所以dao层传参cb时外面要包裹一层,不包应该也没问题
      cb(err,data)
    })
  }
}

##userCtrl.js
const userDao = reqyire("userDao.js")
adduser(){
  userDao.addUser(insert into tableName values (null,?,?,?),[zhangsan,123,我是张三],(err,data)=>{
    if(data){res.send('success')}
    else{res.send('fail')}
	})
}

##indexRouter.js
const userCtrl = require("userCtrl")
router.post('/login',userCtrl.addUser())
```

### favicon

```
const favicon = require("serve-favicon")
app.use(favicon(__dirname+"/src/images/xxxx.jpg"))
```

### req||res

```javascript
#req
req.headers
req.url
req.method  --get /post
//提交的表单数据 xxx是input标签里的name属性
//post请求不能获取，因为他解析的url
req.query.xxx 
# res
res.send() 
res.json() 这个也是发送
res.writeHead(200)
res.end()
res.redirect("/page/index.html")
res.status(404) 
res.redirect("/pages/404.html")
#'content-type':
'text/plain;charset=utf-8' --纯文本
text/html
text/css
```

## Koa2

--express升级版

日志模块--两个都可以用

const morgan = require('koa-morgan')

const Koa_Logger = require("koa-logger")

```javascript
const Koa = require('koa')
const app = new Koa();
const Koa_Logger = require("koa-logger"); //需安装依赖
const logger = Koa_Logger()
app.use(logger)
app.listen(8888, () => {
    console.log('请求地址为：http://127.0.0.1:8888')
})
```

## gulp[@3.9.1 ](/3.9.1 ) 

```
安装 gulp 命令行工具
npm install --global gulp-cli
cnpm init 
cnpm i gulp@3.9.1 -D
```

##### 报错primordials is not defined

[https://blog.csdn.net/zxxzxx23/article/details/103000393](https://blog.csdn.net/zxxzxx23/article/details/103000393)

安装gulp版本3.9.1与node版本12.4.0不兼容，需要**11.15.0版本**

##### 使用插件

cnpm i gulp-sass -D

```
gulp.task("sass",function(){
return gulp.src("stylesheet/index.scss")
.pipe(sass()).pipe(gulp.dest("dist/css"))
})
```

### 

## Express+EJS项目

EJS是Express的模板，Express的模板有很多，目前较流行的应该是Jade，不过EJS相对比较简单，结构清晰和asp之类的开发比较相似，所以我这里选用了EJS。根据Express官网的[模板引擎](https://link.jianshu.com?t=http://www.expressjs.com.cn/advanced/developing-template-engines.html)介绍可以知道，模板是用来渲染html页面的，简单的说就是替换一些数据(标签)然后打包发给客户端浏览器，使用文件后缀来识别要使用哪个引擎处理(EJS后缀为.ejs)。xxx.ejs->EJS->html->浏览器。

```javascript
# 安装后我们就能使用express命令了
npm install express-generator -g
# 生成EJS项目
  // 会以项目名创建一个文件夹，项目文件放到文件夹里面
  express --view=ejs server
  express -v ejs 项目名  
  // 把项目文件放在当前文件夹(当前文件夹非空会有警告)
	express -v ejs
	注：ejs表示使用ejs模板，默认是jade
npm install 
# 启动项目
npm start
```

访问[http://www.localhost:3000/](https://link.jianshu.com/?t=http://www.localhost:3000/)

注意要加3000端口，Express默认监听的是3000端口而不是80

# commonJS

Node 应用由模块组成，采用 CommonJS 模块规范。

每个模块有自己的变量和方法，需要一种方式去暴露和引用一个模块的变量和方法。

require方法用于加载模块，module.exports和exports用于暴露方法。

module.exports和exports的区别：

（1）module.exports 初始值为一个空对象 {}；

（2）exports 是指向的 module.exports 的引用；

（3）require() 返回的是 module.exports 而不是 exports

写法：exports = module.exports = somethings，即 module.exports 指向新的对象时，exports 断开了与 module.exports 的引用，那么通过 exports = module.exports 让 exports 重新指向 module.exports 即可。

CommonJS模块的特点：

(1）所有代码都运行在模块作用域，不会污染全局作用域。

(2）模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。

（3）模块加载的顺序，按照其在代码中出现的顺序。

AMD规范与CommonJS的区别：

CommonJS规范加载模块是同步的，AMD规范则是非同步加载模块，允许指定回调函数。

由于Node.js主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，所以CommonJS规范比较适用。

但是，如果是浏览器环境，要从服务器端加载模块，这时就必须采用非同步模式，因此浏览器端一般采用AMD规范。

CommonJS模块的加载机制是，输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。

# exports暴露

### export const

```
export const a = {}
export const b = {}
export const c = {}

// 导入
import {结构} from './..'
或者
import * as name from './..'
```

### export default

```
export default {
	a:{},
	b(){}
}

// 导入
import namefrom './'
...名字 //展开运算引入
```

### module.exports =  function

```
module.exports =()=>{}

// 导入
const fn = require('@/..')  // fn()直接用
```

# 安装sass

### 报错：

Node Sass could not find a binding for your current environment: Windows 64
node sass 没找到你当前环境的绑定

重新构建Node-sass
输入命令： npm rebuild node-sass
然后在更新一下：npm update

期间需要连接github，可能由于网络原因造成错误

#### sass-loader版本过高运行错误TypeError: this.getOptions is not a function

```
// 卸载
npm uninstall sass-loader
// 安装
npm i -D node-sass@4
npm i -D sass-loader@7.1.0
```

## node更新版本

直接卸载，官网下载好对应安装包，直接安装

再走一边上面安装流程
