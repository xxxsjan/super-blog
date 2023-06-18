# react路由

## 5 6区别

React Router 5 和 React Router 6 在 API 和用法上有一些差异。

以下是一些 React Router 6 的新特性和改变：

1. 路由器组件的名称已更改。在 React Router 6 中，`<BrowserRouter>` 更名为 `<Router>`，而 `<HashRouter>` 更名为 `<MemoryRouter>`。
2. 新的路由匹配算法。React Router 6 中引入了一个新的路由匹配算法，它不再依赖于 `path-to-regexp` 库，而是使用了一个全新的基于 `trie` 数据结构的算法，使得路由匹配更快且更稳定。
3. 路由配置方式的变化。在 React Router 5 中，我们可以使用嵌套的 `<Route>` 组件来定义路由，这种方式也被称为“声明式路由”。React Router 6 支持两种配置路由的方法：声明式路由和函数式路由配置。函数式路由配置更加灵活，可以更好地支持动态路由生成和代码分割等高级场景。
4. 动态路由的改进。在 React Router 6 中，动态路由的语法发生了变化。现在我们可以使用 `${}` 语法来将动态参数嵌入到路由路径中，例如：`/user/:id` 可以写成 `/user/${id}`。
5. 路由钩子的变化。在 React Router 6 中，路由钩子的命名和用法都发生了变化。例如，`<Route>` 组件的 `componentWillMount` 和 `componentWillUnmount` 钩子被重命名为 `useEffect` 和 `useEffectCleanup`，以更好地适应 React Hooks 的用法。

需要注意的是，React Router 6 目前还处于 beta 版本，可能会有一些 API 发生变化。建议在使用之前先仔细阅读官方文档和升级指南。

## 文档

<https://reactrouter.com/en/main/start/tutorial>



## v6路由使用

https://juejin.cn/post/7075585581706641415



## Outlet

### React Router v6

`Outlet` 是 React Router v6 中的一个新特性，用于渲染嵌套路由中的子路由。

它类似于 React Router v5 中的 `Switch` 和嵌套的 `Route` 组件，但更加简洁和易于使用。

```jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Outlet />
    </div>
  );
}

function HomeContent() {
  return <p>Welcome to the home page!</p>;
}

function HomeSubpage1() {
  return <p>This is subpage 1 of Home.</p>;
}

function HomeSubpage2() {
  return <p>This is subpage 2 of Home.</p>;
}

function About() {
  return (
    <div>
      <h1>About</h1>
      <Outlet />
    </div>
  );
}

function AboutContent() {
  return <p>Welcome to the about page!</p>;
}

function AboutSubpage1() {
  return <p>This is subpage 1 of About.</p>;
}

function AboutSubpage2() {
  return <p>This is subpage 2 of About.</p>;
}

function Contact() {
  return <h1>Contact</h1>;
}
```



### React Router v5

在 React Router 5 中，可以使用 `Switch` 组件和 `Route` 组件来实现类似 Vue Router 中的 `router-view` 的效果，

并且可以使用嵌套路由来实现类似 Vue Router 中的 `router-view` 嵌套的效果

```jsx
import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Switch>
        <Route exact path="/" component={HomeContent} />
        <Route path="/home/subpage1" component={HomeSubpage1} />
        <Route path="/home/subpage2" component={HomeSubpage2} />
      </Switch>
    </div>
  );
}

function HomeContent() {
  return <p>Welcome to the home page!</p>;
}

function HomeSubpage1() {
  return <p>This is subpage 1 of Home.</p>;
}

function HomeSubpage2() {
  return <p>This is subpage 2 of Home.</p>;
}

function About() {
  return (
    <div>
      <h1>About</h1>
      <Switch>
        <Route exact path="/about" component={AboutContent} />
        <Route path="/about/subpage1" component={AboutSubpage1} />
        <Route path="/about/subpage2" component={AboutSubpage2} />
      </Switch>
    </div>
  );
}

function AboutContent() {
  return <p>Welcome to the about page!</p>;
}

function AboutSubpage1() {
  return <p>This is subpage 1 of About.</p>;
}

function AboutSubpage2() {
  return <p>This is subpage 2 of About.</p>;
}

function Contact() {
  return <h1>Contact</h1>;
}
```

## RouterProvider

### 第一种

#### index.tsx

```
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router5';
import routes from './routes';

function App() {
  return (
    <RouterProvider routes={routes}>
      <BrowserRouter>
        {/* 应用的其他组件 */}
      </BrowserRouter>
    </RouterProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

在上面的示例中，使用 `RouterProvider` 包裹了 `BrowserRouter` 组件，
并将路由配置对象 `routes` 作为属性传递给 `RouterProvider`。
```

### 第二种

#### index.tsx

```jsx
import 'antd-mobile/es/global';
import dayjs from 'dayjs';
import zhCN from 'dayjs/locale/zh-cn';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './router';

dayjs.locale(zhCN);

// export const BASE_NAME = '/webapp';
export const BASE_NAME = '/';

function render() {
  const router = createBrowserRouter(routes, { basename: BASE_NAME });
  ReactDOM.render(<RouterProvider router={router} />, document.getElementById('root'));
}

render();
```

#### App.tsx

```jsx
import { useState } from 'react';
import { Outlet } from 'react-router';
import { ScrollRestoration } from 'react-router-dom';
import { AuthPage } from './components/Auth';
import { AuthContext, AuthContextDataType } from './hooks/useAuth';
import './styles/global.less';

const App: React.FC = () => {
  const [state, setState] = useState<AuthContextDataType>();
  return (
    <>
      <AuthContext.Provider value={{ data: state, setData: setState }}>
        <AuthPage>
          <>
            <Outlet />
            <ScrollRestoration />
          </>
        </AuthPage>
      </AuthContext.Provider>
    </>
  );
};

export default App;
```

#### router.ts

```jsx
import App from '@/App';
import { Navigate, RouteObject } from 'react-router';
import workRoutes from './work';

let routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Navigate to="/main/home" />
      },
      ...workRoutes
    ]
  }
];

export default routes;
```

## ScrollRestoration



```
import { useState } from 'react';
import { Outlet } from 'react-router';
import { ScrollRestoration } from 'react-router-dom';
import { AuthPage } from './components/Auth';
import { AuthContext, AuthContextDataType } from './hooks/useAuth';
import './styles/global.less';

const App: React.FC = () => {
  const [state, setState] = useState<AuthContextDataType>();
  return (
    <>
      <AuthContext.Provider value={{ data: state, setData: setState }}>
        <AuthPage>
          <>
            <Outlet />
            <ScrollRestoration />
          </>
        </AuthPage>
      </AuthContext.Provider>
    </>
  );
};

export default App;

```



