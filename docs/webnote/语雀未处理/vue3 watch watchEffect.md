### watch
```json
import { watch } from 'vue'
// watch(target,callback,config)
watch([data1,data2],callback,{deep:true})
watch(()=>data1,callback,{deep:true})
```
### watchEffect
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151259607.png)
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
