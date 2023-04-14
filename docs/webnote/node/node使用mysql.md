# node使用mysql



## 安装依赖

```
pnpm add mysql
```

## 创建数据库连接

```js
const mysql = require('mysql');

// 创建数据库连接
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'databasename'
});

// 连接数据库
connection.connect(function(error) {
  if (error) {
    console.error('连接数据库出错：' + error.stack);
    return;
  }
  console.log('连接数据库成功，数据库连接ID：' + connection.threadId);
});
```

## 创建table

```js
let sql = `CREATE TABLE
    IF
        NOT EXISTS USER (
            id INT ( 11 ) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR ( 255 ) NOT NULL UNIQUE,
            password VARCHAR ( 255 ) NOT NULL,
            avatar VARCHAR ( 255 ) NULL,
            phone VARCHAR ( 50 ) NULL,
            name VARCHAR ( 255 ) NULL,
            signature LONGTEXT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
`
db.query(sql, (error, results, fields) => {
    if (error) return console.log(error);
});
```

## 简单封装

```js
function Query(sql, info) {
    return new Promise((resolve, reject) => {
        db.query(sql, info, async (err, results) => {
            resolve({ err, results })
        })
    })
}
// 使用
// 查询
const sql = 'select username,password from user where username=?'
let { err, results } = await Query(sql, [username])
let user = {
 avatar: "",
 phone: "",
 signature: "",
}
// 新增
const sqlStr = 'insert into user set ?'
let res2 = await Query(sqlStr, user)

// 修改
const sqlStr = 'update user set password=? where username=?'
db.query(sqlStr, [password, username], (err, results) => {
 // 执行 SQL 语句失败了
 if (err) return RespError(res, RespServerErr)
})
```

## SQL 查询

```js
// 查询所有用户数据
connection.query('SELECT * FROM users', function(error, results, fields) {
  if (error) {
    console.error('查询数据出错：' + error.stack);
    return;
  }
  console.log('查询结果：', results);
});
```

## SQL 插入、更新、删除

```js
// 插入一条新用户记录
const newUser = { name: '张三', age: 20 };
connection.query('INSERT INTO users SET ?', newUser, function(error, results, fields) {
  if (error) {
    console.error('插入数据出错：' + error.stack);
    return;
  }
  console.log('新用户ID：', results.insertId);
});
```



## query方法

其参数有以下两个：

1. `sql`：要执行的 SQL 查询语句，可以包含占位符。
2. `values`：用于替换 SQL 查询语句中占位符的值，可以是数组或对象。

```js
connection.query('SELECT * FROM users', function(error, results, fields) {
  if (error) throw error;
  console.log('查询结果：', results);
});

connection.query('SELECT * FROM users WHERE name = ?', ['张三'], function(error, results, fields) {
  if (error) throw error;
  console.log('查询结果：', results);
});

const user = { name: '张三', age: 20 };
connection.query('SELECT * FROM users WHERE name = :name AND age = :age', user, function(error, results, fields) {
  if (error) throw error;
  console.log('查询结果：', results);
});
```



