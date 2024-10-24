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

### img引入

```
import logo from './...'
<img src="http....."></img>
<img src={require('./...')}></img>
<img src={logo}></img>
```

### 单向绑定 defaultValue

```
this.state = {}
<input defaultValue={this.state.msg}></input>

```

### 传值

#### 标签传值 传方法  传自己 --父-->子

```
父:
< xxx={this.state.xxx}
--fun1={this.fun1} 
--news(组件名)={this}
/>
子:
--{this.props.xxx}
--{this.props.fun1}
--{this.props.news.funxx}
--{this.props.news.funxx.bind(this,"传值")}
```

#### 父调用子的方法

#### 路由传值

##### 动态路由传值---match.params

```react
App.js配置
<Route path='/content:aid' component={Content}></Route>
父组件里
<link to={`/content/${value.aid}`} ></link>
子组件里--Content组件里获取aid
componentDidMount(){
  this.props.match.params.aid
}
```

##### get传值----location.search

```react
App.js配置
<Route path='/content' component={Content}></Route>
父组件里
<link to={`/content/?aid=${value.aid}`}></link>
子组件里--Content组件里获取aid
componentDidMount(){
  this.props.location.search.aid   // ?aid=xxx需要解析
}
cnpm i url -S
import url from 'url'
var aid = url.parse( this.props.location.search.aid,true).query.aid
```

### 路由

#### 路由配置

Router下需要一个div包裹

| exact | 精确匹配 |
| --- | :--- |
| replace | 替换当前路由，历史不记录被替换的 |
| Redirect | 重定向组件 |
| redirect | 改路由 |
| Switch | 组件 只匹配一个路由 |

```react
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
<Router basename="/base">
  <div>
  <Link to="/">首页</Link>
    <div>
      <Route path='/shop/add' component={ShopAdd}></Route>
    </div>
  </div>
</Router>
```

#### 嵌套路由

遍历时把自己小弟routes(children)传下去

```react
return <Route key={key} exact path={route.path} render={props => <route.component {...props} routes={route.routes} />}
 />
```

#### 路由跳转

```
this.props.history.replace('/')
<Redirect to='/login' />
```

### 数据请求

##### axios不支持jsonp,需要用fetch

```
fetch('/users.json')
 //先转换
  .then(function(response) {
    return response.json()
  })
  //成功回调
  .then(function(json) {
    console.log('parsed json', json)
  })
  //失败回调
  .catch(function(ex) {
    console.log('parsing failed', ex)
  })
```

### webpack配置

方法1:

点开package.json文件，可看到配置的命令是以 "react-scripts ***" 来执行，所以打开node_modules文件夹，找到react-scripts文件夹进去， config目录即是你需要找的webpack的配置文件，然后就自己去修改配置就好

方法二:

使用 create-react-app 创建的项目，默认情况下是看不到 webpack 相关的配置文件，我们需要给它暴露出来，使用下面命令即可

```
npm run eject
```

### 报错

#### operation not permitted

解决：以管理员打开

#### The "path" argument must be of type string. Received undefined

方法一:   (我试了,不行,他是npx报的错,应该不适用)

