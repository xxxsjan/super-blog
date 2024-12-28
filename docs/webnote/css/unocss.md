# unocss

<https://github.com/unocss/unocss>

[https://juejin.cn/post/7028841960752283656](https://juejin.cn/post/7028841960752283656#heading-2)

### vite使用

pnpm i -D unocss @unocss/preset-uno @unocss/preset-attributify @unocss/preset-icons

### 配置预设

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305131203268.png)

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

<https://icones.js.org/>

根据官网物料icon找到对应分类，安装对应分类的icon

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305131203915.png)

pnpm i -D @iconify-json/ic

使用

<div class="i-ic-baseline-add-circle text-3xl bg-green-500" />

图标的使用语法是

i+${图标集缩写名}+${图标名}，

这里的图标集是ic，图标名是baseline-add-circle

i-fxemoji-circledideographaccept
