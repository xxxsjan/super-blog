### React

##### 安装babel插件

```
cnpm i babel-core babel-loader babel-plugin-transform-runtime -D
cnpm i babel-preset-env babel-preset-stage-0 -D
//识别转化jsx语法的包
cnpm i babel-preset-react -D

//配置webpack.config.js
module exports = {
  ...
  module：{//第三方模块
    rules:[//第三方匹配规则
    {test：/\.js|jsx$/,use:'babel-loader',exclude:/node_modules/}
    ]
  }
}
//添加.babelrc配文件
{
"presets":["env","stage-0","react"],
"plugins":["transform-runtime"]
}
```



### 单向绑定 defaultValue

```
this.state = {}
<input defaultValue={this.state.msg}></input>
```

### 





## pureComponent

官方的pureComponent，做了浅比较的优化

## 异步组件

```
React.lazy(()=>import())
```
