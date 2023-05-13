
```javascript
var a = function() { 
  console.log(a.caller); 
} 
var b = function() { 
  a(); 
} 
b(); // ƒ () { a(); } 也就是b函数
```

```javascript
var a = function() { 
  console.log(arguments.callee); 
} 
var b = function() { 
  a(); 
} 
b(); // ƒ () {   console.log(arguments.callee);  返回a本身

```
> **arguments.callee可以在递归里使用，不用担心引用或者变量修改问题**

