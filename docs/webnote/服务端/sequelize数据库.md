# 使用sequelize连接mysql

#### 安装

 npm i sequelize mysql2

https://github.com/demopark/sequelize-docs-Zh-CN

### mysql

可以使用docker搭个mysql先

```json
docker run -d  -p 3306:3306  --name mysql57 -v ~/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 459651132a11
```

进入mysql

```json
docker exec -it bac2692e2b9a(容器ID) sh
```

登录mysql

mysql -uroot -p  然后输入密码，密码不会显示的，输完回车即可进入mysql

```json
查看databases
show databases;
create database ikun_db;   创建库
use ikun_db;
show tables;
// 创建表
create TABLE user_score
(
    id       bigint(20)    NOT NULL AUTO_INCREMENT comment 'id',
    username   varchar(256)           comment '用户名',
    score     int(11)       NOT NULL comment '得分',
    costTime   int(11)       NOT NULL comment '耗时（秒）',
    questions  varchar(1024) NOT NULL comment '题目 json',
    answers    varchar(1024) NOT NULL comment '答案 json',
    createTime datetime               DEFAULT CURRENT_TIMESTAMP comment '创建时间',
    updateTime datetime               DEFAULT CURRENT_TIMESTAMP ON update CURRENT_TIMESTAMP,
    isDelete   tinyint(4)    NOT NULL DEFAULT '0' comment '是否删除',
    PRIMARY KEY (id)
)
```



创建table前需要先有databaes（不然报错：No database selected）



新建数据库 ikun_test

新建表 user_score

```typescript
create TABLE `user_score`
(
    `id`         bigint(20)    NOT NULL AUTO_INCREMENT comment 'id',
    `username`   varchar(256)           comment '用户名',
    `score`      int(11)       NOT NULL comment '得分',
    `costTime`   int(11)       NOT NULL comment '耗时（秒）',
    `questions`  varchar(1024) NOT NULL comment '题目 json',
    `answers`    varchar(1024) NOT NULL comment '答案 json',
    `createTime` datetime               DEFAULT CURRENT_TIMESTAMP comment '创建时间',
    `updateTime` datetime               DEFAULT CURRENT_TIMESTAMP ON update CURRENT_TIMESTAMP,
    `isDelete`   tinyint(4)    NOT NULL DEFAULT '0' comment '是否删除',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB comment ='用户得分'
```

### 开始连接

```typescript
const { Sequelize } = require("sequelize");

/**
* 创建数据库实例
* @type {Sequelize}
*/
const sequelize = new Sequelize({
  database: 'ikun_test',
  username:  'root',
  password:  '123456',
  host: 'localhost',
  port: 3306,
  dialect: "mysql",
  logging: console.log, // 默认值,显示日志函数调用的第一个参数
});

// 测试连接
sequelize
  .authenticate()
  .then(() => {
  console.log("MySQL client connected");
})
  .catch((e) => {
  console.error("Unable to connect to MySQL", e);
});

module.exports = sequelize;
```

### 操作数据库

新建模型

```typescript
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

/**
 * 用户得分模型
 * @author yupi
 */
const UserScoreModel = sequelize.define(
  "UserScore",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    costTime: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    questions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answers: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createTime: {
      type: DataTypes.DATE,
    },
    updateTime: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "user_score",
    paranoid: true,
    deletedAt: "isDelete",
    timestamps: false,
  }
);
```

新增数据

```typescript
UserScoreModel.create({
    username,
    score,
    answers: JSON.stringify(answers),
    questions: JSON.stringify(questionIds),
})
```

查询数据

```typescript
const { Op } = require("sequelize");
let userScore = await UserScoreModel.findByPk(id);
UserScoreModel.count({
  where: {
    score: {
      [Op.gt]: userScore.score,
    },
  },
}))
// 排名
 UserScoreModel.findAll({
    limit: size,
    order: [["score", "desc"]],
});
```