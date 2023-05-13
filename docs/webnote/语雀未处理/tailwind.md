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
![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1669002224159-3ba73539-789a-4853-9156-e5db4402e184.png#averageHue=%231e1e1e&clientId=u5ccd1f06-31d2-4&from=paste&height=113&id=u460bbafe&originHeight=141&originWidth=432&originalType=binary&ratio=1&rotation=0&showTitle=false&size=8571&status=done&style=none&taskId=uce887c96-4fc6-4974-876b-55d65590576&title=&width=345.6)
而且用postcss.config.js设置plugin，vue inspect 会看到清空了plugin
![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1669002193760-1d2577cf-1ab5-4b5f-baae-8fb5a90dbdf2.png#averageHue=%231e1e1e&clientId=u5ccd1f06-31d2-4&from=paste&height=49&id=u9cd53a88&originHeight=61&originWidth=207&originalType=binary&ratio=1&rotation=0&showTitle=false&size=2285&status=done&style=none&taskId=u60ba732d-e1d2-4a14-9db2-e7ce0851b71&title=&width=165.6)
用postcss.config.cjs设置plugin，vue inspect 会看到 plugin 会保留有一个默认的function
![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1669002136744-8fcb573f-34a2-4bd0-8974-22b7788bc7ec.png#averageHue=%231e1e1e&clientId=u5ccd1f06-31d2-4&from=paste&height=105&id=uf5947241&originHeight=131&originWidth=473&originalType=binary&ratio=1&rotation=0&showTitle=false&size=6571&status=done&style=none&taskId=u70c59c3e-bbde-4792-9c8f-57ccc357189&title=&width=378.4)


### tailwind命令
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
![image.png](https://cdn.nlark.com/yuque/0/2023/png/28823371/1682433263955-7430f597-6c5e-4b16-bb63-5e204127c4ad.png#averageHue=%232b2f38&clientId=u4086d63e-672a-4&from=paste&height=443&id=ubf8416fa&originHeight=554&originWidth=973&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=168750&status=done&style=none&taskId=u16e02716-3108-4eb0-bcd2-469306169c9&title=&width=778.4)
