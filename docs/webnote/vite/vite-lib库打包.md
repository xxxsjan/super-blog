# lib库打包

## packages.json

```
{
  "name": "dev-plugin",
  "version": "1.0.0",
  "description": "",
  "type": "module",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "unpkg": "dist/index.umd.js",
  "jsdelivr": "dist/index.umd.js",
  "scripts": {
    "build": "vite build"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "vite": "^3.0.3"
  },
  "devDependencies": {
    "chalk": "^5.0.1"
  }
}

```

vite.config.js

```
import { defineConfig } from "vite";

export default defineConfig({
  mode: "development",// production
  // https://vitejs.bootcss.com/config/#build-lib
  build: {
    lib: {
      name: "lib",
      entry: "./src/index.js",
      formats: ["es", "cjs", "umd"], // 'es' | 'cjs' | 'umd' | 'iife'
      fileName: "index",
    },
    minify: false,
    rollupOptions: {
      // external: ["react", "react-dom"],
    },
  },
});

```

