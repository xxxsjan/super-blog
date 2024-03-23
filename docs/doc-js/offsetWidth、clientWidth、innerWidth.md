[https://blog.csdn.net/qq_33036599/article/details/81224346](https://blog.csdn.net/qq_33036599/article/details/81224346)
关于js中的offsetWidth、clientWidth、scrollWidth等一系列属性及其方法一直都傻傻分不清，这里就来总结一下这些方法的用法和含义。

注意： 下面元素属性和元素方法都通过 elem.属性 或 elem.方法 的方式使用，window属性通过 window.属性 的方式使用，document属性则通过document调用。
————————————————
```javascript
<script>
    /*
     ****** 元素视图属性
     * offsetWidth 水平方向 width + 左右padding + 左右border-width
     * offsetHeight 垂直方向 height + 上下padding + 上下border-width
     * 
     * clientWidth 水平方向 width + 左右padding
     * clientHeight 垂直方向 height + 上下padding
     * 
     * offsetTop 获取当前元素到 定位父节点 的top方向的距离
     * offsetLeft 获取当前元素到 定位父节点 的left方向的距离
     * 
     * scrollWidth 元素内容真实的宽度，内容不超出盒子高度时为盒子的clientWidth
     * scrollHeight 元素内容真实的高度，内容不超出盒子高度时为盒子的clientHeight
     * 
     ****** 元素视图属性结束
     * 
     ****** Window视图属性（低版本IE浏览器[<IE9]不支持） 【自测包含滚动条，但网络教程都说不包含？？？】
     * innerWidth 浏览器窗口可视区宽度（不包括浏览器控制台、菜单栏、工具栏） 
     * innerHeight 浏览器窗口可视区高度（不包括浏览器控制台、菜单栏、工具栏）
     * ***** Window视图属性结束
     * 
     ****** Document文档视图
     * （低版本IE的innerWidth、innerHeight的代替方案）
     * document.documentElement.clientWidth 浏览器窗口可视区宽度（不包括浏览器控制台、菜单栏、工具栏、滚动条）
     * document.documentElement.clientHeight 浏览器窗口可视区高度（不包括浏览器控制台、菜单栏、工具栏、滚动条）
     * 
     * document.documentElement.offsetHeight 获取整个文档的高度（包含body的margin）
     * document.body.offsetHeight 获取整个文档的高度（不包含body的margin）
     * 
     * document.documentElement.scrollTop 返回文档的滚动top方向的距离（当窗口发生滚动时值改变）
     * document.documentElement.scrollLeft 返回文档的滚动left方向的距离（当窗口发生滚动时值改变）
     ****** Document文档视图结束
     * 
     ****** 元素方法
     * 1. getBoundingClientRect() 获取元素到body
     *  bottom: 元素底边（包括border）到可视区最顶部的距离
     *  left: 元素最左边（不包括border）到可视区最左边的距离
     *  right: 元素最右边（包括border）到可视区最左边的距离
     *  top: 元素顶边（不包括border）到可视区最顶部的距离
     *  height: 元素的offsetHeight
     *  width: 元素的offsetWidth
     *  x: 元素左上角的x坐标 
     *  y: 元素左上角的y坐标 
     * 
     * 2. scrollIntoView() 让元素滚动到可视区
     * 
     * ***** 元素方法结束
     * 
     */
</script>
```
上面属性中，关于 window.innerWidth 和 window.innerHeight， 我自己测试的结果值是包含滚动条的，但网上的教程和相关文档都说不包括滚动条，虽然滚动条的宽度不大，对整体影响也不明显，但如果有道友有准确答案的，还请不吝赐教，顺手留个言，谢谢！



1、clientWidth：目标元素的width+padding(左右两侧)
2、offsetWidth：目标元素的width+padding(左右两侧)+border(左右两侧)
3、clientLeft：目标元素左边框border的宽度
4、offsetLeft：目标元素左边框离其具有定位的父元素之间的距离
5、clientX：鼠标相对于浏览器窗口可视区域的X坐标（横向）
6、offsetX：鼠标相对于绑定事件元素的X坐标
7、pageX：鼠标相对于文档的X坐标，会计算滚动距离；如果没有滚动距离，值与clientX一样
8、screenX：鼠标相对于显示器屏幕左侧的X坐标
9、getBoundingClientRect().left：目标元素左边框相对于浏览器可视区域的距离，可能为负值
 
