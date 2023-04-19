### 安装

##### npm i react react-dom -S

### 理解



index.js是入口文件，引入App.js ,

把App.js 这个地位最大的组件render到名为root 的div中



App.js 定义路由什么的，还不知道干嘛的



setState 异步更新状态，等别人执行完才能更新



#### 原理-核心



```plain
当行不需要括号，且只能有一个根标签
let element = (
  <h2></h2>
)
let root = document.getElementById("root")
// 渲染
ReactDOM.render(element,root)
```



##### 安装babel插件



```plain
cnpm i babel-core babel-loader babel-plugin-transform-runtime -D
cnpm i babel-preset-env	babel-preset-stage-0 -D
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



##### 创建组件



```plain
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



```plain
import Hello from './components/Hello.jsx'//后缀名需要配置后才可以省略
```



##### webpack.config.js配置省略文件名



```plain
module。exports = {
  ...
  resolve:{
  extensions:['.js','.jsx','.json'],
  alias:{
    "@": path.join(__dirname,'./src')
    }
  }
}
```



##### class基础用法



```plain
class Animal (){
  //构造器不写默认也有，就是空的而已
  //new的时候先执行构造器，new可以把里面的属性点出来
  constructor(name,age){
    this.name = name
    this.age = age
  }
  //静态属性(new 的点不出来)
  static info = 'eee'
}
const a1 = new Animal('大黄'，3)
```



```javascript
npm install -g create-react-app
create-react-app mydemo
// 	进入项目
cd mydemo
//	运行项目
npm start || yarn start
//	生成项目
npm run build || yarn build
```





### 创建组件src/components/Home.js



```plain
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



```plain
import logo from './...'

<img src="http....."></img>

<img src={require('./...')}></img>

<img src={logo}></img>
```





### 标签传值



```plain
<aid = "666">
function(e){
  e.target.getAttribute('aid')
}
```



### ref



```plain
<A ref="one"/>
this.refs.one
```



### 单向绑定



```plain
this.state = {}

<input defaultValue={this.state.msg}></input>
```



### 双向数据绑定



```plain
this.state = {}
inputChange=()=>{}
<input value={this.state.msg} onChange={this.inputChange}></input>
```





### 

### 事件



#### 键盘事件



```plain
<onKeyUp={this.func} />
func(e){
  e.keyCode
  e.preventDefault()
}
传参
<onKeyUp={function(e){this.func("参数",e,1,2,3)}.bind(this)} />  //es5
<onKeyUp={(e)=>this.func("参数",e)} />  //es6
func(msg,e,a,b,c){
  console.log(msg)
  console.log(e)
}
```





### 传值



#### 标签传值 传方法  传自己 --父-->子



```html
父:
<Child 
xxx={this.state.xxx}
fun1={this.fun1} 
news(组件名)={this}
/>
子:
--{this.props.xxx}
--{this.props.fun1}
--{this.props.news.funxx}
--{this.props.news.funxx.bind(this,"传值")}
```



#### 父调用子的方法



```plain
父:
<Child ref="footer">
this.refs.footer.fun()
```



#### defaultProps---PropTypes



```plain
父组件有传入props的话,用父组件的,没有就用默认参数
<h2>--{this.props.title}--</h2>
Son.defaultProps={
	title:"标题"
}
//porpsTypes验证合法性(子组件使用)
import PropTypes from 'prop-types'
Son.propsTypes = {
  title:PropTypes.string // number
}
```



#### 路由传值



##### 动态路由传值---match.params



```plain
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



```plain
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



```plain
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



```plain
return 
<Route key={key} 
exact 
path={route.path} 
render={props => <route.component {...props} routes={route.routes} 
/>}
/>
```



#### 路由跳转



```plain
this.props.history.replace('/')
<Redirect to='/login' />
```



### 数据请求



##### axios不支持json,需要用fetch



```plain
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



```plain
npm run eject
```

### 

#### ant 按需引入 报错



降级处理



cnpm i react-app-rewired[@2.0.2-next.0 ]() --save-dev 



### 按需打包antd 的css



https://ant-design.gitee.io/docs/react/use-with-create-react-app-cn



下载依赖包



```plain
yarn add react-app-rewired customize-cra babel-plugin-import
```



config-overrides.js



```plain
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



### 解决跨越



package.json里加个代理人,适用于开发模式



```plain
"proxy":"http://localhost:5000"
```



baseURL那边也要写：`baseURL = ""`



```plain
//解决ajax跨域问题
res.append("Access-Control-Allow-Origin", "*")
res.append("Access-Control-Allow-content-type", "*")
```



### antd开发



#### Form



getFieldDecorator修饰验证



```plain
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



```plain
不暴露原来组件Login，暴露新输出的的
// 包装Login 输入特定的值,输出一个强大的对象属性-from
const wrapLogin = Form.create()(Login)
export default wrapLogin;
```



### React 插槽



给引用的子组件里面写标签，data-positon="header"



```plain
<Children>
<div data-positon="header"></div>
<div data-positon="content"></div>
<div data-positon="footer"></div>
</Children>
```



子组件里面可以通过foreach判断条件添加对应插槽



```plain
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



```plain
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



```plain
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
import {connect} from 'redux
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3">
  <g fill="#61DAFB">
    <path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z"/>
    <circle cx="420.9" cy="296.5" r="45.7"/>
    <path d="M520.5 78.1z"/>
  </g>
</svg>

// 使用
import logo from "./logo.svg";

return(
  <img src={logo} className="App-logo" alt="logo" />
  )
```