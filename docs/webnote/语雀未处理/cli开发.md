- inquirer：命令行交互工具
- ora：命令行 loading
- chalk：命令行颜色
- log-symbols：命令行图标
- download-git-repo：下载远程模板
### inquirer 命令行交互工具
```bash


```
### commander 命令行工具
node rollup 输出的js 加上命令即可调试
node index.js db -v
```bash
import { Command } from "commander";

const program = new Command('dev-boy');

program
  .alias("db")   // 别名 ，输入db === -v
  .description("A super powerful cli.")
  .version(version, "-v, --version, -V");

program
  .command("ip") // db ip
  .description("Get the local external network i p address")
  .option("-i, --intranet", "Get ip for intranet or extranet")
  .action(getIP);
```
### rollup
```bash
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import typescript2 from "rollup-plugin-typescript2";
import del from "rollup-plugin-delete";

const defaultConfig = {
  input: "./src/index.ts",
  output: {
    dir: "./lib", // 输出目录
    format: "es", // 输出格式, 可选值: amd, cjs, es, iife, umd
    banner: "#!/usr/bin/env node", // 添加头部
    // sourcemap: true, // 是否生成sourcemap, 默认为false
    // globals, // 外部依赖,
  },
  // external,
  plugins: [
    typescript2(),
    json(),
    // del({
    //   targets: "lib/*",
    //   // verbose: true, // 打印删除的文件
    // }),
    // terser(),// 压缩代码
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
