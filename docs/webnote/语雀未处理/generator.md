```javascript
const f = function* () {
  yield console.log(1);
  console.log(11);
  yield console.log(2);
  console.log(3);
  for (let i = 4; i < 10; i++) {
    console.log("-------------");
    yield console.log(i);
  }
};
const fn = f();
fn.next();
console.log("-------------");
fn.next();
console.log("-------------");
fn.next();
fn.next();
fn.next();
fn.next();
```
结果
```javascript
1
-------------
11
2
-------------
3
-------------
4
-------------
5
-------------
6
-------------
7
```
generator使用
先调用generator，拿到步进器
步进器执行next，对应执行到yield那一行
如果没有yield了，执行之前yield之后的所有代码
