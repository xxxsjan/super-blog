# vite打包优化



## 自定义输出文件名和路径

```
rollupOptions: {
        output: {
          chunkFileNames: chunkInfo => {
            return 'static/js/[name]-[hash].js';
          },
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
},
```

## chunkInfo类型

```javascript
export interface PreRenderedChunk {
	exports: string[];// 
	facadeModuleId: string | null;
	isDynamicEntry: boolean;
	isEntry: boolean;
	isImplicitEntry: boolean;
	moduleIds: string[];
	name: string;
	type: 'chunk';
}
```

## 打印例子

```javascript
# exports: string[]：代码块导出的模块名称数组。
[ 'default' ] 
# facadeModuleId: string | null：代码块的外观模块 ID，如果代码块没有外观模块，则为 null。
D:/HEELOWORLD/front-end/xxsjan/rvc-web/src/pages/follow/index.vue 
# isDynamicEntry: boolean：指示代码块是否为动态入口（dynamic entry）。
true 
# isEntry: boolean：指示代码块是否为入口代码块。
false 
# isImplicitEntry: boolean：指示代码块是否为隐式入口代码块。
false 
# moduleIds: string[]：代码块包含的模块 ID 数组。
[
  'D:/HEELOWORLD/front-end/xxsjan/rvc-web/src/pages/follow/index.vue?vue&type=script&setup=true&lang.ts',
  'D:/HEELOWORLD/front-end/xxsjan/rvc-web/src/pages/follow/index.vue?vue&type=style&index=0&scoped=6af37e91&lang.scss',
  'D:/HEELOWORLD/front-end/xxsjan/rvc-web/src/pages/follow/index.vue'
] 
# name: string：代码块的名称。
index
# type: 'chunk'：代码块的类型，始终为 'chunk'。
chunk
```



## 分包

### manualChunks

手动对三方库分包

```
build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["vue", "axios", "vue-router", "pinia", "dayjs"],
          element: ["element-plus"],
        },
      },
    },
},
```



### chunkFileNames

根据文件分包，都可以是字符串或者函数配置

chunkFileNames    js文件

entryFileNames     入口文件

assetFileNames     资源文件  非js的



```
build: {
      rollupOptions: {
        output: {
          chunkFileNames: chunkInfo => {
            const { facadeModuleId } = chunkInfo;
            let name = '[name]';
            if (facadeModuleId) {
              const pattern = /\/([^/]+)\/index.vue$/;
              const match = facadeModuleId.match(pattern);
              name = match ? match[1] : name;
            }
            return `static/js/${name}-[hash].js`;
          },
          entryFileNames: 'static/js/app-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
},
```

