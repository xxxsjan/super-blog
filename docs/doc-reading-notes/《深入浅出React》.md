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

三大周期
## 状态管理
### flux
[https://github.com/mocheng/react-and-redux/tree/master/chapter-03/flux](https://github.com/mocheng/react-and-redux/tree/master/chapter-03/flux)
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

定两个store
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

```javascript
// SummaryStore.js
import AppDispatcher from '../AppDispatcher.js';
import * as ActionTypes from '../ActionTypes.js';
import CounterStore from './CounterStore.js';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'changed';

function computeSummary(counterValues) {
  let summary = 0;
  for (const key in counterValues) {
    if (counterValues.hasOwnProperty(key)) {
      summary += counterValues[key];
    }
  }
  return summary;
}

const SummaryStore = Object.assign({}, EventEmitter.prototype, {
  getSummary: function() {
    return computeSummary(CounterStore.getCounterValues());
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


SummaryStore.dispatchToken = AppDispatcher.register((action) => {
  if ((action.type === ActionTypes.INCREMENT) ||
      (action.type === ActionTypes.DECREMENT)) {
    AppDispatcher.waitFor([CounterStore.dispatchToken]);

    SummaryStore.emitChange();
  }
});

export default SummaryStore;
```
太难用了吧，乱七八糟的
### Redux
[https://github.com/mocheng/react-and-redux/tree/master/chapter-03/redux_basic](https://github.com/mocheng/react-and-redux/tree/master/chapter-03/redux_basic)
和flux不同，redux只维护一个store
redux多数都是返回对象，而不做设置操作
且对store的更改，也不能说更改，就是生成新state，只在reducer里。他会返回新state
而flux的更改操作在actions.js里

真正的赋值操作是在store.dispatch上，也就是把reducer里return的新state改到store里
reducer里主要是按分类处理输出新的state
actions.js就是生成action对象的，比如 {type:ActionTypes.ADD,key:key}这种
然后他就可以在reducer第二个参数被读取到，然后按情况对state进行处理

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
调用的话
```javascript
store.getValues()
store.dispatch(Actions.increment(this.props.caption))
// 监听store数据改变
store.subscribe(cb)
// 取消store数据监听
store.unsubscribe(cb)
```
## 组件
> <Provider>   <Child/>   </Provider>
> this.props.children 就是 <Child/>

Provider作为顶级标签管理store，后代可以通过constext获取store里的值
```javascript
import {Component,PropTypes} from 'react'
class Provider extents Component {
  getChildContext(){
    return {
      store:this.props.store
    }
  }
  render(){
    return this.props.children
  }
}

Provider.childContextTypes = {
  store:PropTypes.object
}

// use
<Provider store={store}>
</Provider>

// 子孙使用store
子孙.contextTypes = {
 store:PropTypes.object
}
this.context.store就能使用store了
```
### react-redux
就是基于上面redux原生使用的封装
```javascript
import {Provider} from 'react-redux'
```
组件使用store
```javascript
//普通connect使用
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
链接：https://juejin.cn/post/6844904036013965325
```
```javascript
// 使用装饰器简化
@connect(
  state => state.main,
  dispatch => bindActionCreators(action,dispatch)
)
class App extends React.Component{
    render(){
        return <div>hello</div>
    }
}
链接：https://juejin.cn/post/6844904036013965325
```
