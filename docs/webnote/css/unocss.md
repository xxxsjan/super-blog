# unocss



https://github.com/unocss/unocss

[https://juejin.cn/post/7028841960752283656](https://juejin.cn/post/7028841960752283656#heading-2)

### vite使用

pnpm i -D unocss @unocss/preset-uno @unocss/preset-attributify @unocss/preset-icons



### 配置预设



![img](https://cdn.nlark.com/yuque/0/2022/png/28823371/1671535516875-8ee85c88-d085-472b-afdd-11a3c7be2603.png)

以@unocss/preset-uno预设为例

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Unocss from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      presets: [
          presetUno(), 
          presetAttributify(), 
          presetIcons()],
    }),
  ],
})
```



```javascript
import { createApp } from 'vue'
import App from './App.vue'

import 'uno.css'

createApp(App).mount('#app')
```

### 图标

https://icones.js.org/

根据官网物料icon找到对应分类，安装对应分类的icon

![img](https://cdn.nlark.com/yuque/0/2022/png/28823371/1671535375277-82309cd3-4ffe-4824-a064-60a2e15dd449.png)

pnpm i -D @iconify-json/ic

使用

<div class="i-ic-baseline-add-circle text-3xl bg-green-500" /> 



图标的使用语法是

i+${图标集缩写名}+${图标名}，

这里的图标集是ic，图标名是baseline-add-circle

i-fxemoji-circledideographaccept





 