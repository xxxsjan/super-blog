先起个名字 --- super-cli
### 依赖

- commander --核心依赖
- chalk --有颜色的打印
- ora --loading
- del  --删除目录 文件

### 步骤：
我们写ts，利用rollup打包成js，执行js即可预览开发效果

### ts入口
```javascript
import { Command } from "commander";

// 自定义命令的名字 
const program = new Command('super-cli');

// 全局安装的话 执行 sc -v
// 开发测试的话 node 你打包后的路径的js -v
program
  .alias("sc")// 设置别名
  .descripion("我是描述，描述是说明，说明是解释")// 设置描述
  .version('0.0.1', "-v, --version, -V");// 设置版本

program
  .command("ip") // 自定义命令 使用：sc ip
  .description("Get the local external network i p address")
  .option("-i,--intranet,--in", "Get ip for intranet")
  .option("-o,--extranet,--out", "Get ip for extranet")
  .action(function (options) {// 执行器
    // 假如命令是sc ip -i 
    // -i ,options 就会有一个属性intranet 值为true
    // -o ,options就会有一个属性extranet 值为true
    // 你的业务逻辑
  });


program
  .command("folder-print")
  .alias("fp")
  .description("Print directory structure")// command description
  .option(
    "-d, --depth <type>",// option
    "Set the depth of the folder to be traversed",// option description
    "10", // default value
  )
  .option("-p, --print", "Generate a markdown file")
  .action(fucntion(options){
  console.log(options);// {depth:"10"}
});
```

### rollup配置
输出到lib目录
开发预览：执行 node 输出的js 即可
```javascript
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import typescript2 from 'rollup-plugin-typescript2';
import del from 'rollup-plugin-delete';
// import pkg from "./package.json" assert { type: "json" };

// const external = Object.keys(pkg.dependencies || "");
// const globals = external.reduce((prev, current) => {
//   const newPrev = prev;
//   newPrev[current] = current;
//   return newPrev;
// }, {});

const defaultConfig = {
  input: './src/index.ts',
  output: {
    dir: './lib', // 输出目录
    format: 'es', // 输出格式, 可选值: amd, cjs, es, iife, umd
    banner: '#!/usr/bin/env node', // 添加头部
    // sourcemap: true, // 是否生成sourcemap, 默认为false
    // globals, // 外部依赖,
  },
  // external,
  plugins: [
    // 使用typescript2插件
    typescript2(),
    // 解析json文件
    json(),
    // 清理输出目录
    // del({
    //   targets: "lib/*",
    //   // verbose: true, // 打印删除的文件
    // }),

    // 压缩代码
    // terser(),
    // typescript2({
    //   // exclude: "node_modules/**",
    //   // useTsconfigDeclarationDir: true,
    //   // typescript,
    //   // tsconfig: "./tsconfig.json",
    // }),
  ],
};

export default defaultConfig;
```
### 全局使用
全局使用需要package.json配置bin
```javascript
 "bin": {
    "sc": "./bin/cli.js",
    "super-cli": "./bin/cli.js"
  },
```
