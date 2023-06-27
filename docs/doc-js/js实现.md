# js实现



## 对象克隆

```javascript
function deepClone(obj){
    return new Promise((resolve)=>{
        const {port1,port2} = new MessageChannel()
        port.postMessage(obj)
        port2.onmessage = function(msg){
            resolve(msg.data)
        }
 	})
}
```

