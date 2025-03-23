## Prop的使用

```javascript
class Child extent React.Component{
  constructor(props){
    super(props)
    
  }
}
Child.defaultProps = {
  key1:0
}
Child.propTypes = {
  key1:PropTypes.number.isRequired,
  key2:PropTypes.string
}
```

## State

```javascript
this.state={
  initValue:0,
  key2:'233'
}
this.setState({
  initValue:1
})
this.state.initValue = 2  // 可以改成功，但页面不会刷新，且控制台会提示
```

## 生命周期

Mount  装载  

- constructor
- getInitState
  - 返回值就是state的值，用React.createClass时才会有用到这个做初始化
- getDefaultProps  
  - 返回值就是props的值，用React.createClass时才会有用到这个做初始化
- componentWillMount     constructor 里就能做他做的事情，所以不常用
- render
- componentDidMOunt

Update 更新

- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate
- render
- componentDidUpdate

Unmount 卸载

- componentWillUnmount
- componentDidUnmount

## React状态管理

### Context

Context 提供了一种通过组件树传递数据的方式，无需手动在每一层传递 props。

#### 适用场景

- 需要在组件树中共享全局数据（如用户信息、主题）
- 避免多层组件的 props 传递（prop drilling）
- 适合低频率更新的数据

### Flux

Flux 是 Facebook 推出的一种应用架构，用于构建客户端 Web 应用。

#### 示例代码

[完整示例代码](https://github.com/mocheng/react-and-redux/tree/master/chapter-03/flux)

```javascript
// Dispatcher.js
import {Dispatcher} from 'flux';

export default new Dispatcher();
// ActionTypes
export const INCREMENT = 'increment';

export const DECREMENT = 'decrement';
// Actions.js
import * as ActionTypes from './ActionTypes.js';
import AppDispatcher from './AppDispatcher.js';

export const increment = (counterCaption) => {
  AppDispatcher.dispatch({
    type: ActionTypes.INCREMENT,
    counterCaption: counterCaption
  });
};

export const decrement = (counterCaption) => {
  AppDispatcher.dispatch({
    type: ActionTypes.DECREMENT,
    counterCaption: counterCaption
  });
};
```

#### Store 实现

```javascript
// CounterStore.js
import AppDispatcher from '../AppDispatcher.js';
import * as ActionTypes from '../ActionTypes.js';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'changed';

const counterValues = {
  'First': 0,
  'Second': 10,
  'Third': 30
};

const CounterStore = Object.assign({}, EventEmitter.prototype, {
  getCounterValues: function() {
    return counterValues;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

CounterStore.dispatchToken = AppDispatcher.register((action) => {
  if (action.type === ActionTypes.INCREMENT) {
    counterValues[action.counterCaption] ++;
    CounterStore.emitChange();
  } else if (action.type === ActionTypes.DECREMENT) {
    counterValues[action.counterCaption] --;
    CounterStore.emitChange();
  }
});

export default CounterStore;
```

### Redux

Redux 是一个可预测的状态容器，采用单一数据源的设计理念。

#### 特点

- 单一数据源（Single Source of Truth）
- 状态是只读的
- 使用纯函数进行修改

#### 示例代码

[完整示例代码](https://github.com/mocheng/react-and-redux/tree/master/chapter-03/redux_basic)

```javascript
// store.js
import {createStore} from 'redux'
import reducer from './reducer/js'
const initValues = {
  'First':1
}
const store = createStore(reducer,initValues)
export default store

// reducer.js
export default (state, action) => {
  const {counterCaption} = action;

  switch (action.type) {
    case ActionTypes.INCREMENT:
      return {...state, [counterCaption]: state[counterCaption] + 1};
    case ActionTypes.DECREMENT:
      return {...state, [counterCaption]: state[counterCaption] - 1};
    default:
      return state
  }
}
```

#### 基本使用

```javascript
store.getValues()
store.dispatch(Actions.increment(this.props.caption))
// 监听store数据改变
store.subscribe(cb)
// 取消store数据监听
store.unsubscribe(cb)
```

### React-Redux

React-Redux 是 Redux 的官方 React 绑定库，提供了更便捷的 API。

#### Provider 组件

```javascript
import {Provider} from 'react-redux'

<Provider store={store}>
  <App />
</Provider>
```

#### 连接组件

```javascript
// 普通connect使用
class App extends React.Component{
    render(){
        return <div>hello</div>
    }
}
function mapStateToProps(state){
    return state.main
}
function mapDispatchToProps(dispatch){
    return bindActionCreators(action,dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(App)
```

#### 装饰器语法

```javascript
@connect(
  state => state.main,
  dispatch => bindActionCreators(action,dispatch)
)
class App extends React.Component{
    render(){
        return <div>hello</div>
    }
}
```
