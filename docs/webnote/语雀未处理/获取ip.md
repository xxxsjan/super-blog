### express
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
    req.headers["x-forwarded-for"] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    req.connection?.socket?.remoteAddress ||
    req.ip
  );
}
```


### node
```javascript
const path = require("path");
let os = require("os");

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

### 真实ip
```
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


getIP();
```
