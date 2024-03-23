
[https://www.bilibili.com/video/BV11R4y1j7dk/?spm_id_from=autoNext&vd_source=11e14f37a256537712e73b4b7f52411c](https://www.bilibili.com/video/BV11R4y1j7dk/?spm_id_from=autoNext&vd_source=11e14f37a256537712e73b4b7f52411c)

原理：利用Promise.resolve()

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
