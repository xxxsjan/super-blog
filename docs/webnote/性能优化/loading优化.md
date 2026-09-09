# Loading 优化

参考：<https://www.bilibili.com/video/BV11R4y1j7dk/>

原理：利用 `Promise.resolve()` 串行化 loading。

```javascript
let loading = Promise.resolve();
const mock = new Promise((r) => {
  setTimeout(() => {
    r({ list: [] });
  }, 1000);
});
function requestHandler(api) {
  loading = new Promise((r, j) => {
    api
      .then(() => {
        console.log('api success');
        r();
      })
      .finally(() => {
        loading = Promise.resolve();
      });
  });
}
function submit() {
  console.log('start');
  requestHandler(mock);
  loading.then(() => {
    console.log('submit');
  });
}
submit();
```
