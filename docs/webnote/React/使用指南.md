# React 使用指南

## 样式处理

### SASS/SCSS 支持

在React项目中使用SASS/SCSS需要安装相关依赖：

- Vite项目：只需安装`sass`
- Webpack项目：需要安装`sass`和`sass-loader`

#### 响应式布局工具函数

使用SASS函数可以方便地将px转换为vw单位，实现响应式布局：

```scss
@function vw($px) {
  @return ($px / 375) * 100vw;
}

.responsive-box {
  width: 100vw;
  height: 100vh;
  background-color: #bfa;
  font-size: vw(10); // 10px在375px设计稿下的vw值
}
```

#### 样式引入方式

在React中有两种主要的样式引入方式：

1. CSS Modules方式（推荐）：

```jsx
import styles from "./App.scss";

function App() {
  return (
    <div className={styles.box}>
      <div>Content</div>
    </div>
  );
}
```

2. 全局样式方式：

```jsx
import "./App.scss";

function App() {
  return (
    <div className="box">
      <div>Content</div>
    </div>
  );
}
```

## 路由配置

React Router v6提供了声明式的路由配置方式。以下是一个典型的路由配置示例：

```tsx
// App.tsx
function App() {
  return (
    <div className="App">
      <Header />
      <Suspense fallback={<div>loading...</div>}>
        <RoutesConfig />
      </Suspense>
      <Footer />
    </div>
  );
}

// routes.tsx
export default function RoutesConfig() {
  return (
    <Routes>
      {/* 主页路由 */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      
      {/* 订单相关路由 */}
      <Route path="/order" element={<Order />}>
        <Route path="/order/ing" element={<Conduct />} />
        <Route path="/order/history" element={<History />} />
        <Route path="/order/back" element={<Back />} />
      </Route>
      
      {/* 美食相关路由 */}
      <Route path="/food" element={<Food />}>
        <Route path="/food/nearby" element={<Nearby />} />
        <Route path="/food/often" element={<Often />} />
      </Route>
      
      {/* 个人中心路由 */}
      <Route path="/mine" element={<Mine />} />
      
      {/* 动态路由示例 */}
      <Route path="/orderdetail/:id" element={<OrderDetail />} />
    </Routes>
  );
}
```

## 组件通信

React提供了多种组件间通信的方式，以下是常用的几种：

### Context API

Context提供了一种在组件树中共享数据的方式，无需显式地通过组件树逐层传递props。

```javascript
// MyContext.js - 创建Context
import React from "react";
const MyContext = React.createContext({ text: 'default value' });
export default MyContext;

// 根组件 - 提供Context
import MyContext from './context';

function RootComponent() {
  return (
    <MyContext.Provider value={{ text: 'shared value' }}>
      <Children />
    </MyContext.Provider>
  );
}

// 消费组件 - 使用Context
import React, { useContext } from 'react';
import MyContext from './context';

function ChildComponent() {
  const context = useContext(MyContext);
  return <div>{context.text}</div>;
}
```

### Ref转发

使用`forwardRef`可以让父组件访问子组件的DOM节点或React组件实例：

```jsx
// 子组件
const ChildComponent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      {/* 子组件内容 */}
    </div>
  );
});

// 父组件
function ParentComponent() {
  const childRef = useRef(null);

  useEffect(() => {
    // 可以访问子组件的DOM节点
    console.log(childRef.current);
  }, []);

  return (
    <div>
      <ChildComponent ref={childRef} />
    </div>
  );
}
```

### useImperativeHandle

`useImperativeHandle`用于自定义暴露给父组件的实例值：

```jsx
const ChildComponent = React.forwardRef((props, ref) => {
  const [count, setCount] = useState(0);
  
  useImperativeHandle(ref, () => ({
    // 暴露给父组件的方法
    increment: () => setCount(c => c + 1),
    // 暴露给父组件的数据
    currentCount: count
  }));

  return <div>{count}</div>;
});
```

## Portal

`ReactDOM.createPortal`允许将子节点渲染到存在于父组件以外的DOM节点中，常用于创建模态框等覆盖层组件：

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

function Modal({ children, isOpen }) {
  const modalRoot = document.getElementById('modal-root');
  
  if (!isOpen) return null;
  
  return ReactDOM.createPortal(
    <div className="modal-background">
      <div className="modal-content">
        {children}
        <button onClick={onClose}>关闭</button>
      </div>
    </div>,
    modalRoot
  );
}
```

使用Portal时，需要在HTML中添加对应的容器节点：

```html
<div id="modal-root"></div>
```
