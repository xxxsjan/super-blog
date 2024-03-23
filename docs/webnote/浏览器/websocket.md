## express-ws
```javascript
const express = require("express");
const expressWs = require("express-ws");

const websocket = require("../routes/websocket");

const app = express();
expressWs(app);

app.use(express.static("public"));

app.use("/websocket", websocket);

app.ws("/socketTest", function (ws, req) {
  ws.send("你连接成功了");
  ws.on("message", function (msg) {
    console.log(msg);
  });
});

app.get("*", (req, res) => {});

app.listen(8080, () => {
  console.log("server is listening on port 8080");
});

```
```javascript
const ws = new WebSocket('ws://127.0.0.1:3000/websocket/test')
ws.onopen = e => {
  console.log(`WebSocket 连接状态： ${ws.readyState}`)
}

ws.onmessage = data => {
  receiveBox.innerHTML += `<p>${data.data}</p>`
  receiveBox.scrollTo({
    top: receiveBox.scrollHeight,
    behavior: "smooth"
  })
}

ws.onclose = data => {
  console.log('WebSocket连接已关闭')
  console.log(data);
}

sendBtn.onclick = () => {
  ws.send(msgBox.value)
}
exit.onclick = () => {
  ws.close()
}

```

### koa-websocket
服务端
```javascript
let Koa = require("koa2");
let WebSocket = require("koa-websocket");

/* 实例化 WebSocket, 实例化储存所有上线文数组 并分配监听的端口 */
let app = WebSocket(new Koa());
let ctxs = [];
app.listen(80, () => {
  console.log("已启动：http://127.0.0.1");
});

/* 实现简单的接发消息 */
app.ws.use((ctx, next) => {
  /* 每打开一个连接就往 上线文数组中 添加一个上下文 */
  ctxs.push(ctx);
  ctx.websocket.on("message", (message) => {
    // for (let i = 0; i < ctxs.length; i++) {
    //   if (ctx == ctxs[i]) continue;
    //   ctxs[i].websocket.send(message);
    // }
    // 返回给前端的数据
    let data = JSON.stringify({
      id: Math.random() * 10,
      time: new Date(),
    });
    ctx.websocket.send(data);
    console.log("前端发来：", message);
  });
  ctx.websocket.on("close", (message) => {
    /* 连接关闭时, 清理 上下文数组, 防止报错 */
    console.log("前端断开链接");
    // let index = ctxs.indexOf(ctx);
    // ctxs.splice(index, 1);
  });
});

```
客户端
```javascript
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>websocket</title>
  </head>

  <body>
    <div id="sse">
      <a href="javascript:WebSocketTest()">运行 WebSocket</a>
      <input type="text" id="content" />
      <input type="button" value="发送" id="send" />
      <input type="button" value="关闭" id="close" />
    </div>
    <script>
      function WebSocketTest() {
        if ("WebSocket" in window) {
          alert("您的浏览器支持 WebSocket!");
        } else {
          alert("您的浏览器不支持 WebSocket!");
        }
      }
      /* 封装 WebSocket 实例化的方法 */
      var createWebSocket = (function () {
        return function (urlValue) {
          if (window.WebSocket) return new WebSocket(urlValue);
          if (window.MozWebSocket) return new MozWebSocket(urlValue);
          return false;
        };
      })();
      /* 实例化 WebSocket 连接对象, 地址为 ws 协议 */
      var ws = createWebSocket("ws://localhost");
      /* 接收到服务端的消息时 */
      ws.onmessage = function (msg) {
        // msg 为 MessageEvent类型，需要获取data
        console.log("服务端说:" + msg.data);
      };
      /* 关闭时 */
      ws.onclose = function () {
        console.log("关闭连接");
      };
      /* 发送消息 */
      document.getElementById("send").onclick = function () {
        var str = document.getElementById("content").value;
        ws.send(str);
      };
      /* 关闭消息 */
      document.getElementById("close").addEventListener("click", function () {
        ws.close();
      });
    </script>
  </body>
</html>

```
