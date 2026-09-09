# Prefetch 与 Preload

参考：<https://www.jianshu.com/p/8920dc078689>

- **preload**：告诉浏览器页面必定需要的资源，浏览器一定会加载
- **prefetch**：告诉浏览器页面可能需要的资源，浏览器不一定会加载

在 Vue SSR 生成的页面中，首页资源常用 preload，路由对应资源常用 prefetch。

对当前页很必要的资源用 preload，对将来可能用到的资源用 prefetch。
