# react传值



## 定义类型

ts中不需要prop-type这个库了

```
type PropsType = {
  categoryList: string[];
}

fucntion component(props:PropsType){
  return <div></div>
}
```

技巧

```
<Com {...{dataOne,dataTwo,dataThree}}>
```

## Provider,Consumer和Context

Context在 16.x 之前是定义一个全局的对象,类似 vue 的 eventBus,如果组件要使用到该值直接通过this.context获取



16.x 之后的Context使用了Provider和Customer模式,在顶层的Provider中传入value，在子孙级的Consumer中获取该值，并且能够传递函数，用来修改context 声明一个全局的 context 定义,context.js

```
context.js
import React from 'react'
let { Consumer, Provider } = React.createContext();//创建 context 并暴露Consumer和Provider模式
export {
    Consumer,
    Provider
}

// 导入 Provider
import {Provider} from "../../utils/context"

<Provider value={name}>
  <div style={{border:'1px solid red',width:'30%',margin:'50px auto',textAlign:'center'}}>
    <p>父组件定义的值:{name}</p>
    <EightteenChildTwo></EightteenChildTwo>
  </div>
</Provider>


// 导入Consumer
import { Consumer } from "../../utils/context"
function Son(props) {
  return (
    //Consumer容器,可以拿到上文传递下来的name属性,并可以展示对应的值
    <Consumer>
      {name => (
        <div
          style={{
            border: "1px solid blue",
            width: "60%",
            margin: "20px auto",
            textAlign: "center"
          }}
        >
        // 在 Consumer 中可以直接通过 name 获取父组件的值
          <p>子组件。获取父组件的值:{name}</p>
        </div>
      )}
    </Consumer>
  );
}
export default Son;

```

## 路由传参

1.params

```ini
ini复制代码<Route path='/path/:name' component={Path}/>
<link to="/path/2">xxx</Link>
this.props.history.push({pathname:"/path/" + name});
读取参数用:this.props.match.params.name
```

2.query

```css
<Route path='/query' component={Query}/>
<Link to={{ pathname : '/query' , query : { name : 'sunny' }}}>
this.props.history.push({pathname:"/query",query: { name : 'sunny' }});
读取参数用: this.props.location.query.name
```

3.state

```css
<Route path='/sort ' component={Sort}/>
<Link to={{ pathname : '/sort ' , state : { name : 'sunny' }}}> 
this.props.history.push({pathname:"/sort ",state : { name : 'sunny' }});
读取参数用: this.props.location.query.state 
```

4.search

```javascript
<Route path='/web/search ' component={Search}/>
<link to="web/search?id=12121212">xxx</Link>
this.props.history.push({pathname:`/web/search?id ${row.id}`});
读取参数用: this.props.location.search
```

这个在 react-router-dom: v4.2.2有 bug,传参跳转页面会空白,刷新才会加载出来

5.优缺点

```erlang
1.params在HashRouter和BrowserRouter路由中刷新页面参数都不会丢失
2.state在BrowserRouter中刷新页面参数不会丢失，在HashRouter路由中刷新页面会丢失
3.query：在HashRouter和BrowserRouter路由中刷新页面参数都会丢失
4.query和 state 可以传对象
```

## redux

https://juejin.cn/post/6844903993278201870#heading-10

## MobX

## flux

## hooks

## useContext+useReducer 

```javascript
// 定义全局状态和 reducer
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

// 创建全局上下文
const GlobalContext = createContext();

// 创建全局状态的 Provider 组件
function GlobalProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GlobalContext.Provider>
  );
}

// 子组件使用全局状态
function ChildComponent() {
  const { state, dispatch } = useContext(GlobalContext);
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}

```

## useContext+useState

```javascript
// @/hooks/useAuth
export const AuthContext = React.createContext({
  data: undefined,
  setData: undefined
});

export const useAuthController = () => {
  const context = useContext(AuthContext);
  return context;
};

使用
import { AuthContext, AuthContextDataType } from '@/hooks/useAuth';

const [state, setState] = useState();
  return (
      <AuthContext.Provider value={{ data: state, setData: setState }}>
        <Child />
      </AuthContext.Provider>
  );

# 后代
const {data,setData}  = useContext(PContext)

# 或者
import { useAuthController } from '@/hooks/useAuth';
const auth = useAuthController();

auth.data
auth.setData
```

#### 区别

都由createContext创建上下文

通过Context.Provider  的 value拿到 状态数据（state）

- 数据来源可以是reducer提供的state 和dispatch
- 可以是useState提供的state 和 setState

使用状态数据时都一样，通过useContext拿到数据，可以使用和设置状态数据