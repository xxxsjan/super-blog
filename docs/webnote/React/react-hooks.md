# hooks



## useCallback

```
const memoizedCallback = useCallback(
  () => {
    // 这里是回调函数的代码
  },
  [/* 依赖项 */],
);
```

当依赖项发生变化时，`useCallback` 将返回一个新的函数引用，否则将返回上一次生成的函数引用。

使用useCallback解决每次渲染时都重新生成一个新的函数引用

```
import React, { useState, useCallback } from 'react';
import ChildComponent from './ChildComponent';

function ParentComponent() {
  const [count, setCount] = useState(0);

  // 定义回调函数
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  // 渲染 UI
  return (
    <div>
      <p>Count: {count}</p>
      <ChildComponent handleClick={handleClick} />
    </div>
  );
}
```



## useReducer

第一个函数是派发修改state的函数

第二个是初始state的值

修改state：dispatch({ type: 'increment' });

dispatch

- type：执行类型
- payload：传递的参数

```
import React, { useReducer } from 'react';

// 定义 reducer 函数
function countReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error('Invalid action type');
  }
}
function Counter() {
  // 初始化 state，包含一个表示当前计数值的 count 属性
  const initialState = { count: 0 };

  // 使用 useReducer 创建计数器状态和 dispatch 函数
  const [state, dispatch] = useReducer(countReducer, initialState);

  // 处理按钮点击事件
  function handleIncrementClick() {
    dispatch({ type: 'increment' });
  }

  function handleDecrementClick() {
    dispatch({ type: 'decrement' });
  }

  // 渲染 UI
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={handleDecrementClick}>-</button>
      <button onClick={handleIncrementClick}>+</button>
    </div>
  );
}
```



## Context

首先需要创建一个context，需要用到createContext

这个context可以在多个地方使用，引入即可

他含有Provider，可以向子组件注入属性或者函数

子组件通过useContext使用传参

```
import React, { createContext, useContext } from 'react';

// 创建上下文对象
const MyContext = createContext();

// 父级
function ParentComponent() {
  return (
    <MyContext.Provider value={{ message: 'Hello, world!' }}>
      <ChildComponent />
    </MyContext.Provider>
  );
}

// 子级：使用 useContext 获取上下文数据
function ChildComponent() {
  const contextData = useContext(MyContext);

  return <p>{contextData.message}</p>;
}
```

