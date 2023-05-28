# esbuild打包



## 命令行脚本

```
"scripts": {
  "build": "esbuild src/index.js --bundle -o dist/index.js" 
}
```

- `src/index.js` 是入口文件
- `--bundle` 进行打包
- --platform=node:指定目标平台为 Node.js   可选：node  browser 
- ---format=esm    输出esm    可选：esm cjs iife
- `-o dist/index.js` 输出到指定文件
- `--minify`: 最小化、压缩打包后的代码
- `--sourcemap`: 生成 sourcemap

## 函数式

entryPoints: 指定入口文件
outfile: 指定输出文件
bundle: true 表示进行打包
external: 指定忽略的外部依赖
sourcemap: 生成 sourcemap 
format: 指定输出格式,这里根据 outputFormat 变量计算得来 
globalName: 指定全局变量名 
platform: 指定目标平台,浏览器或 Node
plugins: 使用的插件
define: 定义全局变量

```javascript
import esbuild from "esbuild";
import path from "node:path";
import vuePlugin from "esbuild-plugin-vue3";
const __cwd = process.cwd();
const outfile = path.resolve(__cwd, `./dist/bundle.js`);
esbuild
  .context({
    entryPoints: [path.resolve(__cwd, `./src/index.ts`)],
    outfile,
    bundle: true,
    external: [],
    sourcemap: true,
    format: "esm",
    globalName: "GLOBAL_VAL",
    platform: "browser",
    // https://esbuild.github.io/content-types
    loader: { },
    plugins: [
      {
        name: "log-rebuild",
        setup(build) {
          build.onEnd(() => {
            console.log(
              `[log-rebuild] built : ${path.relative(__cwd, outfile)}`
            );
          });
        },
      },
      vuePlugin(),
    ],
    define: {
      "process.env.NODE_ENV": JSON.stringify("development"),
    },
  })
  .then((ctx) => ctx.watch());

```



## 钩子

### resolve

```
const result = await build.resolve('./components/Button')
console.log(result.path)  
// /absolute/path/to/components/Button.js

 // 解析 npm 包导入,返回外部导入信息
await build.resolve('lodash', {      
  kind: 'external-module' 
})

// 替换导入路径 // src/components/Button.js
await build.resolve('./Button', {
  resolveDir: 'src/components'
})

```

例子 监听所有引入 `/^example$/` 模块的行为

```javascript
import * as esbuild from 'esbuild'

let examplePlugin = {
  name: 'example',
  setup(build) {
    build.onResolve({ filter: /^example$/ }, async () => {
      const result = await build.resolve('./foo', {
        kind: 'import-statement',
        resolveDir: './bar',
      })
      if (result.errors.length > 0) {
        return { errors: result.errors }
      }
      return { path: result.path, external: true }
    })
  },
}

await esbuild.build({
  entryPoints: ['app.js'],
  bundle: true,
  outfile: 'out.js',
  plugins: [examplePlugin],
})
```

### onStart

初始化前

### onEnd

生成后:

### onResolve

对路径的识别，alias之类的

### onLoad

类似babel，解析import的文件

### onDispose



