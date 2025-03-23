# 获取IP地址的几种方法

## Express获取客户端IP

在Express应用中，我们可以通过请求对象(req)获取客户端的IP地址。以下方法会按优先级依次尝试获取:

```javascript
/**
 * 获取真实客户端 ip
 * @param req
 * @returns {*|string}
 */
function getClientIp(req) {
  if (!req) {
    return "";
  }
  return (
    req.headers["x-forwarded-for"] || // 优先使用X-Forwarded-For头
    req.connection?.remoteAddress || // 连接的远程地址
    req.socket?.remoteAddress || // Socket的远程地址
    req.connection?.socket?.remoteAddress || // 连接Socket的远程地址
    req.ip // Express封装的IP
  );
}
```

## Node获取本机IP

使用Node.js的`os`模块可以获取本机的网络接口信息，从而获取本机IP地址。以下提供两种实现方式:

### 方法一：遍历所有网络接口

```javascript
const os = require("os");

function getNetworkIp() {
  let needHost = ""; // 打开的host
  try {
    // 获得网络接口列表
    let network = os.networkInterfaces();
    for (let dev in network) {
      let iface = network[dev];
      for (let i = 0; i < iface.length; i++) {
        let alias = iface[i];
        if (
          alias.family === "IPv4" &&
          alias.address !== "127.0.0.1" &&
          !alias.internal
        ) {
          needHost = alias.address;
        }
      }
    }
  } catch (e) {
    needHost = "localhost";
  }
  return needHost;
}
```

### 方法二：快速获取第一个非本地IPv4地址

```javascript
function getHost() {
  let host = "";
  let ifaces = os.networkInterfaces();
  out: for (var i in ifaces) {
    for (var j in ifaces[i]) {
      var val = ifaces[i][j];
      if (val.family === "IPv4" && val.address !== "127.0.0.1") {
        host = val.address;
        break out;
      }
    }
  }
  return host;
}
```

### 方法三：使用命令行工具

通过执行`ipconfig`命令获取IP地址(Windows系统):

```javascript
var childProcess = require('child_process');
//node执行cmd指令
var cmd = 'ipconfig';
childProcess.exec(cmd, function (error, stdout, stderr) {
  const ip = stdout
    .match(/IPv4.*?:.*?\d+.\d+.\d+.\d+/g)
    .map((str) => str.split(':')[1].trim())
    .filter((str) => !str.startsWith('172'))[0];
  console.log(ip);
});
```

## 获取真实公网IP

使用第三方API服务获取真实的公网IP地址:

```javascript
import axios from "axios";

const IPV4 = "https://api.ipify.org";
const IPV6 = "https://api6.ipify.org";

export default async function getIP({ useIPv6 = false, endpoint } = {}) {
  if (endpoint === undefined) {
    endpoint = useIPv6 ? IPV6 : IPV4;
  }
  const { data } = await axios.get(endpoint);
  console.log("🚀🚀🚀 / data", data);
  return data;
}

getIP(); // 调用示例
```

这个方法使用[ipify](https://www.ipify.org)提供的API服务，支持获取IPv4和IPv6地址。
