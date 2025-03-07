# react使用



#### sass函数生成vw单位

vite 只需要安装sass

webpack需要安装 sass sass-loader

```css
@function vw($px) {
  @return ($px / 375) * 100vw;
}

.box {
  width: 100vw;
  height: 100vh;
  background-color: #bfa;
  font-size: vw(10);
}
// 两种引入方式
// 方式一
import styles from "./App.scss";
<div className={styles.box}>
  <div>233</div>
</div>
// 方式二
import "./App.scss";
<div className="box">
  <div>233</div>
</div>
```

### 路由配置

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
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/order" element={<Order />}>
          <Route path="/order/ing" element={<Conduct />}/>
          <Route path="/order/history" element={<History />}/>
          <Route path="/order/back" element={<Back />}/>
        </Route>
        <Route path="/food" element={<Food />}>
          <Route path="/food/nearby" element={<Nearby />} />
          <Route path="/food/often" element={<Often />} />
        </Route>
        <Route path="/mine" element={<Mine />} />
        <Route path="/orderdetail/:id" element={<OrderDetail />}/>
      </Routes>
    </>
  );
}
```

## 组建通信

<https://www.jb51.net/article/226671.htm>



### context共享状态

MyContext.js

```javascript
import React from "react";
const MyContext = React.createContext({text:'luck'});
export default MyContext
```

某个根组件

使用MyContext.Provider包一层

```javascript
import MyContext from './context';
<MyContext.Provider value={{text:'good luck'}}>
<Children></Children>
</MyContext.Provider>
```

后代组件

```javascript
import React from 'react';
import MyContext from './context';
// 获取数据
this.context.text
```

## ref

使用 `forwardRef` 可以让父组件可以访问子组件的 DOM 节点或 React 组件实例。

```
const MyComponent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      {/* 子组件 */}
    </div>
  );
});
// 父
function ParentComponent() {
  const ref = useRef(null);

  useEffect(() => {
    console.log(ref.current); // 访问子组件中的 DOM 节点或组件实例
  }, []);

  return (
    <div>
      <MyComponent ref={ref} />
    </div>
  );
}
```

## useImperativeHandle

暴露方法和属性

用于暴露组件实例中的某些方法或属性给父组件使用。

```
useImperativeHandle(ref, () => ({
    fn: xxx,
    data: xxx,
}));
```



## ReactDOM.createPortal

挂载到body下

```
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function Modal(props) {
  const modalRoot = document.getElementById('modal-root');
  const { children } = props;

  return ReactDOM.createPortal(
    <div className="modal-background">
      <div className="modal-content">{children}</div>
    </div>,
    modalRoot
  );
}
```
