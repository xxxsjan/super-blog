[https://github.com/antfu/vite-plugin-md/tree/main/example](https://github.com/antfu/vite-plugin-md/tree/main/example)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1657423009295-6d18f446-97b6-4b19-b043-4b15dfa7f291.png#clientId=uc1dc4a4a-c5aa-4&from=paste&height=503&id=u348c3411&originHeight=629&originWidth=869&originalType=binary&ratio=1&rotation=0&showTitle=false&size=51632&status=done&style=none&taskId=udec1e823-3a51-4b03-a74e-84049b2e5f6&title=&width=695.2)
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
