
# react

##

## 安装babel插件

```jsx
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
// 添加.babelrc配文件
{
"presets":["env","stage-0","react"],
"plugins":["transform-runtime"]
}
```

## Echart不更新

props和state最好别联系在一起，state的更新麻烦，

因为`componentDidMount`方法只会执行一次，

render时state不会更新，setState刷新的关键：

1. setState不会立刻改变React组件中state的值
2. setState通过引发一次组件的更新过程来引发重新绘制
3. 多次setState函数调用产生的效果会合并。

## 生命周期

***componentWillMount*****()** – 在渲染之前执行，在客户端和服务器端都会执行。

***componentDidMount*****()** – 仅在第一次渲染后在客户端执行。

***componentWillReceiveProps*****()** – 当从父类接收到 props 并且在调用另一个渲染器之前调用。

***shouldComponentUpdate*****()** – 根据特定条件返回 true 或 false。如果你希望更新组件，请返回**true** 否则返回 **false**。默认情况下，它返回 false。

***componentWillUpdate*****()** – 在 DOM 中进行渲染之前调用。

***componentDidUpdate*****()** – 在渲染发生后立即调用。

***componentWillUnmount*****()** – 从 DOM 卸载组件后调用。用于清理内存空间。

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

## pureComponent

官方的pureComponent，做了浅比较的优化

## 异步组件

```
React.lazy(()=>import())
```
