# vue数据更新前后

场景

```
methods: {
    tap() {
        for (let i = 0; i < 10; i++) {
            this.a = i;
        }
        this.b = 666;
    },
},
```

数据变更

### dep

触发dep.notify，遍历执行subs也就是watcher[]

```
// dep.js
notify () {
    const subs = this.subs.slice();
    // 循环通知所有watcher更新
    for (let i = 0, l = subs.length; i < l; i++) {
        subs[i].update()
    }
}
```

### watcher

watcher上有个update方法，根据逻辑是否判断立即执行与否

情况有

1. 是计算属性
2. 开发者设置了同步
3. 统一进入排队

```
// src\core\observer\watcher.ts
update () {
    if (this.lazy) {
        // 如果是计算属性
        this.dirty = true
    } else if (this.sync) {
        // 如果要同步更新
        this.run()
    } else {
        // 进入更新队列
        queueWatcher(this)
    }
}
```

场景代码会进入第三种，把当前watcher实例加入队列

### queueWatcher

每个wacher会有id

has:{ [id:number]:boolean }   

假如watcher id为 1

首次进入会设置   has[1]   =true   并把watcher添加到queue（队列）

后续id为1的watcher进入就会跳过添加队列的操作

所以多次修改一个属性，只会更新一次的原因在这里

最后会把队列queue包一个执行函数flushSchedulerQueue，放到nextTick回调中

```
export function queueWatcher (watcher: Watcher) {
    var id = watcher.id;
      if (has[id] != null) {
          return;
      }
      has[id] = true;
      if (!flushing) {
          queue.push(watcher);
      }
      else {
          // if already flushing, splice the watcher based on its id
          // if already past its id, it will be run next immediately.
          let i = queue.length - 1
          while (i > index && queue[i].id > watcher.id) {
              i--
          }
          queue.splice(i + 1, 0, watcher);
      }
      // queue the flush
      if (!waiting) {
          waiting = true;
          if (!config.async) {
              flushSchedulerQueue();
              return;
          }
          nextTick(flushSchedulerQueue);
      }
}

function flushSchedulerQueue () {
    for (index = 0; index < queue.length; index++) {
        watcher = queue[index]
        watcher.run()
        // ...省略细节代码
    }
}
```



### nextTick

#### 源码

https://github.com/vuejs/vue/blob/main/src/core/util/next-tick.ts#L94

```js
export function nextTick(cb?: (...args: any[]) => any, ctx?: object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e: any) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```

##### 解读：

传入cb回调

外面要包一层函数后，添加到callbacks（收集回调，等到异步的时候执行）

- 包一层的原因是，可能传了上下文，需要兼容

如果不pending了，就执行timerFunc

pending默认值是false，意思是当前是否有在添加异步任务

如果没有就添加异步任务

#### 添加异步任务--timerFunc

优雅降级，Promise> MutationObserver>setImmediate>setTimeout

https://github.com/vuejs/vue/blob/main/src/core/util/next-tick.ts#L32

```js
let timerFunc

if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
} else if (
  !isIE &&
  typeof MutationObserver !== 'undefined' &&
  (isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]')
) {
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
```

##### flushCallbacks

```
let pending = false
function flushCallbacks() {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}
```

##### 解读：

其中有个关键函数flushCallbacks

这个就是异步任务最后触发的回调

作用就是，重置callbacks（清空之前收集的回调）

其中的pending意思是

当前已添加完了异步任务，所以就不pending了

这样后面进来的timerFunc就可以执行，用以保证异步任务的顺序