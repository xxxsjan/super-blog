# node文件上传

## express-fileupload

```js
const express = require('express');
// 从Express 4.16.0+版本开始，不需要单独引入body - parser，直接使用express.urlencoded和express.json
// const bodyParser = require('body - parser'); 
const fileUpload = require('express - fileupload');

const app = express();

// 使用内置的urlencoded中间件解析URL编码格式的请求体数据
app.use(express.urlencoded({ extended: true }));
// 使用内置的json中间件解析JSON格式的请求体数据
app.use(express.json());
// 使用express - fileupload中间件
app.use(fileUpload());

// 设置CORS（跨域资源共享），生产环境应指定具体来源
app.all('*', (req, res, next) => {
    res.header('Access - Control - Allow - origin', '*');
    res.header('Access - Control - Allow - Methods', 'POST,GET');
    next();
});

// 示例路由，可根据实际需求添加更多路由
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// 启动服务器
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

```

```js
// 获取formData的file的话
const {file} =req.files
```
