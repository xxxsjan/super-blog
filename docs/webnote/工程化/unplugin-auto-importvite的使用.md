# unplugin-auto-importvite的使用

### 项目环境

vue3+ts+vite

### 特点

使用后可以不手动引入ref reactive onMounted这些api

### 最简单使用

npm i  unplugin-auto-import -D

npm i unplugin-vue-components -D

```
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }), 
  ],
})

```

### AutoImport参数类型

```
interface Options {
    /**
     * Preset names or custom imports map
     *
     * @default []
     */
    imports?: Arrayable<ImportsMap | PresetName | InlinePreset>;
    /**
     * Identifiers to be ignored
     */
    ignore?: (string | RegExp)[];
    /**
     * Inject the imports at the end of other imports
     *
     * @default true
     */
    injectAtEnd?: boolean;
    /**
     * Path for directories to be auto imported
     */
    dirs?: string[];
    /**
     * Pass a custom function to resolve the component importing path from the component name.
     *
     * The component names are always in PascalCase
     */
    resolvers?: Arrayable<Arrayable<Resolver>>;
    /**
     * Filepath to generate corresponding .d.ts file.
     * Default enabled when `typescript` is installed locally.
     * Set `false` to disable.
     *
     * @default './auto-imports.d.ts'
     */
    dts?: string | boolean;
    /**
     * Cache the result of resolving, across multiple vite builds.
     *
     * A custom path is supported.
     * When set to `true`, the cache will be stored in `node_modules/.cache/unplugin-auto-import.json`.
     *
     * @default false
     */
    cache?: string | boolean;
    /**
     * Auto import inside Vue templates
     *
     * @see https://github.com/unjs/unimport/pull/15
     * @see https://github.com/unjs/unimport/pull/72
     * @default false
     */
    vueTemplate?: boolean;
    /**
     * Set default export alias by file name
     *
     * @default false
     */
    defaultExportByFilename?: boolean;
    /**
     * Rules to include transforming target.
     *
     * @default [/\.[jt]sx?$/, /\.vue\??/]
     */
    include?: FilterPattern;
    /**
     * Rules to exclude transforming target.
     *
     * @default [/node_modules/, /\.git/]
     */
    exclude?: FilterPattern;
    /**
     * Generate corresponding .eslintrc-auto-import.json file.
     */
    eslintrc?: ESLintrc;
}
```

### 开始配置

```
 AutoImport({
      dts: true, // 会在根目录生成auto-imports.d.ts，里面可以看到自动导入的api
      include: [/\.[tj]sx?$/, /\.vue$/], // 匹配的文件，也就是哪些后缀的文件需要自动引入
      imports: [ // 自动引入的api从这里找
        'vue',
        'vue-router',
        // 详细配置
        {
          '@vueuse/core': [
            // named imports
            'useMouse', // import { useMouse } from '@vueuse/core',
            // alias
            ['useFetch', 'useMyFetch'] // import { useFetch as useMyFetch } from '@vueuse/core',
          ],
          axios: [
            // default imports
            ['default', 'axios'] // import { default as axios } from 'axios',
          ]
        }
      ],
      // 解析器配置
      resolvers: [], // 第三方ui
      // 根据项目情况配置eslintrc，默认是不开启的
      eslintrc: {
        enabled: true // @default false
        // 下面两个是其他配置，默认即可
        // 输出一份json文件，默认输出路径为./.eslintrc-auto-import.json
        // filepath: './.eslintrc-auto-import.json', // @default './.eslintrc-auto-import.json'
        // globalsPropValue: true, // @default true 可设置 boolean | 'readonly' | 'readable' | 'writable' | 'writeable'
      }
    })
```

因为会输出一个auto-imports.d.ts
他的作用就是解决ts找不到变量的报错
![image.png](https://upload-images.jianshu.io/upload_images/20993246-895d8d3131ecaa7f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

假如出现报错，可能是因为ts没识别到这份文件

![image.png](https://upload-images.jianshu.io/upload_images/20993246-714160d49b1a52f4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

你可以在tsconfig.json进行如下配置
把他添加进include

```
{
  "compilerOptions": {
   // ...
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts", 
    "src/**/*.tsx", 
    "src/**/*.vue",  // vue报的错,所以要包括vue文件
    "./auto-imports.d.ts" // 自动引入的声明文件
   ],
}
```

eslint配置

```
{
  "extends": [
   "other..."
 ++".eslintrc-auto-import.json"
  ]
}
```

### 验证结果

发现不报错，项目也能运行
![image.png](https://upload-images.jianshu.io/upload_images/20993246-7464ab8fc4de8be1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
