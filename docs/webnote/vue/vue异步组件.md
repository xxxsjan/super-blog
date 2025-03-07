# vue异步组件

<https://juejin.cn/post/7108593780638351397>

## defineAsyncComponent

### import实现

```vue
<script setup>
import {onMounted, defineAsyncComponent } from 'vue'
const AsyncChild = defineAsyncComponent(() => import('./child.vue'))
onMounted(() => {
    console.log('app')
})
</script>
<template>
    <AsyncChild />
</template>

```

### Promise模拟实现

```vue
<script setup>
import {onMounted, defineAsyncComponent } from 'vue'
import Child from './child.vue'
const AsyncChild = defineAsyncComponent(() => (new Promise((resolve, reject) => resolve(Child))))
onMounted(() => {
    console.log('app')
})
</script>
<template>
    <AsyncChild />
</template>

```

## defineAsyncComponent 配置

```
const AsyncComp = defineAsyncComponent({
  // 加载函数，需要返回一个Promise，可以使用动态import的方式，也可以自己new Promise()
  loader: () => import('./Foo.vue'),

  // 加载异步组件时使用的组件，该组件会在异步组件加载时显示，如果异步组件加载很快，可能不会出现loading组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,

  // 加载失败后展示的组件，可以通过Promise的reject来测试
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000
})

```

例子

```
// app.vue
<script setup>
import {ref, onMounted, defineAsyncComponent } from 'vue'
import LoadingComp from './LoadingComp.vue'
import ErrorComp from './ErrorComp.vue'
const AsyncChild = defineAsyncComponent({
    loader: () => (new Promise((resolve, reject) => reject())),
    loadingComponent: LoadingComp,
    delay: 200,
    errorComponent: ErrorComp,
    timeout: 2000
})
onMounted(() => {
    console.log('app')
})
let isShowAsyncComp = ref(false)
const loader = () => {
  isShowAsyncComp.value = true
}
</script>
<template>
    <button @click="loader">加载异步组件</button>
    <AsyncChild v-if="isShowAsyncComp" />
</template>

```

### 配合Suspense使用

```
// app.vue
 <Suspense v-if="isShowAsyncComp">
    <template #default>
      <AsyncComp />
    </template>
    <template #fallback>
      <p>Suspense 加载中...</p>
    </template>
 </Suspense>

```

## Vue.asyncComponent()

```
const MyComponent = Vue.component('my-component', () => import('./MyComponent.vue'));

const MyComponent = Vue.asyncComponent(() => import('./MyComponent.vue'));
```

## Vue.extend()

```
const MyComponent = Vue.extend({
  template: '<div>异步组件</div>',
  // 异步加载组件代码和资源
  components: {
    'async-component': () => import('./AsyncComponent.vue')
  }
});
```
