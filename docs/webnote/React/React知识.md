
# react

## 安装

npm i react react-dom -S

setState 异步更新状态，等别人执行完才能更新

## 挂载

```jsx
let element = (<h2></h2>)
let root = document.getElementById("root")
ReactDOM.render(element,root)
```

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

## 创建组件

```jsx
//同级
function Component1(props){
 return (
  <li key={props.index}></li>
 )
}
//独立
class App extends Component {
  constructor(props) {
      super(props);
      this.state = {};
  }
  render() {
    return (<div className="App"></div>);
 }
}
export default App;
```

## class基础用法

```jsx
class Animal (){
  constructor(name,age){
    this.name = name
    this.age = age
  }
  static info = 'eee'
}
const a1 = new Animal('大黄'，3)
Animal.info 
```

## 创建组件

src/components/Home.js

```javascript
constructor(props) {
    // props父子传值
    super(props); // 继承
    this.state = { name: "Tom", age: 18 },
    this.fun2 = this.fun2.bind(this)
  },
  // 三种方法--this
  fun1(){方法里的this，不是外面那个this},
  fun2(){方法里的this，不是外面那个this},
  fun3 = () =>{
   this.setState({ })
  },  
  fun4=(str)=>{
   this.setState({ msg:str })
  }, 
  // 相当于vue的《template》
  render() {
   return 
      <div>
    <button onClick={this.fun1.bind(this)}></button>
    <button onClick={this.fun2}></button>
    <button onClick={this.fun3}></button>
     // 箭头函数可写bind,如果是在遍历里面的话需要bind,因为this指向
    <button onClick={this.fun4('zs')}></button>
    <button onClick={this.fun4.bind(this,'zs')}></button>
      </div>
}
   
```

### 引入使用img

```javascript
import logo from './...'

<img src="xx"></img>
<img src={require('./...')}></img>
<img src={logo}></img>
```

### 标签传值

```jsx
<div aid="666">
function(e){
  e.target.getAttribute('aid')
}
```

### ref

```jsx
<div ref="one"/>
this.refs.one
```



### 事件

#### 键盘事件

```jsx
<input onKeyUp={this.func} />
func(e){
  e.keyCode
  e.preventDefault()
}
// 传参
<input onKeyUp={function(e){this.func("参数",e,1,2,3)}.bind(this)} />  // es5
<input onKeyUp={(e)=>this.func("参数",e)} />  // es6

func(msg,e,a,b,c){
  console.log(msg)
  console.log(e)
}
```

### 传值

#### 标签传值 传方法  传自己 --父-->子

```jsx
// 父:
<Child 
  xxx={this.state.xxx}
  fun1={this.fun1} 
  news(组件名)={this}
/>
// 子:
{this.props.xxx}
{this.props.fun1}
{this.props.news.funxx}
{this.props.news.funxx.bind(this,"传值")}
```

#### 父调用子的方法

```jsx
父:
<Child ref="footer"/>
this.refs.footer.fun()
```

#### defaultProps---PropTypes

```jsx
父组件有传入props的话,用父组件的,没有就用默认参数
<h2>--{this.props.title}--</h2>
Son.defaultProps={
 title:"标题"
}
// propsTypes验证合法性(子组件使用)
import PropTypes from 'prop-types'
Son.propsTypes = {
  title:PropTypes.string // number
}
```

#### 路由传值

##### 动态路由传值---match.params

```jsx
App.js配置
<Route path='/content:aid' component={Content}></Route>
父组件里
<link to={`/content/${value.aid}`}></link>
子组件里--Content组件里获取aid
componentDidMount(){
  this.props.match.params.aid
}
```

##### get传值----location.search

```jsx
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

| exact    | 精确匹配                         |
| -------- | -------------------------------- |
| replace  | 替换当前路由，历史不记录被替换的 |
| Redirect | 重定向组件                       |
| redirect | 改路由                           |
| Switch   | 组件 只匹配一个路由              |

```jsx
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

<Router basename="/base">
  <div>
  <Link to="/">首页</Link>
    <div>
      <Route exact path='/shop/add' component={ShopAdd}></Route>
    </div>
  </div>
</Router>
```

#### 嵌套路由

遍历时把自己小弟routes(children)传下去

```jsx
return
<Route key={key} 
    exact 
    path={route.path} 
    render={props => <route.component {...props} routes={route.routes} 
    />}
/>
```

#### 路由跳转

```jsx
this.props.history.replace('/')
<Redirect to='/login' />
```

### 数据请求

#### axios不支持json,需要用fetch

Fetch API可以用来获取本地JSON文件

```jsx
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

```jsx
npm run eject
```

#### ant 按需引入报错

降级处理

cnpm i react-app-rewired@2.0.2-next.0 --save-dev

### 按需打包antd的css

<https://ant-design.gitee.io/docs/react/use-with-create-react-app-cn>

下载依赖包

```jsx
yarn add react-app-rewired customize-cra babel-plugin-import
```

config-overrides.js

