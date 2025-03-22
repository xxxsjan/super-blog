# Vercel KV

[Vercel KV首页](https://vercel.com/storage/kv)

[Vercel KV文档](https://vercel.com/docs/storage/vercel-kv/quickstart)

## 创建Vercel KV（redis）

点击getstart开始

点击 create database

![](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202306220210196.png)

选择KV

![](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202306220211053.png)

接受协议

![image-20230622021141040](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202306220211433.png)

起个名字

![image-20230622021343458](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202306220213644.png)

创建成功后，可以看到使用方法

![image-20230622021539701](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202306220215468.png)

## 开始使用

### 新建redis数据

点击cli，这里可以输入redis命令

![image-20230622024324249](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202306220243604.png)

尝试创建一个数据

```
// 创建
hset user:me email email@me.com id 123
// 查看
hgetall user:me
```

![image-20230622024429075](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202306220244998.png)

### 创建一个next应用

<https://www.nextjs.cn/docs/getting-started>

```bash
npx create-next-app@latest --typescript
```

安装@vercel/kv   pnpm i @vercel/kv

全局安装vercel pnpm i -g vercel@latest

执行vercel link

选择connect with github

![image-20230622025220269](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202306220252503.png)

### KV连接项目

然后在连接项目

![image-20230622021948489](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202306220219350.png)

选择你刚刚link的项目名

![image-20230622022016303](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202306220220659.png)

![image-20230622032852261](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202306220328122.png)

这样执行命令  vercel env pull .env.development.local   后

会在项目根目录生成.env.development.local文件

文件内容就会包含value值

如果没connect执行命令，文件里面value都是空的

### 当接口使用

pages/api/user.ts

```ts
import { kv } from '@vercel/kv';
import { NextApiRequest, NextApiResponse } from 'next';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const user = await kv.hgetall('user:me');
  return response.status(200).json(user);
}
```

访问你的开发地址拼上/api/user即可看到效果

![image-20230622032416709](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202306220324028.png)

## api

### hgetall

获取指定键的所有字段和对应值的方法

```javascript
kv.hgetall('user:me')
```

### incr

`kv.incr` 方法只能用于存储整数值，

并且在递增之前必须确保键的值为整数。

如果键不存在，则会将其初始值设置为 0。如果键的值不是整数，则会引发错误。

```javascript
kv.incr() // increment a key value
```

### set

<https://vercel.com/docs/storage/vercel-kv/kv-reference#set>

```javascript
import { kv } from '@vercel/kv';
 
async function exampleCommands() {
  try {
    await kv.set('setExample', '123abc', { ex: 100, nx: true });
  } catch (error) {
    // Handle errors
  }
}
```

### get

```
import { kv } from '@vercel/kv';
 
async function exampleCommands() {
  try {
    const getExample = await kv.get('getExample');
    console.log(getExample);
  } catch (error) {
    // Handle errors
  }
}
```

### createClient

连接新的KV stores

```javascript
import { createClient } from '@vercel/kv';
const users = createClient({
    url: process.env.USERS_REST_API_URL,
    token: process.env.USERS_REST_API_TOKEN,
});
const user = await users.hgetall('user:me');
```

## 补充

### 绑定github

vercel项目连接GitHub项目地址

由于之前vercel link之后，vercel项目里会出现个新的项目

但这个项目并没有github绑定

点击connect git respository

![image-20230622033817649](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202306220338700.png)

选择github

![image-20230622034006905](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202306220340559.png)

选择你github上对应的地址（之前新建的next项目需要放到github上）

提示成功即可

### 设置响应头

```js
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader(
    "cache-control",
    "max-age=0, no-cache, no-store, must-revalidate"
  );
  res.setHeader("content-type", "text/plain;charset=utf-8");
  const { name = "test", count = "1234567" } = req.query;
  try {
    res.send(`name: ${name} count: ${count} Date :${new Date()}`);
  } catch (error: any) {
    res.send(error.message);
  }
}
```
