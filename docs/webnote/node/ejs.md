# ejs

## 安装依赖

全局安装express-generator

## 创建项目

express -e   <project_name>

- -e 使用ejs

- app.js 不是入口

- 执行文件在./bin/www



express配置ejs

```js
// 引入 Express 框架和其他模块
const express = require('express');
const path = require('path');

// 创建 Express 应用程序实例
const app = express();

// 视图引擎设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 路由设置
app.get('/', (req, res) => {
  // 渲染 index.ejs 视图，并传递参数
  res.render('index', { title: 'Express', message: 'Hello, World!' });
});

// 启动应用程序
const server = app.listen(3000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
```





## 处理文件请求

formidable

解析req，可以拿到formdata,fields是普通字段，files是文件字段

```js
router.post('/portrait',(re1,res)=>{
    const form = formidable({
        multiples:true,
        uploadDir:__dirname+'/../public/images',
        keepExtensions:true
    })
    form.parse(req,(err,fields.files)=>{
        if(err){
            next(err)
            return
        }
    
    })
})
```