```jsx
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

### 使用pm2管理应用

安装命令：npm i pm2 -g
启动项目：pm2 start app.js --name 自定义名称
查看列表：pm2 ls
重启项目：pm2 restart 自定义名称
停止项目：pm2 stop 自定义名称
删除项目：pm2 delete 自定义名称



### antd开发

#### Form

getFieldDecorator修饰验证

```jsx
{
getFieldDecorator('password', {
rules: [{ validator: this.validatePwd }],})
(<Input
  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
  type="password"
  placeholder="密码"
/>)
}
```

##### 验证规则rules写法

```javascript
一
rules: [
{ required: true, whitespace: true, message: '请输入密码!' },
{ min: 4, message: '最少4位!' },
{ max: 12, message: '最多12位!' },
{ pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文字母、数字或下划线组成!' }
]
二
rules: [{ validator: this.validatePwd }],
  // 自定义验证规则
  validatePwd = (rule, value, callback) => {
    if (!value) {
    callback('请输入密码')
    } else if (value.length < 3) {
    callback('密码长度必须大于6位')
    } else if (value.length > 12) {
    callback('密码长度不能大于12位')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    callback('密码必须是英文字母、数字或下划线组成')
    } else {
    callback()
}}
```

##### 暴露组件需要包装，包装后组件新增location match history属性

```jsx
不暴露原来组件Login，暴露新输出的的
// 包装Login 输入特定的值,输出一个强大的对象属性-from
const wrapLogin = Form.create()(Login)
export default wrapLogin;
```

### React 插槽

给引用的子组件里面写标签，data-positon="header"

```jsx
<Children>
<div data-positon="header"></div>
<div data-positon="content"></div>
<div data-positon="footer"></div>
</Children>
```

子组件里面可以通过foreach判断条件添加对应插槽

```jsx
this.props.children.forEach((v,i)=>{
if(item.props['data-positon'] === header) {
headerDom = item 
}else if(item.props['data-positon'] === content) {
contentDom = item 
}else if(item.props['data-positon'] === footer) {
footerDom = item 
}
})
子组件里面内容
<div>
  {headerDom}
  {headerDom}
  {headerDom}
</div
```

### redux--数据管理

| Store    | 数据仓库                             |
| -------- | ------------------------------------ |
| State    | 数据                                 |
| Action   | 动作 触发改变的方法                  |
| Dispatch | 将动作触发成方法                     |
| Reducer  | 函数 获取动作 改变数据 生成新的state |

```jsx
import Redux,{createStore} from 'redux'
// 创建仓库
const store = createStore(reducer) 
// 通过动作创建新的state
cosnt reducer=function(state={num:0},action){
  switch(action.type){
    case "add":state.num ++;break;
    case "decrement":state.num --;break;
    default：return
  }
 return {...state}
}
function add(){
  // 调用仓库的dispatch方法修改数据
 store.dispatch({type:"add"})
}
function decrement(){
  // 调用仓库的dispatch方法修改数据
 store.dispatch({type:"decrement"})
}
// 监听修改 重新渲染
store.subscribe(()=>{
  ReactDOM.render(<Counter></Counter/>,document.getElementById("root"))
})
// 数据获取
{store.getState()}
```

#### react-redux

```jsx
import {Povider，connect} from 'react-redux'
class Counter extends React.Component{
 reder(){
  const value = this.props.value;
  const onAddClick = this.props.onAddClick
 }
}
const
 addAction = { type: "add"}
 function reducer (state={num:0},action){
 switch(action.type){
    case "add":state.num ++;break;
    default：return
  }
 return {...state}
 }
const store = createStore(reducer)
/ 修改state里的方法，映射到props
function mapDispatchToProps(dispatch){
  return {
    onAddClick:()={dispatch(addAction)}
}
```

### Echart不更新

props和state最好别联系在一起，state的更新麻烦，

因为`componentDidMount`方法只会执行一次，

render时state不会更新，setState刷新的关键：

1. setState不会立刻改变React组件中state的值
2. setState通过引发一次组件的更新过程来引发重新绘制
3. 多次setState函数调用产生的效果会合并。

## redux

```javascript
// store.js-------------------------------------------
import {createStore,combineReducers,applyMiddleware} from 'redux'
import courseTabListReducer from './reducers/courseTabList'

const allReducers = combineReducers({
  courseTabList:courseTabListReducer
})
import courseTabListState from './states/courseTabList'
import ReduxThunk from 'redux-thunk'
// 第三个参数 是允许异步操作的设置，不设就不支持
const store = createStore(allReducers,{
  courseTabList:courseTabListState
},applyMiddleware(ReduxThunk))

export default store

// states/courseTabList.js---------------------------------
const state = {
  curField = '-1'
}
export default state


// actions/courseTabList.js---------------------------------
const CHANGE_COURSE_FIELD = "CHANGE_COURSE_FIELD"
function changeCourseField(field){
  return {
    type:CHANGE_COURSE_FIELD,
    field // payload 这个变量名随便的
  }
}
export {changeCourseField} 的这种格式


// reducers/courseTabList.js--------------------------------------
import defaultState from './state.js'
// action 就是上面的 {type:xxx,field}
export default function(state=defaultState,action){
  switch(action.type){
    case "CHANGE_COURSE_FIELD":
      return {
        ...state,
        curField:action.field
      }
      break
    default:
      return state
  }
}
```

使用

根组件包一层Provider

```javascript
import {Provider} from 'react-redux'
import store from './store'
class App {
return(
  <div>
   <Provider store={store}>
     <child />
   </Provider>
   </div>
  )
}
```

子组件

要先用connect包一层

mapStateToProps和mapDispatch使state里可读store 的state和action

```javascript
import React,{Component} from 'react'
import {connect} from 'redux'
import {changeCourseField} from 'actions/courseTabList.js'
class Child extends Component{
  const {curField,changeCourseField} = this.props;// 这里可以直接解构拿到state和方法
return (
  <div>Child
  </div>
)
}
export default connect(
  function mapStateToProps(state){
    return {
      curField:state.courseTabList.curField
    }
  },
  function mapDispatch(dispatch){
    return {
      changeCourseField:(field)=>dispatch(changeCourseField(field))
    }
  })(Child)
```

### 使用svg

```tsx
// logo.svg
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" fill="red" />
</svg>

// 使用
import logo from "./logo.svg";
return (  <img src={logo} className="App-logo" alt="logo" />)
```
