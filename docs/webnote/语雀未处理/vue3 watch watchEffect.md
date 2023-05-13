### watch
```json
import { watch } from 'vue'
// watch(target,callback,config)
watch([data1,data2],callback,{deep:true})
watch(()=>data1,callback,{deep:true})
```
### watchEffect
![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1656847121004-d47b0cba-b681-4f20-9aff-da397e4b19c2.png#averageHue=%23f6f9f7&clientId=u5eb8b8f3-f172-4&from=paste&height=96&id=u3c47b9fe&originHeight=120&originWidth=917&originalType=binary&ratio=1&rotation=0&showTitle=false&size=44042&status=done&style=none&taskId=ud6ce310f-9b8d-4b29-873b-9ced5f19440&title=&width=733.6)
```typescript
import { watchEffect } from 'vue'
// 立即调用 会解析回调里面的属性进行watch
watchEffect((oninvalidate)=>{
  
  console.log(message)
  console.log(message2)
  // 先执行这个
  oninvalidate(()=>{
    console.log('before')
  })
},{
  flush:'post' ,// pre sync post
  onTrigger:(e)=>{
    // 调试
    debugger
  }
})
// 本生返回一个停止函数
const stop = watchEffect(()=>{})
```
### react  useEffect

```typescript
import {useEffect} from 'react'
useEffect(callback,[data]) // watch data
useEffect(callback,[]) // 只执行一次
useEffect(callback) // 都执行
```
