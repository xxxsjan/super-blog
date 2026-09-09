# React 性能优化指南

## 组件优化

### 避免不必要的重渲染

#### 使用 React.memo()

`React.memo()` 是一个高阶组件，用于优化函数组件的性能。它通过记忆组件渲染结果的方式，在 props 没有改变的情况下跳过渲染。

```javascript
function Child(props) {
  return <div>{props.text}</div>;
}

// 基础用法
const MemoizedChild = React.memo(Child);

// 自定义比较函数
const MemoizedChildWithCompare = React.memo(Child, (prevProps, nextProps) => {
  return prevProps.text === nextProps.text;
});
```

使用场景：

- 组件接收简单的 props（如基本类型）
- 组件渲染开销较大
- 组件经常接收相同的 props

#### 使用 shouldComponentUpdate

对于 class 组件，可以通过实现 `shouldComponentUpdate` 生命周期方法来优化性能：

```javascript
class Child extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // 只在 text prop 改变时更新
    return nextProps.text !== this.props.text;
  }

  render() {
    return <div>{this.props.text}</div>;
  }
}
```

### 使用 useMemo 和 useCallback

#### useMemo

用于缓存计算结果，避免在每次渲染时重复进行昂贵的计算：

```javascript
function ExpensiveComponent({ data }) {
  const processedData = useMemo(() => {
    return data.map(item => expensiveOperation(item));
  }, [data]); // 只在 data 改变时重新计算

  return <div>{processedData.map(item => <span>{item}</span>)}</div>;
}
```

#### useCallback

用于缓存回调函数，避免在每次渲染时创建新的函数引用：

```javascript
function Parent() {
  const handleClick = useCallback((id) => {
    console.log('Item clicked:', id);
  }, []); // 空依赖数组表示该函数永远不会改变

  return <Child onClick={handleClick} />;
}
```

## 渲染优化

### 虚拟列表

对于长列表，使用虚拟滚动技术只渲染可视区域的内容：

```javascript
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index]}
    </div>
  );

  return (
    <FixedSizeList
      height={400}
      width={300}
      itemCount={items.length}
      itemSize={35}
    >
      {Row}
    </FixedSizeList>
  );
}
```

### 懒加载组件

使用 `React.lazy` 和 `Suspense` 实现组件的按需加载：

```javascript
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
}
```

## 代码分割

### 路由级别的代码分割

结合 React Router 实现基于路由的代码分割：

```javascript
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Home = React.lazy(() => import('./routes/Home'));
const About = React.lazy(() => import('./routes/About'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}
```

### 动态导入

在特定条件下动态导入组件：

```javascript
function App() {
  const [showEditor, setShowEditor] = useState(false);
  const Editor = React.lazy(() => import('./Editor'));

  return (
    <div>
      <button onClick={() => setShowEditor(true)}>打开编辑器</button>
      {showEditor && (
        <Suspense fallback={<Loading />}>
          <Editor />
        </Suspense>
      )}
    </div>
  );
}
```

## 最佳实践

1. 使用生产构建版本
2. 合理设置 key 属性，避免使用数组索引作为 key
3. 避免在渲染函数中创建新的对象或数组
4. 使用 React DevTools Profiler 进行性能分析
5. 及时清理副作用和事件监听器
6. 避免过度使用 Context，可能导致不必要的重渲染
7. 使用 Web Workers 处理CPU密集型任务
