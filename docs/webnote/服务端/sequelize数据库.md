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



## 条件判断where

https://www.sequelize.cn/core-concepts/model-querying-basics#%E5%BA%94%E7%94%A8-where-%E5%AD%90%E5%8F%A5

### 几种写法

```
Post.findAll({
  where: {
  	// 常规 SELECT * FROM post WHERE authorId = 2;
    authorId: 2
    status: 'active'
    // 一对一 SELECT * FROM post WHERE authorId = 2;
    authorId: {
      [Op.eq]: 2
    }
    // 一对多 SELECT * FROM post WHERE authorId = 12 AND status = 'active';
    [Op.and]: [
      { authorId: 12 },
      { status: 'active' }
    ]
  }
});
```

### 其他

```
const { Op } = require("sequelize");
Post.findAll({
  where: {
    [Op.and]: [{ a: 5 }, { b: 6 }],            // (a = 5) AND (b = 6)
    [Op.or]: [{ a: 5 }, { b: 6 }],             // (a = 5) OR (b = 6)
    someAttribute: {
      // 基本
      [Op.eq]: 3,                              // = 3
      [Op.ne]: 20,                             // != 20
      [Op.is]: null,                           // IS NULL
      [Op.not]: true,                          // IS NOT TRUE
      [Op.or]: [5, 6],                         // (someAttribute = 5) OR (someAttribute = 6)

      // 使用方言特定的列标识符 (以下示例中使用 PG):
      [Op.col]: 'user.organization_id',        // = "user"."organization_id"

      // 数字比较
      [Op.gt]: 6,                              // > 6
      [Op.gte]: 6,                             // >= 6
      [Op.lt]: 10,                             // < 10
      [Op.lte]: 10,                            // <= 10
      [Op.between]: [6, 10],                   // BETWEEN 6 AND 10
      [Op.notBetween]: [11, 15],               // NOT BETWEEN 11 AND 15

      // 其它操作符

      [Op.all]: sequelize.literal('SELECT 1'), // > ALL (SELECT 1)

      [Op.in]: [1, 2],                         // IN [1, 2]
      [Op.notIn]: [1, 2],                      // NOT IN [1, 2]

      [Op.like]: '%hat',                       // LIKE '%hat'
      [Op.notLike]: '%hat',                    // NOT LIKE '%hat'
      [Op.startsWith]: 'hat',                  // LIKE 'hat%'
      [Op.endsWith]: 'hat',                    // LIKE '%hat'
      [Op.substring]: 'hat',                   // LIKE '%hat%'
      [Op.iLike]: '%hat',                      // ILIKE '%hat' (不区分大小写) (仅 PG)
      [Op.notILike]: '%hat',                   // NOT ILIKE '%hat'  (仅 PG)
      [Op.regexp]: '^[h|a|t]',                 // REGEXP/~ '^[h|a|t]' (仅 MySQL/PG)
      [Op.notRegexp]: '^[h|a|t]',              // NOT REGEXP/!~ '^[h|a|t]' (仅 MySQL/PG)
      [Op.iRegexp]: '^[h|a|t]',                // ~* '^[h|a|t]' (仅 PG)
      [Op.notIRegexp]: '^[h|a|t]',             // !~* '^[h|a|t]' (仅 PG)

      [Op.any]: [2, 3],                        // ANY (ARRAY[2, 3]::INTEGER[]) (PG only)
      [Op.match]: Sequelize.fn('to_tsquery', 'fat & rat') // 匹配文本搜索字符串 'fat' 和 'rat' (仅 PG)

      // 在 Postgres 中, Op.like/Op.iLike/Op.notLike 可以结合 Op.any 使用:
      [Op.like]: { [Op.any]: ['cat', 'hat'] }  // LIKE ANY (ARRAY['cat', 'hat'])

      // 还有更多的仅限 postgres 的范围运算符,请参见下文
    }
  }
});
```

