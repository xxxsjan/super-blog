# Vite 库打包指南

## 概述

Vite 提供了强大的库模式打包功能，可以将你的代码打包成各种格式（ES Module、CommonJS、UMD）的库，方便在不同环境下使用。本指南将详细介绍如何配置和使用 Vite 的库模式打包功能。

## package.json 配置

在 package.json 中，需要配置不同格式的入口文件：

```json
{
  "name": "dev-plugin",
  "version": "1.0.0",
  "description": "你的库描述",
  "type": "module",
  "main": "dist/index.js",      // CommonJS 格式入口
  "module": "dist/index.mjs",    // ES Module 格式入口
  "unpkg": "dist/index.umd.js",  // UMD 格式入口（CDN）
  "jsdelivr": "dist/index.umd.js",// UMD 格式入口（CDN）
  "exports": {
    ".": {
      "import": "./dist/index.mjs",   // ES Module 导入
      "require": "./dist/index.js",   // CommonJS 导入
      "types": "./dist/index.d.ts"    // TypeScript 类型定义
    }
  },
  "scripts": {
    "build": "vite build"
  },
  "dependencies": {
    "vite": "^3.0.3"
  },
  "devDependencies": {
    "chalk": "^5.0.1"
  }
}
```

### 字段说明

- `main`: CommonJS 格式的入口文件，供 Node.js 和旧版打包工具使用
- `module`: ES Module 格式的入口文件，供现代打包工具使用
- `unpkg`/`jsdelivr`: UMD 格式的入口文件，用于 CDN 引入
- `exports`: 包导出配置，提供更精确的模块导入路径映射

## vite.config.js 配置

```js
import { defineConfig } from "vite";

export default defineConfig({
  mode: "production",  // 建议在库模式下使用 production
  build: {
    lib: {
      entry: "./src/index.js",  // 库的入口文件
      name: "MyLib",           // 暴露的全局变量名（UMD 格式需要）
      formats: ["es", "cjs", "umd"], // 输出格式
      fileName: "index",       // 输出文件名
    },
    minify: false,  // 是否压缩代码
    rollupOptions: {
      // 外部化处理那些你不想打包进库的依赖
      external: ["react", "react-dom"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    }
  }
});
```

### 配置说明

1. **formats**: 支持的输出格式
   - `es`: ES Module 格式，用于现代浏览器和打包工具
   - `cjs`: CommonJS 格式，用于 Node.js 环境
   - `umd`: Universal Module Definition 格式，可在多种环境下使用
   - `iife`: 自执行函数格式，用于直接在浏览器中使用

2. **external**: 外部依赖配置
   - 将频繁使用的大型依赖（如 React）设置为外部依赖
   - 可以显著减小打包体积
   - 避免多个库使用同一依赖时的重复打包

3. **minify**: 代码压缩选项
   - 建议在发布前启用压缩
   - 可以使用 `terser` 或 `esbuild` 作为压缩器

## 最佳实践

1. **版本控制**
   - 使用语义化版本号
   - 在发布前确保更新 package.json 中的版本号

2. **类型支持**
   - 提供 TypeScript 类型定义文件
   - 在 package.json 中正确配置 types 字段

3. **文档维护**
   - 提供详细的 README.md
   - 包含安装、使用示例和 API 文档

4. **依赖管理**
   - 将核心依赖放在 dependencies 中
   - 将开发和构建工具放在 devDependencies 中

## 注意事项

1. 确保入口文件导出的内容符合预期
2. 测试不同环境下的导入方式
3. 合理配置 external 以优化包体积
4. 提供完整的类型定义和文档
