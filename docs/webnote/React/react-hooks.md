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

## useImperativeMethods

`useImperativeMethods` 和 `useImperativeHandle` 都是 React 中的 Hook，用于向父组件暴露子组件中的方法或属性。

`useImperativeMethods` 可以让我们在子组件中显式定义一组方法或属性，这些方法或属性可以被父组件通过 `ref` 属性引用并调用。

`useImperativeMethods` 返回一个可变的对象，该对象包含了需要暴露给父组件的方法或属性。

在每次渲染时，`useImperativeMethods` 都会返回一个新的对象，因此我们可以在组件的生命周期内随时更改返回的对象。

`useImperativeHandle` 返回一个固定的引用，该引用包含了需要暴露给父组件的方法或属性。返回的对象在组件的生命周期内是固定的，不会发生变化。

如果需要频繁更改返回的对象，可以使用 `useImperativeMethods`；

如果需要定义一个稳定的公共 API，可以使用 `useImperativeHandle`。

```javascript
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeMethods(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);


function ChildComponent(props, ref) {
  const childRef = useRef(null);

  useImperativeHandle(ref, () => ({
    // 将需要暴露给父组件的方法或属性进行显式定义
    focus: () => {
      childRef.current.focus();
    },
    value: 'some value',
  }));

  return (
    <input type="text" ref={childRef} />
  );
}

export default forwardRef(ChildComponent);
```

