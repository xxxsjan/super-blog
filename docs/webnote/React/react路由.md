# React Router 使用指南

## React Router v5 与 v6 的主要区别

### 1. 路由组件命名变化

- v5: `BrowserRouter`, `HashRouter`
- v6: `Router`, `MemoryRouter`

### 2. 路由匹配算法

- v5: 使用 `path-to-regexp` 库
- v6: 采用基于 `trie` 数据结构的新算法，提供更快速和稳定的路由匹配

### 3. 路由配置方式

- v5: 主要使用声明式路由（嵌套的 `<Route>` 组件）
- v6: 支持声明式路由和函数式路由配置，更灵活地支持动态路由和代码分割

### 4. 动态路由语法

- v5: `/user/:id`
- v6: 支持 `/user/${id}` 模板字符串语法

### 5. 路由钩子

- v5: 使用生命周期钩子
- v6: 采用 React Hooks 风格的 API

## 基础路由配置

### 路由组件和属性

- `exact`: 精确匹配路由
- `replace`: 替换当前路由（不保留历史记录）
- `Redirect`: 重定向组件
- `Switch`/`Routes`: 只匹配一个路由

```jsx
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router basename="/base">
      <div>
        <nav>
          <Link to="/">首页</Link>
        </nav>
        <div>
          <Route path='/shop/add' component={ShopAdd} />
        </div>
      </div>
    </Router>
  );
}
```

## 路由传参

### 1. URL参数

```jsx
// 路由定义
<Route path="/user/:id" component={UserDetail} />

// 组件中获取参数
import { useParams } from 'react-router-dom';

function UserDetail() {
  const { id } = useParams();
  return <div>User ID: {id}</div>;
}
```

### 2. 查询字符串

```jsx
import { useLocation } from 'react-router-dom';

function SearchPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');
  return <div>Search Query: {query}</div>;
}
```

### 3. 状态传递

```jsx
import { useLocation, useNavigate } from 'react-router-dom';

// 传递状态
const navigate = useNavigate();
navigate('/detail', { state: { id: 123 } });

// 接收状态
const location = useLocation();
const { state } = location;
```

## 嵌套路由

### React Router v6 使用 Outlet

`Outlet` 组件用于在父路由中渲染子路由内容：

```jsx
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <nav>{/* 导航内容 */}</nav>
      <main>
        <Outlet /> {/* 子路由内容将在这里渲染 */}
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
```

## RouterProvider 的使用

### 使用 createBrowserRouter

```jsx
// index.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';

const router = createBrowserRouter(routes, { 
  basename: '/app' 
});

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById('root')
);
```

### 路由配置文件

```jsx
// routes.ts
import { RouteObject } from 'react-router';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      }
    ]
  }
];

export default routes;
```

## 路由守卫

### 实现认证保护

```jsx
function PrivateRoute({ children }) {
  const auth = useAuth(); // 自定义认证 hook

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// 使用
<Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
/>
```

## ScrollRestoration

用于在路由切换时自动恢复滚动位置：

```jsx
import { ScrollRestoration } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>{/* 路由配置 */}</Routes>
      <ScrollRestoration /> {/* 自动管理滚动位置 */}
    </>
  );
}
```

## 最佳实践

1. 使用懒加载优化性能

```jsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));

<Suspense fallback={<Loading />}>
  <Route path="/dashboard" element={<Dashboard />} />
</Suspense>
```

2. 集中管理路由配置
3. 使用 TypeScript 增强类型安全
4. 实现错误边界处理路由异常
5. 合理使用路由钩子优化用户体验
