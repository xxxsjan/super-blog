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

https://reactrouter.com/en/main/start/tutorial





