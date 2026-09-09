# Vite Server

## 使用 connect 搭建 HTTP 服务

```js
// /src/node/server/index.ts
import connect from 'connect';
import http from 'http';

export async function createServer(){
    const app = connect();
    
    // 每次请求会经过该中间件的处理
    app.use(function(_, res){
        // 响应请求
        res.end('Hello from Connect!\n');
    });

    http.createServer(app).listen(3000);

    console.log('open http://localhost:3000/');

}

```



## 使用 sirv 代理静态资源

```
// /src/node/server/middlewares/static.ts
import { NextHandleFunction } from 'connect';
import sirv from 'sirv';

export function staticMiddleware(): NextHandleFunction {
  const serveFromRoot = sirv('./', { dev: true });
  return async (req, res, next) => {
    serveFromRoot(req, res, next);
  };
}
app.use(staticMiddleware());
```

## 处理 TS

### 使用 esbuild 转为 JS

```js
 const { code, map } = await transform(rawCode, {
    target: 'esnext',
    format: 'esm',
    sourcemap: true,
    loader: 'ts',
  });
```

### 添加 source map

代码最后追加注释（data URL 形式）。esbuild 转换后会输出 `code` 和 `map`：

```js
code += `\n//# sourceMappingURL=data:application/json;base64,${Buffer.from(map).toString('base64')}`;
```

## 处理 CSS

```js
const file = url.startsWith('/') ? '.' + url : url;
const rawCode = await readFile(file, 'utf-8');

// 使用 PostCSS 进行处理
const postcssResult = await postcss([atImport()]).process(rawCode,{
    from: file,
    to:file
});

res.setHeader('Content-Type', 'application/javascript');
return res.end(`
    var style = document.createElement('style')
    style.setAttribute('type', 'text/css')
    style.innerHTML = \`${postcssResult.css} \`
    document.head.appendChild(style)
`);
```

