文档
[https://www.tailwindcss.cn/docs/installation](https://www.tailwindcss.cn/docs/installation)
### html使用
```typescript
<script src="https://cdn.tailwindcss.com"></script>
```
加上即可体验
### npm使用
tailwindcss依赖于postcss8
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
8以下装这些
npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
需要postcss
#### 方法一：
main.js
```typescript
import './index.css'
```
index.css
```typescript
@tailwind base;
@tailwind components;
@tailwind utilities;
```
#### 方法二：
main.js直接引入
```typescript
import "tailwindcss/tailwind.css" // 其实就是@tailwind base components utilities
```

### vue2使用
[https://blog.csdn.net/qq_40230735/article/details/123684730](https://blog.csdn.net/qq_40230735/article/details/123684730)
npm uninstall tailwindcss postcss autoprefixer
npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
npx tailwindcss init --postcss               
--postcss帮你生成postcss.config.js
下面这些配置貌似都不需要
写postcss.config.js配置就行，是js不是cjs，cjs会没效果
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

```
配置vue.config.js  （教程中办法）
```javascript
// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [require('tailwindcss'), require('autoprefixer')]
      }
    }
  }
}
```

#### 使用vue inspectt分析原因
貌似查不出原因
配置vueconfig的话 webpack长这样，有两个function
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151252527.png)
而且用postcss.config.js设置plugin，vue inspect 会看到清空了plugin
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151252827.png)
用postcss.config.cjs设置plugin，vue inspect 会看到 plugin 会保留有一个默认的function
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151252923.png)

### tailwind命令



#### 初始化

tailwindcss init -p

会生成postcss.config.js tailwind.config.js



#### 检出css查看
npx tailwindcss --postcss -o tailwind.css
config里要配置content
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: [],
  content: ['./src/**/*.{html,js,ts,vue}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

可以输出 css 进行检查 类似 vue inspect

可以在输出的css里面有没使用的css类名生成

这是postcss8 的命令， postcss7版本的vue2用不了




## 样式冲突
[https://juejin.cn/post/7084614555598323719](https://juejin.cn/post/7084614555598323719)
方案1 删除 @tailwindcss base 样式
```typescript
// @tailwind base;
@tailwind components;
@tailwind utilities; 
```
方案2 全量引入 element ui
```typescript
import { createApp } from 'vue'
import './css/app.css' // <- 引入 tailwindcss
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' // -> 引入 element-plus
```
方案3 关闭默认样式 手动处理冲突样式
```typescript
// tailwind.config.js
module.exports = {
  corePlugins: {
    preflight: false,
  }
}
```
然后创建 preflight.css文件，去下面的 unpkg 复制基础样式到 preflight.css中，然后删掉 188 行关于 button 冲突的样式。
[https://unpkg.com/browse/tailwindcss@3.0.23/src/css/preflight.css](https://unpkg.com/browse/tailwindcss@3.0.23/src/css/preflight.css)
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151253783.png)
