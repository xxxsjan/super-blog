# webpack插件开发





## compilation.getStats()

 Returns Stats object 

`compilation.getStats()`是Webpack提供的方法之一，用于获取当前编译的统计信息，包括打包的文件数量、打包的大小、时间等等。这个方法在开发和调试Webpack配置时非常有用，可以通过获取编译统计信息，找到优化打包的瓶颈。例如，可以通过该方法获取每个模块的大小，找到需要进行代码优化的模块，减少打包后的文件大小，提高应用性能。

### toJson

 使用`toJson()`方法可以将Webpack编译后的统计信息转换为一个JSON对象，以便于在自定义的命令行工具或者其他工具中进行处理和展示。例如可以通过`toJson()`方法，将Webpack的构建信息通过HTTP请求发送到服务器的数据库中，以便于分析应用程序的构建性能等方面的问题。 


```json
{
  "version": "5.9.0", // Version of webpack used for the compilation
  "hash": "11593e3b3ac85436984a", // Compilation specific hash
  "time": 2469, // Compilation time in milliseconds
  "publicPath": "auto",
  "outputPath": "/", // path to webpack output directory
  "assetsByChunkName": {
    // Chunk name to emitted asset(s) mapping
    "main": ["web.js?h=11593e3b3ac85436984a"],
    "named-chunk": ["named-chunk.web.js"],
    "other-chunk": ["other-chunk.js", "other-chunk.css"]
  },
  "assets": [
    // A list of asset objects
  ],
  "chunks": [
    // A list of chunk objects
  ],
  "modules": [
    // A list of module objects
  ],
  "entryPoints": {
    // A list of entry objects
  },
  "errors": [
    // A list of error objects
  ],
  "errorsCount": 0, // number of errors
  "warnings": [
    // A list of warning objects
  ],
  "warningsCount": 0 // nummber of warnings
}
```

 https://webpack.js.org/api/stats/#structure

- [Asset Objects  输出文件](https://webpack.js.org/api/stats/#asset-objects)
- [Chunk Objects 输出的js](https://webpack.js.org/api/stats/#chunk-objects)
  - modules
- [Module Objects](https://webpack.js.org/api/stats/#module-objects)
- [Entry Objects](https://webpack.js.org/api/stats/#entry-objects)



## 添加新文件

```
compiler.hook.emit.tap('PluginName',function(compilation){
	compilation.assets
})
```



## compilation.assets

输出资源信息，webpack5已废弃



### compiler.options

获取webpack最终配置



## compilation.hooks.buildModule

```
compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
      compilation.hooks.buildModule.tap('MyPlugin', (module) => {
        console.log(`Building module ${module.resource}`);
        // 在这里可以对模块进行一些自定义的处理
      });
});
```



