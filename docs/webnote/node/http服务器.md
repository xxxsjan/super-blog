# http服务器



## koa-返回html

```js
const Koa = require("koa");
const fs = require("fs");
const path = require("path");
const app = new Koa();

app.use(async (ctx) => {
  //   console.log(ctx.request, ctx.response);
  if (ctx.request.url === "/") {
    const indexContent = await fs.promises.readFile(
      path.resolve(__dirname, "./index.html")
    );
    console.log(indexContent.toString());
    ctx.response.body = indexContent;
    ctx.response.set("Content-Type", "text/html");
  }
});

app.listen(8000, () => {
  console.log("run at http://localhost:8000");
});
```



## http-代理文件

```js
const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const { readFile } = require("fs/promises");

const server = http.createServer((req, res) => {
  let { pathname } = url.parse(req.url);
  pathname = encodeURI(pathname);
  console.log("pathname: ", pathname);
  const extname = path.extname(pathname);
  console.log("extname: ", extname);
  const filePath = path.join(__dirname, pathname);
  console.log("filePath: ", filePath);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, {
        "Content-Type": "text/html",
      });
      res.end("<h1>404 not found</h1>");
    }
    // if (!err && stats.isFile()) {
    readFile(filePath, contentType);
    // }
    // if (!err && stats.isDirectory()) {
    // }
  });
  const mine = {
    ".jpg": "image/jpg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
  };
  const contentType = mine[extname] || "text/plain";
  function readFile(filePath, contentType) {
    console.log("filePath: ", filePath);
    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "max-age=3600",
    });
    const stream = fs.createReadStream(filePath);
    stream.on("error", () => {
      res.writeHead(500, {
        "Content-Type": "text.html",
      });
      res.end("<h1>500</h1>");
    });
    stream.pipe(res);
  }
});

server.listen(8000, () => {
  console.log("run at http://localhost:8000");
});

```

