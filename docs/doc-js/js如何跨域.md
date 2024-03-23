[https://www.bilibili.com/video/BV1aY4y1F7dT?spm_id_from=333.337.search-card.all.click&vd_source=11e14f37a256537712e73b4b7f52411c](https://www.bilibili.com/video/BV1aY4y1F7dT?spm_id_from=333.337.search-card.all.click&vd_source=11e14f37a256537712e73b4b7f52411c)
### cors
Access-Control-Allow-Header
Access-Control-Allow-Origin 
Access-Control-Allow-Credentials :true|false  // 是否携带cookie

### iframe postMessage
客户端使用iframe 写上服务端的url
服务端专门设置一个页面作为通讯使用
--------给谁发就拿到这个谁的window对象进行postMessage，不能自己的window进行postMessage
父
```javascript
// 监听
window.addEventListener('message', messageListener);
// 给iframe发消息
const iframe = iframeRef.value;
// 父 postMEssage --> iframe 
iframe.contentWindow.postMessage({
  msg: 'app1:hello啊，app2'
}, 'http://localhost:3002')

```
子-iframe域名下
```javascript
// 监听
window.addEventListener('message', (e) => {
  const data = e.data;
});
// 给父级发消息
topWindow = window.top || window.parent;
topWindow && topWindow.postMessage(data, '*');// 注意是*号
```
