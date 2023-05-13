场景：
main引入了math
math里有add方法
打包一次
现在math加一个方法
再打包，math的包hash会变，这很正常
但main也会变
解决：
通过配置runtime解决

```javascript
optimization:{
  splitChunk:{},
  // 提取runtime文件
  runtimeChunk: {
    name: (entrypoint) => `runtime~${entrypoint.name}`, // runtime文件命名规则
      },
}


```
这也，math改变，会生成runtime文件，main.js并不会改变
