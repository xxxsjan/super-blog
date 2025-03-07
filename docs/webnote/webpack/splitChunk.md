# splitChunk

## 示例

```javascript
module.exports = {
  optimization: {
    splitChunks: {
      // 分隔符
      // automaticNameDelimiter: '~', 
    
      // 以下是默认值
      // minSize: 20000, // 分割代码最小的大小
      // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
      // minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
      // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
      // maxInitialRequests: 30, // 入口js文件最大并行请求数量
      // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
      // cacheGroups: { // 组，哪些模块要打包到一个组
      //   defaultVendors: { // 组名
      //     test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
      //     priority: -10, // 权重（越大越高）
      //     reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
      //   },
      //   default: { // 其他没有写的配置会使用上面的默认值
      //     minChunks: 2, // 这里的minChunks权重更大
      //     priority: -20,
      //     reuseExistingChunk: true,
      //   },
      // },
      
      chunks: 'all',// all, async, and initial
      // 它可以继承/覆盖上面 splitChunks 中所有的参数值，除此之外还额外提供了三个配置，分别为：test, priority 和 reuseExistingChunk
      cacheGroups: {
        vendors: {
          // 表示要过滤 modules，默认为所有的 modules，可匹配模块路径或 chunk 名字，当匹配的是 chunk 名字的时候，其里面的所有 modules 都会选中
          test: /[\\/]node_modules\/antd\//,
          // priority：表示抽取权重，数字越大表示优先级越高。因为一个 module 可能会满足多个 cacheGroups 的条件，那么抽取到哪个就由权重最高的说了算；
          // priority: 3,
          // reuseExistingChunk：表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
          reuseExistingChunk: true,
          name: 'antd'
        }
      }
    }
  },
}
```

## 配置

### automaticNameDelimiter

> 分隔符

automaticNameDelimiter: '~'

### chunks

chunks: 'all',  多入口时，每个入口一个chunk，all表示所有的chunk公用的代码都要抽离

## maxInitialRequests的理解

<https://www.cnblogs.com/kwzm/p/10316217.html>

```
maxInitialRequests最大请求数

首先三个入口文件对应entry1 entry2 entry3，没有问题

然后上面配置maxInitialRequests设置的是3

entry1 引入了 react 、$、orgchart

entry2 引入了 react 、$、

entry3 引入了 react 、orgchart

1 2都用了第三方库rreact react-dom 所以default~ entry1 ~entry2.chunkhash.chunk.js

1 2都用了公用模块jquery 所以 vendors~entry1~entry2

现在分出来的已经有三个和entry1有关了

1 3公用 react 、orgchart ，但最大引用已达3，所以entry1剩下的引用就不参与分割了，而是一起整合打包，所以vendors~entry1~entry2~entry3

4、page1因为是在entry1.js里面动态引入的所以被拆分出来

5、vendors~page1就是page1里面引入的第三方库lodash
```

## 场景

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
