### 1 only value 只读有效值
every
### 2 undefined value
map forEatch some
### 3 undefined empty value 全部可拿到
find
```javascript
let arr = [1];
arr[10] = 10;
arr[11] = undefined;
console.log(arr);
// undefined也是具体的值
// 1类
arr.map((item) => {
  console.log('map', item); // 除empty都能拿到
});
arr.forEach((item) => {
  console.log('forEach', item); // 除empty都能拿到
});
arr.some((item) => {
  console.log('some', item); // 除empty都能拿到
});
// 2类
arr.every((item) => {
  console.log('every', item); // 只能拿有效值
});
// 3类
arr.find((item) => {
  console.log('find', item);// 最nb empty都能读取 都能拿
});


```
