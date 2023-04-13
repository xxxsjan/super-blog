## 例子

https://github.dev/any86/v-use-axios

## 参考文章

https://blog.csdn.net/qiwoo_weekly/article/details/122954883

## 入口文件

esm语法

```tsx
// src/main.js
import say from './say.js';
export { say }
 
// src/say.js
export default function(name){
    console.log(name)
};
```



## 打包命令

>  使用配置文件

rollup -c  rollup.confog.js 

> 监听变化

rollup -w  

## 打包配置文件

>  rollup.config.js

需要的插件

pnpm i -D rollup-plugin-node-resolve  rollup-plugin-babel rollup-plugin-json 

#### base.config

```javascript
import resolve from "rollup-plugin-node-resolve"; //—帮助 Rollup 查找外部模块，然后导入
import babel from "rollup-plugin-babel"; //— 让我们可以使用es6新特性来编写代码
import json from "rollup-plugin-json";
import pkg from "../package.json";
export default {
  input: "src/index.js",
  output: [
    {
      file: pkg.main, // lib/index.cjs
      format: "cjs",
      sourcemap: true,
    },
    {
      file: pkg.module, // lib/index.esm.js
      format: "esm",
      sourcemap: true,
    },
    {
      file: pkg.jsdelivr, // lib/jsdelivr.js
      format: "umd",
      name: "webtracing",
      sourcemap: true,
      globals: {
        "web-tracing": "webtracing",
      },
    },
  ],
  plugins: [
    resolve(),
    json(),
    babel({
      exclude: "node_modules/**",
    }),
  ],
};
```

#### dev.config

安装插件

pnpm i -D  rollup-plugin-serve rollup-plugin-livereload

```javascript
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import coreConfig from './rollup.base.config.js'

coreConfig.output.forEach((item) => {
  item.sourcemap = true
})

coreConfig.plugins = [
  ...coreConfig.plugins,
  livereload(),
  serve({
    open: true, // 自动打开页面
    port: 3001, 
    openPage: '/example/index.html', // 打开的页面
    contentBase: ''
  })
]

export default coreConfig;
```

#### prod.config

```javascript

import coreConfig from './rollup.base.config.js'

coreConfig.output.forEach((item) => {
  item.sourcemap = false;
})

coreConfig.plugins = [
  ...coreConfig.plugins,
]
export default coreConfig;
```

## 使用babel

npm i core-js @babel/core @babel/preset-env @babel/plugin-transform-runtime

```javascript
// 简单配置
{
  "presets": [
    "@babel/preset-env"
  ]
}
// 详细配置
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false,
        "useBuiltIns": "usage",
        "corejs": "2.6.10",
        "targets": {
          "ie": 10
        }
      }
    ]
  ],
    "plugins": [
    // 解决多个地方使用相同代码导致打包重复的问题
    ["@babel/plugin-transform-runtime"]
  ],
    "ignore": [
    "node_modules/**"
  ]
}

// 详细配置还要 添加runtimeHelpers: true
// rollup.config.js
module.exports= {
  plugin:{
    babel({
      exclude: 'node_modules/**', // 防止打包node_modules下的文件
      runtimeHelpers: true,       // 使plugin-transform-runtime生效
    }),
  }
}
```



## 新插件

有一些插件不维护，迁移了

```javascript
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";

import typescript from "rollup-plugin-typescript2";
export default {
  input: "./src/hmrCallback.ts",
  output: [
    {
      file: "lib/index.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "lib/index.module.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    typescript(),
    nodeResolve({
      moduleDirectories: ["node_modules", "src"],
    }),
    json(),
    babel({
      presets: ["@babel/preset-env"],
      //   exclude: "node_modules/**",
    }),
  ],
};

```



## 其他插件



### rollup-plugin-commonjs

已迁移到@rollup/plugin-commonjs

> 将CommonJS模块转换为 ES2015 供 Rollup 处理

```
import commonjs from 'rollup-plugin-commonjs';

commonjs(), 
```

### rollup-plugin-terser

> 压缩js代码，包括es6代码压缩

```javascript
import { terser } from 'rollup-plugin-terser';  

terser()
```

### rollup-plugin-eslint

> js代码检测

```
import { eslint } from 'rollup-plugin-eslint';
eslint()
```



### rollup-plugin-uglify

可选丑化插件

```
 import { uglify } from 'rollup-plugin-uglify';
 uglify(),
```



