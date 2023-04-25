# vite插件

## vite-plugin-inspect

```javascript
import Inspect from 'vite-plugin-inspect'

export default {
  plugins: [
    Inspect({
      build: true,
      outputDir: '.vite-inspect'
    })
  ]
}
```

## vite-plugin-vue-setup-extend

```javascript
// vite.config.ts
import { defineConfig } from 'vite'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

export default defineConfig({
  plugins: [
    VueSetupExtend()
  ]
})
```

