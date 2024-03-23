[https://github.com/antfu/vite-plugin-md/tree/main/example](https://github.com/antfu/vite-plugin-md/tree/main/example)
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151259710.png)
virtual:generated-pages
virtual:generated-layouts
```javascript
import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import './styles/main.css'
import 'uno.css'

App.name = 'Example App'

const routes = setupLayouts(generatedRoutes)

const app = createApp(App)
const head = createHead()
const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(head)
app.use(router)
app.mount('#app')
```
