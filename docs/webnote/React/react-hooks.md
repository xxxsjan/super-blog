# React Hooks 使用指南

## useImperativeHandle

`useImperativeHandle` 是 React 中的一个 Hook，用于自定义暴露给父组件的实例值。当父组件通过 `ref` 获取子组件实例时，我们可以通过 `useImperativeHandle` 来控制暴露哪些属性和方法。

### 使用场景

1. 需要在父组件中调用子组件的方法（如触发表单提交、重置表单等）
2. 需要获取子组件中的某些数据
3. 需要限制父组件对子组件实例的访问，只暴露必要的接口

### 基本用法

```javascript
// 子组件
function ChildComponent(props, ref) {
  const inputRef = useRef(null);
  
  // 定义要暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    // 聚焦输入框
    focus: () => {
      inputRef.current.focus();
    },
    // 获取输入值
    getValue: () => {
      return inputRef.current.value;
    },
    // 清空输入
    clear: () => {
      inputRef.current.value = '';
    }
  }));

  return <input ref={inputRef} type="text" />;
}

// 使用 forwardRef 包装组件以支持 ref
const ForwardedChild = forwardRef(ChildComponent);

// 父组件
function ParentComponent() {
  const childRef = useRef(null);

  const handleClick = () => {
    // 调用子组件的方法
    childRef.current.focus();
    const value = childRef.current.getValue();
    console.log('当前输入值:', value);
  };

  return (
    <div>
      <ForwardedChild ref={childRef} />
      <button onClick={handleClick}>获取输入框的值</button>
    </div>
  );
}
```

### 注意事项

1. `useImperativeHandle` 必须和 `forwardRef` 一起使用
2. 只暴露必要的方法和属性，避免过度暴露组件内部实现
3. 暴露的方法应该是稳定的，避免在每次渲染时返回新的函数引用
4. 如果暴露的方法依赖于组件的 state 或 props，需要在依赖项数组中包含这些值

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

## useCallback 和闭包陷阱

`useCallback` 是 React 的性能优化 Hook，用于缓存函数引用。但在使用时需要注意闭包陷阱问题。

### 闭包陷阱示例

```javascript
// 正常情况 - 不使用 useCallback
function App() {
  const [count, setCount] = useState(0);

  return (
    <div onClick={() => {
      setCount(count + 1);
    }}>
      {count}
    </div>
  );
}

// 错误使用 useCallback - 产生闭包陷阱
function App() {
  const [count, setCount] = useState(0);

  // 依赖项为空数组，onClick 中的 count 永远是初始值 0
  const onClick = useCallback(() => {
    setCount(count + 1);
  }, []); // 错误：缺少依赖项

  return <div onClick={onClick}>{count}</div>;
}

// 正确使用 useCallback
function App() {
  const [count, setCount] = useState(0);

  const onClick = useCallback(() => {
    setCount(count + 1);
  }, [count]); // 正确：添加 count 作为依赖项

  return <div onClick={onClick}>{count}</div>;
}
```

### 最佳实践

1. 添加正确的依赖项
2. 使用函数式更新避免依赖
3. 只在需要优化性能时使用 useCallback

```javascript
// 使用函数式更新避免依赖
function App() {
  const [count, setCount] = useState(0);

  const onClick = useCallback(() => {
    setCount(prev => prev + 1); // 使用函数式更新，不需要依赖 count
  }, []); // 依赖项可以为空数组

  return <div onClick={onClick}>{count}</div>;
}
```

## useState 最佳实践

### 函数式更新

当新的 state 需要基于之前的 state 计算得出时，建议使用函数式更新：

```javascript
function Counter() {
  const [count, setCount] = useState(0);

  // 不推荐：可能会出现竞态条件
  const increment = () => {
    setCount(count + 1);
  };

  // 推荐：使用函数式更新
  const betterIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  // 多次更新时特别有用
  const incrementThree = () => {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={betterIncrement}>增加</button>
      <button onClick={incrementThree}>增加三次</button>
    </div>
  );
}
```

### 注意事项

1. state 更新是异步的，不要依赖前一次更新的结果
2. 如果新的 state 需要通过复杂计算得到，可以传入一个函数
3. 如果 state 是对象或数组，记得要传入一个新的引用而不是修改原值
4. 批量更新时使用函数式更新可以保证获取到最新的状态
