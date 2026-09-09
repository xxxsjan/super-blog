# 开发 Loader

[文档参考](http://xxpromise.gitee.io/webpack5-docs/origin/loader.html#_2-loader-%E6%8E%A5%E5%8F%97%E7%9A%84%E5%8F%82%E6%95%B0)

### loader 参数

- `content`：源文件内容
- `map`：SourceMap 数据
- `meta`：元数据，可以是任何内容

```javascript
module.exports = function (content,map,meta){
  // err content,map,meta
  this.callback(null,content,map,meta)
}
```

虽然是异步，也会等它完成再执行下一个 loader。

```javascript
module.exports = function (content, map, meta) {
  const callback = this.async();
  // 进行异步操作
  setTimeout(() => {
    callback(null, result, map, meta);
  }, 1000);
};
```

##

loader API

| 方法名 | 含义 | 用法 |
| --- | --- | --- |
| this.async | 异步回调 loader。返回 this.callback | const callback = this.async() |
| this.callback | 可以同步或者异步调用的并返回多个结果的函数 | this.callback(err, content, sourceMap?, meta?) |
| this.getOptions(schema) | 获取 loader 的 options | this.getOptions(schema) |
| this.emitFile | 产生一个文件 | this.emitFile(name, content, sourceMap) |
| this.utils.contextify | 返回一个相对路径 | this.utils.contextify(context, request) |
| this.utils.absolutify | 返回一个绝对路径 | this.utils.absolutify(context, request) |
