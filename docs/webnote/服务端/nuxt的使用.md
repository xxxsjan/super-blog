
[https://juejin.cn/post/7037336504418435103](https://juejin.cn/post/7037336504418435103)
中文翻译
[https://57code.gitee.io/nuxt3-docs-zh/getting-started/installation.html](https://57code.gitee.io/nuxt3-docs-zh/getting-started/installation.html)

## 安装

首先安装nuxt3

node版本需要大于 v14.16.0

## 目录

nuxt会自动识别文件 不需要引入 但对目录及名称有对应的要求

pages下的index.vue就是默认根路由

## 布局

如果需要布局，layouts/default.vue就是约定好的默认布局使用的文件

多种布局可以再default.vue同级新建

页面中使用相应的布局有两种方法

```
<script>
export default {
  layout: "custom", // 默认是default
}
</script>
```

第二种，不在js里写，而是在html里配置

```vue
<template>
<NuxtLayout name="custom">
  <template #header>
    <h1>hello page</h1>
</template>
some content...
</NuxtLayout>
// 甚至能组合多个布局页
<NuxtLayout name="default">
  some content...
</NuxtLayout>
</template>
<script>
  export default {
    layout: false,
};
```



## 入口文件

默认是app.vue作为入口文件

app.vue

```
<template>
  <div>
   <h1>Welcome to the homepage</h1>
  </div>
</template>
```

如果需要使用pages作为入口，引入`<NuxtPage />`组件爱你

```
<template>
  <NuxtPage />
</template>
```

