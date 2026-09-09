# React 状态管理方案总览

本文介绍 React 中常用的几种状态管理方案，帮助你选择最适合的状态管理策略。

## 1. Context API

### 1.1 基本概念

Context 提供了一种在组件树中共享数据的方式，无需显式地通过组件树逐层传递 props。

### 1.2 适用场景

- 需要在组件树中共享全局数据（如用户信息、主题等）
- 组件层级较深，但不需要复杂的状态操作
- 适合中小型应用

### 1.3 基本用法

```javascript
// context.js - 创建 Context
import React from 'react'
const { Consumer, Provider } = React.createContext();
export { Consumer, Provider }

// 父组件 - 使用 Provider
import { Provider } from "./context"

function ParentComponent() {
  const [name, setName] = useState('John');
  return (
    <Provider value={name}>
      <div>
        <p>父组件的值: {name}</p>
        <ChildComponent />
      </div>
    </Provider>
  );
}

// 子组件 - 使用 Consumer
import { Consumer } from "./context"

function ChildComponent() {
  return (
    <Consumer>
      {name => (
        <div>
          <p>子组件获取的值: {name}</p>
        </div>
      )}
    </Consumer>
  );
}
```

## 2. Redux

### 2.1 基本概念

Redux 是一个可预测的状态容器，采用单向数据流，通过 action、reducer 和 store 来管理应用状态。

### 2.2 适用场景

- 大型应用，需要管理复杂的应用状态
- 多个组件需要共享和修改同一状态
- 需要可预测、可追踪的状态变更

### 2.3 基本用法

```javascript
// store.js
import { createStore } from 'redux';

// Action Types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// Action Creators
const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });

// Initial State
const initialState = {
  count: 0
};

// Reducer
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

const store = createStore(counterReducer);
export { store, increment, decrement };

// App.js
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

// Counter.js
import { connect } from 'react-redux';
import { increment, decrement } from './store';

const Counter = ({ count, increment, decrement }) => (
  <div>
    <p>Count: {count}</p>
    <button onClick={increment}>+</button>
    <button onClick={decrement}>-</button>
  </div>
);

const mapStateToProps = (state) => ({
  count: state.count
});

const mapDispatchToProps = {
  increment,
  decrement
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

## 3. useContext + useReducer

### 3.1 基本概念

结合 React 的 useContext 和 useReducer Hook，可以实现轻量级的状态管理方案。

### 3.2 适用场景

- 中小型应用
- 需要 Redux 类似的状态管理模式，但不想引入额外依赖
- 状态逻辑相对简单

### 3.3 基本用法

```javascript
import React, { createContext, useContext, useReducer } from 'react';

// 创建 Context
const GlobalContext = createContext();

// 初始状态
const initialState = { count: 0 };

// Reducer
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error('未知的 action 类型');
  }
}

// Provider 组件
function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

// 使用示例
function Counter() {
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

## 4. 状态管理方案选择建议

1. **小型应用**
   - 使用 useState + props 传递
   - 如果组件层级较深，考虑使用 Context

2. **中型应用**
   - Context + useReducer 组合
   - 如果需要更好的开发工具和中间件支持，考虑使用 Redux

3. **大型应用**
   - Redux：完整的状态管理方案，有成熟的生态系统
   - 可以考虑配合使用 Redux Toolkit 简化 Redux 的使用

4. **性能考虑**
   - Context 适合低频更新的数据（如主题、用户信息）
   - 高频更新的数据建议使用 Redux 或其他状态管理库

选择状态管理方案时，需要考虑项目规模、团队熟悉度、维护成本等因素，没有最好的方案，只有最适合的方案。
