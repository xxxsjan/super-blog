# Excel 大数据导出

参考：<https://www.bilibili.com/video/BV1AU4y1i76g>

主要原因是 JS 进程和 GUI 渲染引擎互斥，只能进行一个，所以可以用 Web Worker 解决。
大致就是 `postMessage` 发送数据，`onmessage` 接收数据后处理。

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
