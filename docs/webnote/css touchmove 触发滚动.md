css touchmove 触发滚动

解决1：

```
  const vm = this;
    document.addEventListener(
      'touchmove',
      function (event) {
        if (vm.isMove) {
          event.preventDefault();
        }
      },
      {
        passive: false
      }
    );
```

解决2

 应用 CSS 属性 `touch-action: none;` 这样任何触摸事件都不会产生默认行为，但是 `touch` 事件照样触发。
`touch-action` 还有很多选项，详细请参考`touch-action`

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/touch-action>

```
// 使用全局样式样式去掉
* { touch-action: pan-y; }

// 或
.container {
  touch-action: none;
}
```
