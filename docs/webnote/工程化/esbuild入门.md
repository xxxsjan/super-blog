

# esbuild

https://github.com/evanw/esbuild

https://esbuild.github.io/api/



## cli

```
esbuild app.ts --bundle --outdir=dist
```

## js

```javascript
import * as esbuild from 'esbuild'

let result = await esbuild.build({
  entryPoints: ['app.ts'],
  bundle: true,
  outdir: 'dist',
})
console.log(result)
```

三种模式

- [**Watch mode**](https://esbuild.github.io/api/#watch) 监听模式

```
let ctx = await esbuild.context({
  entryPoints: ['app.ts'],
  bundle: true,
  outdir: 'dist',
})

await ctx.watch()
```

- [**Serve mode**](https://esbuild.github.io/api/#serve) 服务器模式

```
let ctx = await esbuild.context({
  entryPoints: ['app.ts'],
  bundle: true,
  outdir: 'dist',
})

let { host, port } = await ctx.serve()
```

- [**Rebuild mode**](https://esbuild.github.io/api/#rebuild) lets you manually invoke a build. This is useful when integrating esbuild with other tools (e.g. using a custom file watcher or development server instead of esbuild's built-in ones). Here's an example:

```
let ctx = await esbuild.context({
  entryPoints: ['app.ts'],
  bundle: true,
  outdir: 'dist',
})

for (let i = 0; i < 5; i++) {
  let result = await ctx.rebuild()
}
```



## vue3中的使用

```javascript
esbuild
  .context({
    entryPoints: [resolve(__dirname, `../packages/${target}/src/index.ts`)],
    outfile,
    bundle: true,
    external,
    sourcemap: true,
    format: outputFormat,
    globalName: pkg.buildOptions?.name,
    platform: format === 'cjs' ? 'node' : 'browser',
    plugins,
    define: {
      __COMMIT__: `"dev"`,
      __VERSION__: `"${pkg.version}"`,
      __DEV__: `true`,
      __TEST__: `false`,
      __BROWSER__: String(
        format !== 'cjs' && !pkg.buildOptions?.enableNonBrowserBranches
      ),
      __GLOBAL__: String(format === 'global'),
      __ESM_BUNDLER__: String(format.includes('esm-bundler')),
      __ESM_BROWSER__: String(format.includes('esm-browser')),
      __NODE_JS__: String(format === 'cjs'),
      __SSR__: String(format === 'cjs' || format.includes('esm-bundler')),
      __COMPAT__: String(target === 'vue-compat'),
      __FEATURE_SUSPENSE__: `true`,
      __FEATURE_OPTIONS_API__: `true`,
      __FEATURE_PROD_DEVTOOLS__: `false`
    }
  })
  .then(ctx => ctx.watch())
```