[https://www.jianshu.com/p/460303a6ef38](https://www.jianshu.com/p/460303a6ef38)

博客原文：[https://blog.yinaoxiong.cn/2018/08/19/fix-npx-erro.html](https://blog.yinaoxiong.cn/2018/08/19/fix-npx-erro.html)

在使用Windows上使用较老版本的nodejs，如何我使用的v8.9其自带的npx的版本为9.7，在Windows上使用会存在：“Path must be a string. Received undefined”的错误。通过 GitHub 上的 issue 可以知道改问题已经在最新版的npx中解决了，可以通过npm手动升级到最新版解决。

```shell
npm i -g npx
```

但是运行npx -v后我们发现还是老版本的npx在运行新下载的npx并没有生效，这就是Windows环境变量的锅了。

##### 原因

安装node时node的安装目录是在系统变量的path中，而node全局安装包的目录是在用户的path中，系统查询可执行文件的属性是  **先查询系统path变量，然后再查询用户path变量。**所以node安装目录下的npx就覆盖了node全局安装目录下的npx。

##### 解决方法是

把用户变量下path中node全局安装的路径复制到系统变量的path中。（如果自己没有修改过node全局安装目录的话这个路径一般是："C:\Users{your_user_name}\AppData\Roaming\npm"),

注意**一定要把这个路径放在node安装目录前面**，因为查找是从上到下查找的。之后就可以开心的使用npx了。

##### 另一个办法: (好像也不行)

[https://www.e-learn.cn/content/qita/2012187](https://www.e-learn.cn/content/qita/2012187)

[//webpack.config.js](//webpack.config.js)

```
plugins: [
    new HtmlWebpackPlugin({
        title: 'use plugin',
        filename: 'index.html'
    })
]
```

方法三:

重新create-react-app 一个新项目, 搬运src文件夹和package.json

#### ant 按需引入 报错

降级处理

cnpm i react-app-rewired[@2.0.2-next.0](/2.0.2-next.0 ) --save-dev

### 按需打包antd 的css

[https://ant-design.gitee.io/docs/react/use-with-create-react-app-cn](https://ant-design.gitee.io/docs/react/use-with-create-react-app-cn)

下载依赖包

```
yarn add react-app-rewired customize-cra babel-plugin-import
```

config-overrides.js

```js
const { override, fixBabelImports, addLessLoader } = require('customize-cra');
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' },
  }),
);
```

更改 package.json

```json
/* package.json */
"scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
}
```

### React 插槽

```js
class Parent extends React.Component{
  render =()=>{
    return <Children>
        <div data-positon="header"></div>
        <div data-positon="content"></div>
        <div data-positon="footer"></div>
    </Children>
  }
}
class Children extends React.Component{
  render =()=>{
    this.props.children.forEach((v,i)=>{
    if(item.props['data-positon'] === header) {
     headerDom = item 
    }else if(item.props['data-positon'] === content) {
     contentDom = item 
    }else if(item.props['data-positon'] === footer) {
     footerDom = item 
    }
})
    return <div>
            {headerDom}
            {contentDom}
            {footerDom}
          </div>
  }
}

```

## redux--数据管理

| Store | 数据仓库 |
| --- | --- |
| State | 数据 |
| Action | 动作 触发改变的方法 |
| Dispatch | 将动作触发成方法 |
| Reducer | 函数 获取动作 改变数据 生成新的state |
| subscribe | 监听状态更新 |

```react
import Redux,{createStore} from 'redux'

// 通过动作创建新的state
cosnt reducer= function(state={num:0},action){
  switch(action.type) {
    case "add":
          state.num ++;
          break;
    case "decrement":
          state.num --;
          break;
    default：return
  }
  return {...state}
}
// 创建仓库
const store = createStore(reducer) 

function add(){
  // 调用仓库的dispatch方法修改数据
 store.dispatch({type:"add"})
}
function decrement(){
  // 调用仓库的dispatch方法修改数据
 store.dispatch({type:"decrement"})
}
// 监听修改 
store.subscribe(()=>{ 
    console.log(store.getState())  // 数据获取
  ReactDOM.render(<Counter/>,document.getElementById("root")) // 重新渲染
})

```

#### react-redux

```react
import {Provider, connect} from 'react-redux'

// 根
const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// App里的组件
class MyComponent extends React.Component {
  // component code...
  render() {
    return (
      <button onClick={this.props.onAddClick}>Add</button>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);

// dispatch映射到props
function mapDispatchToProps(dispatch){
  return {
    onAddClick:()={dispatch({ type: "add"})
  }
}
// state映射到props   
function mapStateToProps(state) {
  return {
    counter: state.counter,
    user: state.user
  };
}
```

### **pureComponent**

官方的pureComponent，做了浅比较的优化

## 异步组件

```
React.lazy(()=>import())
```
