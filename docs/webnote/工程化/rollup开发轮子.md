## 例子

https://github.dev/any86/v-use-axios



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

Node.js常用的模块有两种形式:

- CommonJS模块:使用`require()` 导出,Rollup不支持
- ES6模块: 使用`import/export` ,Rollup支持

## 打包命令

```
rollup -c
rollup -c  rollup.config.js 
rollup -c -W
```



## rollup.config.js配置文件

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

## 



## 插件

### rollup-plugin-babel 

@rollup/plugin-babel

npm i core-js @babel/core @babel/preset-env @babel/plugin-transform-runtime

```js
// babel.config.js简单配置
{
  "presets": [
    "@babel/preset-env"
  ]
}
// babel.config.js详细配置
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
import babel from "rollup-plugin-babel";

module.exports= {
  plugin:{
    babel({
      exclude: "node_modules/**",
      runtimeHelpers: true,       // 启用@babel/plugin-transform-runtime插件
    }),
  }
}

```

@babel/plugin-transform-runtime插件的作用是:

- 把部分Babel helper函数提取出来,引用一个runtime文件
- 将不变的内容(如regeneratorRuntime)提取出来,不参与编译

尤其对polyfill有好处:

- 不污染全局环境,代码更干净
- 节省代码体积,多份代码不需要重复的polyfill

#### @rollup/plugin-babel

```
import { babel } from "@rollup/plugin-babel";
babel({
      presets: ["@babel/preset-env"],
      //   exclude: "node_modules/**",
 }),
```



### @rollup/plugin-json

解析json

```
import json from "@rollup/plugin-json";
```



### rollup-plugin-node-resolve

- 解析使用 `require()` 和 `import` 的依赖
- 使用browser 优先模式,视情况加载 CommonJS 或 ES module
- 为 node_modules 下的依赖生成别名,提高构建效率

```
import resolve from "rollup-plugin-node-resolve";
```

#### @rollup/plugin-node-resolve

```
import { nodeResolve } from "@rollup/plugin-node-resolve";
nodeResolve({
  moduleDirectories: ["node_modules", "src"],
})
```



### rollup-plugin-commonjs

用于转换 CommonJS 模块,允许 Rollup打包处理 CommonJS 模块。

`rollup-plugin-node-resolve`可以让Rollup解析依赖,但却不知道如何理解CommonJS。

```
import commonjs from 'rollup-plugin-commonjs';

commonjs(), 
```

#### @rollup/plugin-commonjs

- 用于将 CommonJS 语法转换为 ESM
- 把`module.exports` 转换成`export`
- 替换成静态导入

```
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    file: 'bundle.js',
    format: 'iife'
  },
  plugins: [
    commonjs() 
  ]
}
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

### rollup-plugin-cleanup

rollup-plugin-cleanup

rollup-plugin-clear

rollup-plugin-clean

```
import cleanup from "rollup-plugin-cleanup";

cleanup()
```





### rollup-plugin-cop

移动静态文件 

### rollup-plugin-vue

处理vue文件 ` 包含着 `scss` ,所以我们可以自由使用 `scss

### rollup-plugin-postcss

处理css

autoprefixer 处理css前缀

### rollup-plugin-dts 输出d.ts

rollup.config.js

```javascript
import dts from "rollup-plugin-dts";

const config = [
  // …
  {
    input: "./my-input/index.d.ts",
    output: [{ file: "dist/my-library.d.ts", format: "es" }],
    plugins: [dts()],
  },
];

export default config;

// package.json
 "types": "dist/my-library.d.ts",
```

### rollup-plugin-typescript2 解析输出d.ts

```
import typescript from "rollup-plugin-typescript2";

typescript({
    tsconfig: "tsconfig.json",
 	useTsconfigDeclarationDir: true,// 输出类型文件
 }),
 
 // tsconfig.json
 {
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "dist/types"
  },
  "include": ["./index.ts", "./types/*.d.ts"]
}
```







