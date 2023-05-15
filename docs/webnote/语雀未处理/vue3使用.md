### props
```typescript
// ts
type Props = {
  title:string,
  list:number[]
}
// 类型约束
defineProps<Props>()
// 默认值
const props = withDefaults(defineProps<Props>(),{
  title:'标题',
  list:()=>[1,2,3,4]
})

// js
const props = defineProps({
  title:{
    type:String,default:'标题'
  },
  list:{
    type:Array,
    default:()=>[1,2,3,4]
  }
})
```
### defineAsyncComponent
```typescript
import { defineAsyncComponent } from 'vue'

const A = defineAsyncComponent(()=>import('./xxx.vue'))
```
### Suspense
```vue
<template>
<Suspense>
  <template #default>
    <A/>
</template>
<template #callback>
Loading...
</template>
</Suspense>
</template>
```
### transition
#### animate.css动画库
可以结合animate.css动画库使用
leave-active-class
enter-active-class
注意
版本4 需要加上 animate__animated这个类，版本3不需要 
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151259698.png)

#### 声明周期---@事件
可以结合[gsap](https://greensock.com) 使用
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151259563.png)
```typescript
@before-enter  // 形参：el;
@enter // 形参：el:Element ，done:Function;
@after-enter // 形参：el;
@enter-canceled // 形参：el;


```
#### appear
一进来页面就触发的动画
也可以结合animate.css使用
```vue
<transtion 
           appear
           appear-from-class="from"
           appear-active-class="active"
           appear-to-class="to"
           >
  
</transtion>

<style>
  .form{
    opacity:0
  }
  .active{
    transtion:all 1s ease
  }
  .to{
    opacity:1
  }
</style>
```
#### transtion-group
```vue
// div 都有动画
<transtion-group tag="div">
  <div v-for="item in 10" :key="item">{{item}}</div>
  </transtion-group>
```
#### 状态过渡

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151259781.png)![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151259694.png)
借助gsap.to可以实现状态的过渡，数字可以有递增效果

## 组件通信
#### mitt
vue3 上没了$on $off $once，所以eventBus没了
mitt这个库就是eventBus替代方案
```typescript
import Mit from 'mitt'
declare module "vue" {
  export interface ComponentcustomProperties{
    $Bus:typeof Mit
  }
}
app.config.globalProperties.$Bus = Mit

// 使用
const instance = getCurrentInstance()
instance?.proxy?.$Bus.on('event',callback)
instance?.proxy?.$Bus.emit('event',data)
```
### 挂载属性的声明
```typescript
// 1
declare module "vue" {
  export interface ComponentcustomProperties{
    $Bus:typeof Mit
  }
}
// 2
declare module "@vue/runtime-core" {
  export interface ComponentcustomProperties{
    $Bus:typeof Mit
  }
}
```
### 使用tailwindcss 
vue3已集成
[https://xiaoman.blog.csdn.net/article/details/124951311](https://xiaoman.blog.csdn.net/article/details/124951311)

## $attrs
在 Vue 2 中除了 $attrs 外，还有 $listeners ； Vue 3 把 $listeners 合并到 $attrs 里了。

## vue3坑点 注意点
reactive重新赋值会丢失响应式
无解
曲线救国，外面包一层对象
```typescript
// 比如，原本是
const list = reactive([])
// 改成
const state = reactive({
 list:[]
})
// 改state.list就行
// 使用同一个state做管理，最后return一个toRefs就行
return { ...toRefs(state)}
```
用ref，这样改.value即可，也可以曲线救国

style v-bind 变量
[https://cn.vuejs.org/api/sfc-css-features.html#v-bind-in-css](https://cn.vuejs.org/api/sfc-css-features.html#v-bind-in-css)

```
<div
    v-if="progress == 100"
    :style="{ '--zIdx': zIdx, }"
>

z-index: v-bind(zIdx); // vue声明变量即可，假如在scoped，变量会变成--[hash]--zIdx
z-index: var(--zIdx);// 内联声明var变量
```

