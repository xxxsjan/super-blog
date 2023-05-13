[https://developer.mozilla.org/zh-CN/docs/Web/API/BroadcastChannel](https://developer.mozilla.org/zh-CN/docs/Web/API/BroadcastChannel)

```typescript
const channel = new BroadcastChannel('名字1')
channel.postMessage({
  msg:'666'
})

// 其他标签页
const  channel = new BroadcastChannel('名字1')
channel.addEventListener('message',(e)=>{
  console.log(e.data)
})
```
