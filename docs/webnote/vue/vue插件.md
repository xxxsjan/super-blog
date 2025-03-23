# Vue插件生态

## 图片处理相关

### 图片懒加载 - vue-lazyload

用于优化页面性能，实现图片的按需加载。适用于图片密集型应用，可有效减少初始加载时间。

### 图片识别文字 - tesseract.js

强大的OCR引擎，支持多语言文字识别。
<https://github.com/naptha/tesseract.js#tesseractjs>

### 图片生成工具

- html2canvas：将DOM元素转换为canvas图片
- dom-to-image：DOM节点转图片的另一个选择

## 虚拟列表

### vue-virtual-scroller

高性能的虚拟滚动组件，适用于大数据列表渲染。
<https://www.npmjs.com/package/vue-virtual-scroller>

### vue-virtual-scroll-list

另一个优秀的虚拟滚动实现，支持动态高度。
<https://www.npmjs.com/package/vue-virtual-scroll-list>

## 开发工具增强

### setup组件名设置 - vite-plugin-vue-setup-extend

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

使用示例：

```typescript
<script lang="ts" setup name="OrderList">
import { onMounted } from 'vue'

onMounted(() => {
  console.log('mounted===')
})
</script>
```

### 自动导入 - unplugin-auto-import

自动导入Vue API，提升开发效率。

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      imports: ['vue']
    })
  ]
})
```

使用示例：

```typescript
<script lang="ts" setup name="OrderList">
// 无需import，直接使用ref
const count = ref(0)

onMounted(() => {
  console.log('mounted===')
})
</script>
```

### 文件扩展名配置

```typescript
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  }
})
```

### 代码格式化 - import排序

@plasmohq/prettier-plugin-sort-imports
<https://github.com/wangrongding/super-extensions.git>

## UI增强

### 数据可视化

#### 流程图

- LogicFlow：<http://logic-flow.org/>
- AntV X6：专业的图编辑引擎

### 动画效果

#### DOM动画

- GSAP：专业的JavaScript动画库
<https://greensock.com/docs/v3/GSAP/gsap.to()>

示例：

```javascript
// 平滑滚动效果
gsap.to('.top-slide', {
    scrollLeft: (i - 1) * itemWidth,
    duration: 0.5,
});
```

#### 背景动画

- particles.js：粒子动画背景
<https://github.com/VincentGarreau/particles.js>
- vanta.js：3D动态背景
- css-doodle：CSS图案生成
<https://github.com/css-doodle/css-doodle>

### 数据处理

#### 数值计算

- currency.js：货币计算
- number-precision：精确数字计算

### 头像生成

#### @multiavatar/multiavatar

```javascript
import multiavatar from '@multiavatar/multiavatar/esm'
 
// 生成图片
const blob = new Blob([multiavatar(Date.now())], {
    type: 'image/svg+xml;charset=utf-8',
})
const link = URL.createObjectURL(blob)

// 直接使用SVG
<div v-html="createAvatar()" ></div>

function createAvatar() {
  const svgCode = multiavatar(Date.now())
  return svgCode  // ==> <svg></svg>
}
```

### 表格组件

#### pl-table

高性能大数据树表格组件
<https://www.npmjs.com/package/pl-table>

### 进度反馈

#### fake-progress

模拟进度条加载
<https://github.com/piercus/fake-progress>

```javascript
var p = new FakeProgress({
 timeConstant : 10000,
 autoStart : true
});
// 手动结束
p.end();
```

### 开发调试

#### browser-sync

监视文件变化并自动刷新浏览器

![browser-sync示例](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305131204783.png)
