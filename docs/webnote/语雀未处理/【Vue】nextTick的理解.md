```javascript
const callbacks = [];
let pending = false;

function flushCallbacks() {
  pending = false;
  const copies = callbacks.slice(0);
  callbacks.length = 0;
  for (let i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

let microTimerFunc;
const p = Promise.resolve();
microTimerFunc = () => {
  p.then(flushCallbacks);
};

function nextTick(cb, ctx) {
  callbacks.push(() => {
    cb && cb.call(ctx);
  });
  console.log("+1", callbacks);
  if (!pending) {
    pending = true;
    microTimerFunc(); // 即p.then( flushCallbacks )
}
}

// 测试一下
let obj = {
  a: 1,
};
nextTick(function () {
  console.log(this.a);
}, obj);
nextTick(function () {
  console.log(this.a);
}, obj);
```

调用nextTick就push 回调进callbacks
pending是等待状态，开始push就把pending状态打开，
然后执行微任务，因为是微任务，不会马上执行
所以后面还有push的cb就继续push，push完，
就开始走微任务，把pending关了，遍历执行收集的cb
并清空收集的cb

