# svg

[https://www.bilibili.com/video/BV1Y54y1C7M9](https://www.bilibili.com/video/BV1Y54y1C7M9?p=2&spm_id_from=pageDriver&vd_source=11e14f37a256537712e73b4b7f52411c)

### 基本结构

svg宽高默认300*150

viewBox是取那一部分进行显示，会放大或缩小成svg的大小进行显示

```html
<svg width="300" height="150" viewBox="50 50 50 50">
  <defs>
    <style type="text/css"></style>
  </defs>  
  <circle id="my-circle"></circle>
  <path></path>
</svg>
```

### 圆

```html
<circle  id="my-circle" cx="50" cy="50" r="100"></circle>
```

### 线line

开始坐标(x1,y1)

结束坐标(x2,y2)

```html
<line x1="0" y1="10"  x2="0" y2="100" style="stroke:#333;stroke-width:5px"></line>

// 或者
<style type="text/css">
  .line{stroke:#333;stroke-width:5px}
</style>
<line x1="0" y1="10"  x2="0" y2="100"  class="line"></line>
```

### 折线

points指定折线三个坐标位置

fill的话会填充，变成三角形块

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305131136893.png)

```html
<svg width="350" height="180">
  <polyline points="3,3 30,28 3,53" fill="none" stroke="black"></polyline>
</svg>
```



![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305131136496.png)



### path

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305131136707.png)

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305131136987.png)

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305131136592.png)



### 复用标签

通过use href + id

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305131136207.png)



### 基座

多个图形可为一个整体

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305131136066.png)





### 属性

线端

stroke-linecap="round"

虚线

stroke-dasharray="0,10000" // 第一个是实线长度，第二个是虚线长度\





### vue使用svg

需要一个loader

npm i -D svg-sprite-loader

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305131136930.png)

加载svg文件

```plain
const req = require.context("../icons", false, /\.svg$/);
req("./user.svg") // 加载单个
const requireAll = (context) => context.keys().map(context);
requireAll(req); // 加载全部

// 解释
context.keys().map(key=>{
	context(key)
});
```



配置loader

vue.config.js

```typescript
config.module
  .rule("icons")
  .test(/\.svg$/)
  .include.add(path.join(__dirname, "src/assets/icons"))
  .end()
  .use("svg-sprite-loader")
  .loader("svg-sprite-loader")
  .options({
    symbolId: "icon-[name]",
  })
  .end();

// output
{
  test: /\.svg$/,
    include: ['D:\\src\\assets\\icons'],
    use: [
    {
      loader: 'svg-sprite-loader',
      options: {
        symbolId: 'icon-[name]'
      }
    }
  ]
},
```

vue组件

```typescript
<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String
    },
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    svgClass () {
      if (this.className) {
        return 'svg-icon ' + this.className;
      } else {
        return 'svg-icon';
      }
    }
  }
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
```