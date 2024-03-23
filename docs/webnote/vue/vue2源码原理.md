### Watcher
new Watcher(vm, expOrFn, cb, options)
第四个参数可以配置他是什么类型的watcher
第五个参数为isRenderWatcher ：是否是渲染watcher
第四个参数有四种
```javascript
if (options) {
  this.deep = !!options.deep // 深度
  this.user = !!options.user // 用户自定义watcher 即 watch
  this.computed = !!options.computed // computed watcher
  this.sync = !!options.sync // 同步执行

} else {
  this.deep = this.user = this.computed = this.sync = false
}
// 各种模式的update分支走向
update () {
  if (this.computed) {
    // ...
  } else if (this.sync) {
    this.run()
  } else {
    queueWatcher(this)
  }
}
```

### mount的watcher（渲染 Watcher）
mount挂载会new Watcher（组件更新）
```javascript
updateComponent = () => {
  vm._update(vm._render(), hydrating)
}
new Watcher(vm, updateComponent, noop, {
  before () {
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate')
    }
  }
}, true /* isRenderWatcher */)
```
new Watcher （渲染watcher）触发pushTarget
pushTarget会把当前wathcer实例进行压栈添加到维护数组中，并把全局Dep.target设置成当前watcher实例
```javascript
export function pushTarget (_target: ?Watcher) {
  if (Dep.target) targetStack.push(Dep.target)
  Dep.target = _target
}

export function popTarget () {
  Dep.target = targetStack.pop()
}
```
这样后面对于响应式的getter即可进行依赖的收集，即dep.depend()
```javascript
class Dep{
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
}
```
### 派发更新
setter触发派发
 dep.notify()
实际遍历调用wathcer的update
不会马上执行回调，会有一个优化，在 nextTick 后执行所有 watcher 的 run
```javascript
class Dep {
  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

class Watcher {
  update(){
    if (this.computed) {
      // 。。。
    }else if(this.sync){ // 同步则直接执行
      this.run()
    }else{
      queueWatcher(this)
    }
  }
}
// src/core/observer/scheduler.js --> queueWatcher
const queue: Array<Watcher> = []
let has: { [key: number]: ?true } = {}
let waiting = false
let flushing = false

export function queueWatcher (watcher: Watcher) {
  const id = watcher.id
  if (has[id] == null) {
    has[id] = true
    if (!flushing) {
      queue.push(watcher)
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      let i = queue.length - 1
      while (i > index && queue[i].id > watcher.id) {
        i--
      }
      queue.splice(i + 1, 0, watcher)
    }
    // queue the flush
    if (!waiting) {
      waiting = true
      nextTick(flushSchedulerQueue) // 放到nextTick执行回调
    }
  }
}
```

### computed 的 Watcher（computed  Watcher）
initComputed
```javascript
// 创建watcher数组  
const watchers = vm._computedWatchers = Object.create(null)
// 遍历computed的key
for (const key in computed) {
  // 每个key实例化一个watcher
  watchers[key] = new Watcher(
    vm,
    getter || noop,
    noop,
    computedWatcherOptions
  )
  // 没有进行响应式的话，进行响应式设置，走defineComputed
  if (!(key in vm)) {
    defineComputed(vm, key, userDef)
  }  
}

```
对应wathcer中对应computed的特殊处理
```javascript
class Watcher{
  constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    // ...
    if (this.computed) {
      this.value = undefined
      this.dep = new Dep()
    } else {
      this.value = this.get()
    }
  }  
}
```
### watch 的 Watcher （user Watcher）
### isDef
```javascript
const isDef = v => v !== undefined
```


