
### IntersectionObserver
[https://github.com/w3c/IntersectionObserver/tree/master/polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)
<script src="https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver"></script>
npm install intersection-observer --save

main.js 引入
import 'intersection-observer'
直接这样就可以了，
源码用的是 
 加载后window.load后就会执行 相关的操作，
如果需要详细的配置或者知道的dom元素，请参考文档
————————————————

### promise
```javascript
import "core-js/es/promise"
```


### 使用预设
babel.config.js
```javascript
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      { 
        useBuiltIns: "usage", 
        corejs: { 
          version: "3", 
          proposals: true } 
      },
    ],
  ],
}
```

