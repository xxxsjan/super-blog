<https://www.jianshu.com/p/8920dc078689>

preload 是告诉浏览器页面必定需要的资源，浏览器一定会加载这些资源。
prefetch 是告诉浏览器页面可能需要的资源，浏览器不一定会加载这些资源。
在VUE SSR生成的页面中，首页的资源均使用preload，而路由对应的资源，则使用prefetch。
对于当前页面很有必要的资源使用 preload，对于可能在将来的页面中使用的资源使用 prefetch。
