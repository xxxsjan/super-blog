
使用
```
const ob = new intersectionObserver(function(entries){

},{
thresholds:0.1,// 出现10%就会触发
})
// 添加观察
ob.observe(document.querySelector("#dom"))
```
