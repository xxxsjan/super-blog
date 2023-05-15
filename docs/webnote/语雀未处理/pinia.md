### 使用

```js
import {createPinia} from 'pinia'
const pinia = createPinia()
app.use(pinia)

import {defineStore} from 'pinia'
export mainStore = defineStore('main',{
  state:()=>({}),
  getter:{},
  action:{}
})
```

### $reset

恢复初始值

### $subscribe

state的值改变会触发
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151246761.png)

```typescript
Test.$subscribe((args,state)=>{
  
})
```

### $onAction

第二个参数，销毁依然有效

```typescript
Test.$onAction((args)=>{
  args.after(()=>{
  
  })
},true)
```
