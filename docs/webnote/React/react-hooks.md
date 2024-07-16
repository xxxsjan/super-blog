# hooks



## useImperativeMethods (export)

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

## 闭包问题

### useCallback

```
正常

function App() {
  const [count, setCount] = useState(0);

  return (
    <div
      onClick={() => {
        setCount(count + 1);
      }}
    >
      {count}
    </div>
  );
}

使用useCallback  会有问题
function App() {
  const [count, setCount] = useState(0);

  const onClick = useCallback(() => {
    setCount(count + 1);
  }, []);

  return <div onClick={onClick}>{count}</div>;
}

优化 重新生成函数就不会有问题了

function App() {
  const [count, setCount] = useState(0);

  const onClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return <div onClick={onClick}>{count}</div>;
}

```

## setState获取最新值

传入函数即可

```
function App() {
  const [count, setCount] = useState(0);

  const onClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return <div onClick={onClick}>{count}</div>;
}

```

