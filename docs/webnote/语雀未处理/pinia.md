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
![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1657040840197-5af4caf2-37d2-4d71-b73c-c2a725ba95f3.png#clientId=u1fe5b543-0966-4&from=paste&height=182&id=u338d0e74&originHeight=228&originWidth=430&originalType=binary&ratio=1&rotation=0&showTitle=false&size=72551&status=done&style=none&taskId=u95e1417f-58ee-4267-9b90-453641ee6d8&title=&width=344)

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
