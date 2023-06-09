# vue插件

### 图片懒加载

vue-lazyload

### 虚拟滚动

vue-virtual-scroller

<https://www.npmjs.com/package/vue-virtual-scroller>

vue-virtual-scroll-list

<https://www.npmjs.com/package/vue-virtual-scroll-list>

## vue3插件

### setup设置组件name

vite-plugin-vue-setup-extend

npm i vite-plugin-vue-setup-extend -D

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

export default defineConfig({
  plugins: [
    VueSetupExtend()
  ]
})
```

使用

```typescript
<script lang="ts" setup name="OrderList">
import { onMounted } from 'vue'

onMounted(() => {
  console.log('mounted===')
})
</script>
```

### 自动引入

unplugin-auto-import

npm i unplugin-auto-import -D

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    AutoImport({
       // 可以自定义文件生成的位置，默认是根目录下，使用ts的建议放src目录下
      dts: 'src/auto-imports.d.ts',
      imports: ['vue']
    })
  ]
})
```

使用

```typescript
<script lang="ts" setup name="OrderList">
// 不用import，直接使用ref
const count = ref(0)

onMounted(() => {
  console.log('mounted===')
})
</script>
```

自动引用，生成auto-imports.d.ts

```typescript
// auto-imports.d.ts
// Generated by 'unplugin-auto-import'
// We suggest you to commit this file into source control
declare global {
  const computed: typeof import('vue')['computed']
  const createApp: typeof import('vue')['createApp']
  const customRef: typeof import('vue')['customRef']
  const defineAsyncComponent: typeof import('vue')['defineAsyncComponent']
  const defineComponent: typeof import('vue')['defineComponent']
  const effectScope: typeof import('vue')['effectScope']
  const EffectScope: typeof import('vue')['EffectScope']
  const getCurrentInstance: typeof import('vue')['getCurrentInstance']
  const getCurrentScope: typeof import('vue')['getCurrentScope']
  const h: typeof import('vue')['h']
  const inject: typeof import('vue')['inject']
  const isReadonly: typeof import('vue')['isReadonly']
  const isRef: t  ypeof import('vue')['isRef']
  // ...
}
export {}
```

也可以解决eslint问题

```typescript
// vite.config.ts
AutoImport({
    dts: 'types/auto-imports.d.ts',
    imports: ['vue'],
    // 解决eslint报错问题
    eslintrc: {
      enabled: true
    }
})
```

他会生成eslintrc-auto-import.json，eslintrc中引入即可

```typescript
// eslintrc.js
module.exports = {
  extends: [
    './.eslintrc-auto-import.json'
  ]
}
```

### 忽略.vue后缀

```typescript
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  }
})
```

### 货币计算 数字计算

currency.js

number-precision

### 随机头像 multiavatar

@multiavatar/multiavatar

```javascript
import multiavatar from '@multiavatar/multiavatar/esm'
 
// img使用需要过blob
const blob = new Blob([multiavatar(Date.now())], {
    type: 'image/svg+xml;charset=utf-8',
})
const link = URL.createObjectURL(blob)

// v-html使用
<div v-html="createAvatar()" ></div>

function createAvatar() {
  const svgCode = multiavatar(Date.now())
  return svgCode  // ==> <svg></svg>
}
```

### 图片识别文字 tesseract.js

<https://github.com/naptha/tesseract.js#tesseractjs>

### pl-table -pl-table大数据树表格

<https://www.npmjs.com/package/pl-table>

### 网站背景动画

vanta.js

### dom动画

可选juery和gsap

<https://greensock.com/docs/v3/GSAP/gsap.to()>

有时候transition对于某些属性不会有过度效果，比如scrollLeft这种，需要js实现

```javascript
$('.top-slide').animate({ scrollLeft: (i - 1) * itemWidth }, 500);
gsap.to('.top-slide', {
    scrollLeft: (i - 1) * itemWidth,
    duration: 0.5,
});
```

## 流程图

<http://logic-flow.org/>

antv-x6

### browser-sync

监视打包文件

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305131204783.png)

### particles.js

<https://github.com/VincentGarreau/particles.js>

做背景动效

### css doodle

A web component for drawing patterns with CSS

<https://github.com/css-doodle/css-doodle>

## postcss相关

### css自动补全

autoprefixer和postcss-preset-env都可以做

二选一即可

```javascript
module.exports = {
  plugins:[
    require("postcss-preset-env")
  ]
}
```

### 爬虫

puppeteer

## **import顺序格式化插件**

 <https://github.com/wangrongding/super-extensions.git>

@plasmohq/prettier-plugin-sort-imports

## 生成图片

html2canvas

dom-to-image

### 假的进度条

fake-progress

<https://github.com/piercus/fake-progress>

```javascript
var p = new FakeProgress({
 timeConstant : 10000,
 autoStart : true
});
// 手动结束
p.end();
```
