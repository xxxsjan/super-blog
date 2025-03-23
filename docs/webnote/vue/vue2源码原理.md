# Vue2 源码原理 - Watcher 机制详解

## Watcher 概述

Watcher 是 Vue 响应式系统的重要组成部分，负责监听数据变化并触发相应的更新操作。Vue 中存在三种主要类型的 Watcher：

- 渲染 Watcher：负责组件的视图更新
- 计算属性 Watcher：处理计算属性的依赖收集和计算
- 用户 Watcher：处理用户通过 watch 选项定义的监听器

## Watcher 基础实现

```javascript
new Watcher(vm, expOrFn, cb, options)
```

Watcher 构造函数接收四个主要参数：

- vm: Vue 实例
- expOrFn: 要监听的表达式或函数
- cb: 回调函数
- options: 配置选项

### Watcher 配置选项

```javascript
if (options) {
  this.deep = !!options.deep    // 深度监听
  this.user = !!options.user    // 用户自定义 watcher (watch)
  this.computed = !!options.computed  // 计算属性 watcher
  this.sync = !!options.sync    // 同步执行
} else {
  this.deep = this.user = this.computed = this.sync = false
}
```

### 更新机制

```javascript
update () {
  if (this.computed) {
    // 计算属性的处理逻辑
  } else if (this.sync) {
    this.run()  // 同步执行
  } else {
    queueWatcher(this)  // 异步队列
  }
}
```

## 渲染 Watcher

渲染 Watcher 在组件挂载时创建，负责触发组件的重新渲染：

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

### 依赖收集过程

渲染 Watcher 创建时会触发 pushTarget：

```javascript
export function pushTarget (_target: ?Watcher) {
  if (Dep.target) targetStack.push(Dep.target)
  Dep.target = _target
}

export function popTarget () {
  Dep.target = targetStack.pop()
}
```

响应式数据的 getter 会进行依赖收集：

```javascript
class Dep {
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
}
```

## 派发更新

当数据发生变化时，setter 会触发派发更新过程：

```javascript
class Dep {
  notify () {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

class Watcher {
  update() {
    if (this.computed) {
      // 计算属性的更新逻辑
    } else if (this.sync) { 
      this.run()  // 同步执行
    } else {
      queueWatcher(this)  // 异步队列
    }
  }
}
```

### 异步更新队列

```javascript
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
      let i = queue.length - 1
      while (i > index && queue[i].id > watcher.id) {
        i--
      }
      queue.splice(i + 1, 0, watcher)
    }
    if (!waiting) {
      waiting = true
      nextTick(flushSchedulerQueue)
    }
  }
}
```

## 计算属性 Watcher

计算属性的初始化过程：

```javascript
// 创建 watcher 实例
const watchers = vm._computedWatchers = Object.create(null)

// 遍历计算属性
for (const key in computed) {
  watchers[key] = new Watcher(
    vm,
    getter || noop,
    noop,
    computedWatcherOptions
  )
  
  // 设置响应式
  if (!(key in vm)) {
    defineComputed(vm, key, userDef)
  }
}
```

计算属性 Watcher 的特殊处理：

```javascript
class Watcher {
  constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    if (this.computed) {
      this.value = undefined
      this.dep = new Dep()
    } else {
      this.value = this.get()
    }
  }
}
```

## 工具函数

```javascript
const isDef = v => v !== undefined
```
