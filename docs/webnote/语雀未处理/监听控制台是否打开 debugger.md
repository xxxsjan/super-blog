[https://blog.csdn.net/qq_21460229/article/details/103182426](https://blog.csdn.net/qq_21460229/article/details/103182426?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-103182426-blog-120083615.pc_relevant_aa&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-103182426-blog-120083615.pc_relevant_aa&utm_relevant_index=1)
[https://blog.csdn.net/weixin_51198497/article/details/120083615](https://blog.csdn.net/weixin_51198497/article/details/120083615)
[https://ld246.com/article/1585157247869](https://ld246.com/article/1585157247869)

### while+setTimeout
```javascript
(function noDebuger() {
  function testDebuger() {
    var wWADWeTEd1 = new window['Date']();
    debugger;
    if (new window['Date']() - wWADWeTEd1 > 10) {
      window['document']['body']['innerHTML'] = '<div>私有接口，请勿调用</div>';
      return true;
    }
    return false;
  }

  function start() {
    while (testDebuger()) {
      testDebuger();
    }
  }
  if (!testDebuger()) {
    window['onblur'] = function () {
      setTimeout(function () {
        start();
      }, 500);
    };
  } else {
    start();
  }
})();
```

### setInterval
[https://juejin.cn/post/7000784414858805256](https://juejin.cn/post/7000784414858805256)
```javascript
(() => {
  function block() {
    if (
      window.outerHeight - window.innerHeight > 200 ||
      window.outerWidth - window.innerWidth > 200
    ) {
      document.body.innerHTML =
        "检测到非法调试,请关闭后刷新重试!";
    }
    setInterval(() => {
      (function () {return false;}["constructor"]("debugger")["call"]());
      // debugger;
      // Function('debugger')();
    }, 50);
  }
  try {
    block();
  } catch (err) {}
})();
```
### 复杂化代码工具
待完善

