### React

#### 原理-核心

```react
let element = (
  <h2></h2>
)
let root = document.getElementById("root")
// 渲染
ReactDOM.render(element,root)
```

##### 安装babel插件

```0
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

```
//同级
function Component1(props){
	return (
	<li key={props.index}></li>
	)
}
//独立
class App extends Component {
  constructor(props) {
  super(props);this.state = {};}
  render() {
    return (<div className="App"></div>);}
}
export default App;
```

```
import Hello from './components/Hello.jsx'//后缀名需要配置后才可以省略
```

##### webpack.config.js配置省略文件名

```
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

```
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

### create-react-app慢的解决方法

```
npm config set registry https://registry.npm.taobao.org
-- 配置后可通过下面方式来验证是否成功
npm config get registry
-- 或npm info express
```

### 创建组件src-components-Home.js

```react
 // 相当于vue的data(){}
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
  render() 
    return 
      <div>
				<button onClick={this.fun1.bind(this)}></button>
				<button onClick={this.fun2}></button>
				<button onClick={this.fun3}></button>
  			// 箭头函数可写bind,如果是在遍历里面的话需要bind,因为this指向
				<button onClick={this.fun4('zs')}></button>
				<button onClick={this.fun4.bind(this,'zs')}></button>
      </div>
```

### 

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

### 双向数据绑定

```react
this.state = {}
inputChange=()=>{}
<input value={this.state.msg} onChange={this.inputChange}></input>
```



### 生命周期

```
1触发构造函数
shouldComponentUpdate(){return true}
2页面将要加载(不用了)
componentWIllMount(){}
3页面加载时触发
componentDidMount(){}
4页面将销毁时   举例:提示你是否保存
componentWillUnmount() { }
```

### 事件

#### 键盘事件

```react
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

列表渲染

for forEach map

map会返回数组

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

#### 标签设值

```javascript
//react
value="普通文本"
value={this.state.xxx}
//Vue
value="普通文本"
:value="条件。。。"
```

#### 父调用子的方法

```
父:
< ref="footer">
this.refs.footer.fun()
```

#### defaultProps---PropTypes

```react
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

### 报错：

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

##### 原因:

安装node时node的安装目录是在系统变量的path中，而node全局安装包的目录是在用户的path中，系统查询可执行文件的属性是  **先查询系统path变量，然后再查询用户path变量。**所以node安装目录下的npx就覆盖了node全局安装目录下的npx。

##### 解决方法是:

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

cnpm i react-app-rewired[@2.0.2-next.0 ](/2.0.2-next.0 ) --save-dev 

### 按需打包antd 的css

[https://ant-design.gitee.io/docs/react/use-with-create-react-app-cn](https://ant-design.gitee.io/docs/react/use-with-create-react-app-cn)

下载依赖包

```
yarn add react-app-rewired customize-cra babel-plugin-import
```

config-overrides.js

```
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

```
"proxy":"http://localhost:5000"
```

baseURL那边也要写：`baseURL = ""`

```
//解决ajax跨域问题
  res.append("Access-Control-Allow-Origin", "*")
  res.append("Access-Control-Allow-content-type", "*")
```

### antd开发

#### Form

getFieldDecorator修饰验证

```
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

```
不暴露原来组件Login，暴露新输出的的
// 包装Login 输入特定的值,输出一个强大的对象属性-from
const wrapLogin = Form.create()(Login)
export default wrapLogin;
```

### React 插槽

给引用的子组件里面写标签，data-positon="header"

```
<Children>
    <div data-positon="header"></div>
    <div data-positon="content"></div>
    <div data-positon="footer"></div>
</Children>
```

子组件里面可以通过forEach判断条件添加对应插槽

```react
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

## Echart不更新

props和state最好别联系在一起，state的更新麻烦，因为`componentDidMount`方法只会执行一次，render时state不会更新，setState刷新的关键：

1. setState不会立刻改变React组件中state的值；
2. setState通过引发一次组件的更新过程来引发重新绘制；
3. 多次setState函数调用产生的效果会合并。

## 高阶组件

包一层组件

props透传

### render props

render使用props传入的render

```
<div>
{this.props.render(this.state)}
</div>

使用
<Com render={data=><div>{data.a}</div>}>
```

## shouldComponentUpdate

默认ture

### **pureComponent**

官方的pureComponent，做了浅比较的优化



## 异步组件

```
React.lazy(()=>import())
```



