
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

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151246938.png)

### 创建子项目apis utils

pnpm create vite
选择vanilla vanilla-ts
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151248677.png)
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151247207.png)

项目名根更改

#### 调整 apis、utils 的项目名称和版本号

| **项目** | **name字段更新** | **version字段更新** |
| --- | --- | --- |
| apis | apis -> @it200/apis | 0.0.0 -> 0.0.1 |
| utils | utils -> @it200/utils | 0.0.0 -> 0.0.1 |

![](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151248095.png)

packages下创建三个项目
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151247355.png)
module1使用utils项目的对象

```typescript
pnpm -F @it200/module1 add @it200/utils
```

他会加上这句，帮我们安装上依赖，指向了utils项目
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151252363.png)

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

![](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151249221.png)

### 创建components项目



![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151247886.png)

更改包名和声明入口

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151247600.png)



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

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151250833.png)
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

![](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151251650.png)
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
