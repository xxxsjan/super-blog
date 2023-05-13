[https://www.bilibili.com/video/BV1AU4y1i76g](https://www.bilibili.com/video/BV1AU4y1i76g?mid=19978410&p=1&share_from=ugc&share_medium=android&share_plat=android&share_session_id=1a75a7bb-7984-4ee9-8d2b-69c89492d08a&share_source=WEIXIN&share_tag=s_i&timestamp=1658717182&unique_k=lf3teJy)

主要原因是js进程和gui渲染引擎是互斥的，只能进行一个
所以可以利用webworker解决
大致就是postMessage发送数据，onmessage接收数据，然后处理

public目录下新建worker.js
```javascript
//importScripts();                        /* 什么都不引入 */
//importScripts('foo.js');                /* 只引入 "foo.js" */
//importScripts('foo.js', 'bar.js');      /* 引入两个脚本 */

function handleData(num) {
  // 复杂的处理
  return str;
}

// self.onmessage 多个会覆盖，写多个没用
self.onmessage = async (e) => {
  const res = await handleData(e.data);
  self.postMessage({
    msg: "处理完了",
    data: res,
  }); 
};
```
### 使用Worker
```css
const worker = new Worker("/worker.js"); // "worker.js"貌似也行

worker.postMessage(2000000); // 使用 postMessage 传输信息到目标文件

// 使用 onmessage 接受信息
worker.onmessage = (e) => {
  // 报错时马上终止指定worker进程
  worker.terminate();
  console.log("实例接收", e.data);
};

// 使用 onerror 进行目标文件，也就是指定worker线程发生错误时的回调
worker.onerror = function (e) {
  console.log("error at " + e.filename + ":" + e.lineno + e.message);
};
```
### 终止worker
外面：myWorker.terminate();
里面：self.close();
