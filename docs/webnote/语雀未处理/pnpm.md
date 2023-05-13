
一个package.json文件所对应就是一个包

```typescript
packages:
  # packages的所有文件夹
  - 'packages/*'
  # components的所有文件
  - 'components/**'
  # 获取数据相关的包在 apis 目录下
  - 'apis/**'
  # 通用工具相关的包在 utils 目录下
  - 'utils/**'
```

![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1659698279811-6130a109-0ea8-4b5f-ba11-42f2c0511b66.png#clientId=u7b6a85fc-18ce-4&from=paste&height=781&id=ucf76251d&originHeight=976&originWidth=335&originalType=binary&ratio=1&rotation=0&showTitle=false&size=39385&status=done&style=none&taskId=ue83bff7b-e451-4c11-89af-0833ea78e7e&title=&width=268)

### 创建子项目apis utils

pnpm create vite
选择vanilla vanilla-ts
![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1659686907999-6c878ec8-35d4-44a1-ba72-d64c0705763c.png#clientId=u7b6a85fc-18ce-4&from=paste&height=293&id=ua430c244&originHeight=366&originWidth=940&originalType=binary&ratio=1&rotation=0&showTitle=false&size=98236&status=done&style=none&taskId=u36f0f986-3511-402d-8df6-f9429f25887&title=&width=752)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1659686960580-ac4fa1bc-f78c-4984-b262-530074d96bc3.png#clientId=u7b6a85fc-18ce-4&from=paste&height=608&id=u0efe1cfa&originHeight=760&originWidth=361&originalType=binary&ratio=1&rotation=0&showTitle=false&size=31260&status=done&style=none&taskId=ua2a48a07-56e6-4c06-9368-44246c26743&title=&width=288.8)

项目名根更改

#### 调整 apis、utils 的项目名称和版本号

| **项目** | **name字段更新** | **version字段更新** |
| --- | --- | --- |
| apis | apis -> @it200/apis | 0.0.0 -> 0.0.1 |
| utils | utils -> @it200/utils | 0.0.0 -> 0.0.1 |

![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1659687044053-a179b052-4690-4b83-8c45-593ae2327bc2.png#clientId=u7b6a85fc-18ce-4&from=paste&height=469&id=ue0acd725&originHeight=586&originWidth=797&originalType=binary&ratio=1&rotation=0&showTitle=false&size=54933&status=done&style=none&taskId=u1924567a-1eb6-4f22-8170-b7eb3dc9839&title=&width=637.6)

packages下创建三个项目
![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1659687220550-a8dfb566-df4f-40ad-9e6d-ab7cf6848bd6.png#clientId=u7b6a85fc-18ce-4&from=paste&height=754&id=u6676ca7a&originHeight=942&originWidth=1454&originalType=binary&ratio=1&rotation=0&showTitle=false&size=99998&status=done&style=none&taskId=ua142703a-f476-40e6-943a-e288dbf6047&title=&width=1163.2)
module1使用utils项目的对象

```typescript
pnpm -F @it200/module1 add @it200/utils
```

他会加上这句，帮我们安装上依赖，指向了utils项目
![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1659687761201-2808bcaa-9834-4d55-8e7f-8bf18612a423.png#clientId=u7b6a85fc-18ce-4&from=paste&height=459&id=ufe4e4770&originHeight=574&originWidth=936&originalType=binary&ratio=1&rotation=0&showTitle=false&size=64555&status=done&style=none&taskId=u519c66a3-19eb-4f53-8e32-e37368eedd5&title=&width=748.8)

module1项目测试使用utils

```typescript
<script setup lang="ts">
import { handleClipboard } from "@it200/utils";
const copy = (e) => {
  console.log("[ e ] >", e);
  handleClipboard("haha", e);
}; 
</script>

<template>
  <button @click="copy">复制</button>
</template>
```

成功调用
![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1659687900250-a76b493e-cbb1-4a5e-adfb-753a3ca0394a.png#clientId=u7b6a85fc-18ce-4&from=paste&height=483&id=uae36ea0e&originHeight=604&originWidth=1222&originalType=binary&ratio=1&rotation=0&showTitle=false&size=21270&status=done&style=none&taskId=u6d03218a-a84f-47bf-b7e9-e93f270ecac&title=&width=977.6)

### 创建components项目

![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1659688177522-9793b960-1cea-4c5f-a59e-2de2e4ef4279.png#clientId=u7b6a85fc-18ce-4&from=paste&height=297&id=udbebe3ce&originHeight=371&originWidth=1012&originalType=binary&ratio=1&rotation=0&showTitle=false&size=101154&status=done&style=none&taskId=u157903cc-1cef-4371-bafb-8c84cc0f0ac&title=&width=809.6)
更改包名和声明入口
![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1659688440433-8fdcd997-ee72-43a4-b0c7-f1d763e799a9.png#clientId=u7b6a85fc-18ce-4&from=paste&height=480&id=ub9a469d8&originHeight=600&originWidth=897&originalType=binary&ratio=1&rotation=0&showTitle=false&size=91348&status=done&style=none&taskId=uef01a287-d4db-4024-9c30-17ddfafae61&title=&width=717.6)
入口文件负责导出组件，src下的App vue应用可做测试使用

```typescript
import Card from "./src/components/card/index";
export default {
  Card,
};
```

module2中使用components的card组件

```typescript
pnpm -F @it200/module2 add @it200/components
```

![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1659688697073-67ebc848-5263-4431-a59b-6b63b6c6740a.png#clientId=u7b6a85fc-18ce-4&from=paste&height=517&id=u4a65df4d&originHeight=646&originWidth=962&originalType=binary&ratio=1&rotation=0&showTitle=false&size=77967&status=done&style=none&taskId=u304a4b42-7565-46d4-9fe7-2f9522db009&title=&width=769.6)
使用组件

```typescript
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Comps from "@it200/components";

import "@it200/components/src/components/card/src/card.scss";
const app = createApp(App);
app.use(Comps.Card);

app.mount("#app");
```

```typescript
<template>
  <it-card style="width: 235px" :body-style="{ padding: '0px' }">
    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      class="image" />
    <div style="padding: 14px">
      <span>好吃的汉堡</span>
      <div class="bottom">
        <time class="time">"2022-05-03T16:21:26.010Z"</time>
      </div>
    </div>
  </it-card>
</template>
```

![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1659688897545-f9005028-a58a-403d-bbd6-76dc11de1efa.png#clientId=u7b6a85fc-18ce-4&from=paste&height=557&id=ud2642fa1&originHeight=696&originWidth=1677&originalType=binary&ratio=1&rotation=0&showTitle=false&size=207088&status=done&style=none&taskId=ua42652bf-2543-4f2e-af33-dd84cd600d2&title=&width=1341.6)
使用成功😍

### 总结

#### 关键命令

```typescript
pnpm -F @it200/module2 add @it200/components
```

### 其他命令

[https://blog.csdn.net/weixin_43963309/article/details/123822563](https://blog.csdn.net/weixin_43963309/article/details/123822563)

```json
安装依赖

pnpm add <package_name> --filter <workspace_name> // 安装某个特定属性
pnpm i // 全局安装
pnpm i <package_name> --filter <workspace_name> // 安装某个特定属性


运行脚本

pnpm run serve --filter=<workspace_name>



删除全局和每个workspace的node_modules   需要rm  rimraf相关包

pnpm -r exec rm -rf node_modules
pnpm rimraf  **/node_modules  

```

### pnpm-workspace.yaml

** 表示该目录下的东西就是一个项目

- 表示该目录下的文件夹是项目

```json
packages:
  - "server/**"
```
