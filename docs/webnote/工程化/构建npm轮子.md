## vue-cli创建

<https://juejin.cn/post/6907428535510499336>

利用的是vue-cli的打包功能，进行输出common umd等js

```
vue-cli-service build --mode development --target lib --name Utils --entry ./lib/index.js
```

## webapck创建

也可以使用webpack4进行打包输出umd类型的包

webpack5也是类似

```javascript
const { resolve } = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    drag: "./src/drag.js",
  },
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "../dist"),
    library: "drag", // 库名
    libraryTarget: "umd", // 允许导出的库可以在CommonJS/AMD的规范下使用，也可以作为全局变量使用
    // libraryExport: "default", // 默认是undefined，不能是空字符串[打包会报错]
  },
  plugins: [new CleanWebpackPlugin()],
};
```

执行 webpack --config  webpack.config.js 即可

打包出的东西可以直接本地引用

或者上传npm官网

上传官网的话，package.json 里面private要移除

author信息，填上你帅气的昵称

main的一定要设置，他只要是给npm publish识别你要上传什么去官网

## rollup创建

这有个好例子

<https://github.dev/any86/v-use-axios>

```javascript
// rollup.config.js
export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs', // umd es cjs
  }
};
```

[rollup具体的使用](https://blog.csdn.net/qiwoo_weekly/article/details/122954883)

## vite创建

```javascript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "./src/main.ts"),
      name: "my-lib",
      filename: (format) => `my-lib.${format}.js`,
    },
  },
  rollupOptions: {
    external: ["vue"],
    output: {
      globals: { vue: "Vue" },
    },
  },
});
```

## 命令

rollup -c  rollup.config.js

### plugin

rollup-plugin-node-resolve —帮助 Rollup 查找外部模块，然后导入

rollup-plugin-commonjs —将CommonJS模块转换为 ES2015 供 Rollup 处理

rollup-plugin-babel — 让我们可以使用es6新特性来编写代码

rollup-plugin-terser — 压缩js代码，包括es6代码压缩

rollup-plugin-[eslint](https://so.csdn.net/so/search?q=eslint&spm=1001.2101.3001.7020) — js代码检测

```javascript
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from "rollup-plugin-babel";
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
 
export default [
  {
    input: 'src/main.js',
    output: {
    name: 'timeout',
    file: '/lib/tool.js',
    format: 'umd'
  },
  plugins: [
    resolve(),  // 这样 Rollup 能找到 `ms`
    commonjs(), // 这样 Rollup 能转换 `ms` 为一个ES模块
    eslint(),
    babel(),
    terser()
  ]}
];
```

## package.json

模块位置的声明

```json
{
  "main": "dist/index.js",
  "module": "dist/index.es.js",
  "unpkg": "dist/v-use-axios.umd.js",
  "jsdelivr": "dist/v-use-axios.umd.js",
  "peerDependencies":{}
}
```
