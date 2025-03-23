# Vue3源码实现解析

[点击查看【bilibili】](https://player.bilibili.com/player.html?bvid=BV1564y1s7s5&p=3&page=3)

## 响应式系统实现

### effect - 副作用函数

effect是Vue3响应式系统的核心，用于处理和调度副作用函数的执行。

```typescript
const effectStack = []  // 存储effect嵌套调用的栈
let activeEffect = null // 当前激活的effect

function effect(fn, options) {
  const effectFn = () => {
    try {
      fn()
      activeEffect = effectFn
      effectStack.push(activeEffect)
    } finally {
      effectStack.pop()
      activeEffect = effectStack[effectStack.length - 1]
    }
  }
  if (!options.lazy) {
    effectFn()
  }
  if (options.scheduler) {
    effectFn.scheduler = options.scheduler
  }
  return effectFn
}

// 依赖收集
const targetMap = new WeakMap()
function track(target, key) {
  let depMap = targetMap.get(target)
  if (!depMap) {
    targetMap.set(target, (depMap = new Map()))
  }
  let deps = depMap.get(key)
  if (!deps) {
    deps.set(key, activeEffect)
  } else {
    deps.add(activeEffect)
  }
}

// 触发更新
function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const deps = depsMap.get(key)
  if (!deps) return
  deps.forEach(effectFn => {
    if (effectFn.scheduler) {
      effectFn.scheduler()
    } else {
      effectFn()
    }
  })
}
```

### reactive - 响应式对象

reactive用于创建响应式对象，通过Proxy代理实现属性的响应式访问。

```typescript
function reactive(target) {
  if (!isObject(target)) {
    return
  }
  const proxy = new Proxy(target, {
    get() {},
    set() {}
  })
}
```

### ref - 响应式值

ref用于处理基本类型值的响应式，内部通过类实现get/set拦截。

```typescript
function ref(value) {
  if (isRef(value)) {
    return value
  }
  return new RefImpl(value)
}

class RefImpl {
  constructor(value) {
    this._isRef = true
    this._value = convert(value)
  }
  get value() {
    track(this, 'value')
    return this._value
  }
  set value(val) {
    if (hadChanged(val, this._value)) {
      this._value = this.convert(val)
      trigger(this, 'value')
    }
  }
}

function convert() {
  return isObject(value) ? reactive(value) : this._value
}
```

### computed - 计算属性

computed实现了计算属性的懒执行和缓存机制。

```typescript
function computed(getterOrOptions) {
  let getter, setter
  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions
    setter = () => {}
  } else {
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }
  return new ComputedImpl(getter, setter)
}

class ComputedImpl {
  constructor(getter, setter) {
    this._setter = setter
    this._value = undefined
    this._dirty = true
    this.effect = effect(getter, {
      lazy: true,
      scheduler: () => {
        if (!this._dirty) {
          this._dirty = true
          trigger(this, 'value')
        }
      }
    })
  }
  get value() {
    if (this._dirty) {
      this._value = this.effect()
      this._dirty = false
      track(this, 'value')
    }
    return this._value
  }
  set value(newVal) {
    this._setter(newVal)
  }
}
```

## 性能优化

### 位运算优化

Vue3使用位运算来提高节点类型对比的速度：

![节点类型位运算](https://cdn.nlark.com/yuque/0/2022/png/28823371/1661011868628-f37fa462-f61e-4ed1-81ef-182e70035777.png)

![位运算示例](https://cdn.nlark.com/yuque/0/2022/png/28823371/1661012007939-1381f14f-e8f4-4c03-81be-5d002dde072b.png)

## 响应式陷阱与优化

### 绕过响应式的情况

在Vue3中，由于采用Proxy实现响应式，某些操作可能会绕过响应式系统：

```javascript
// 错误示例 - Vue3
const list = [
    {name: '--'}
]

const data = ref(list.map(m => {
     fetch().then(res => {
            m.name = res.name  // 这里修改的是原始list对象，不会触发响应式更新
     })
     return m
    })
)
```

相比之下，Vue2由于使用Object.defineProperty劫持，这种情况是可以正常工作的：

```javascript
// Vue2中可以正常工作
const list = [
    {name: '--'}
]

this.data = list.map(m => {
     fetch().then(res => {
            m.name = res.name
     })
     return m
})
```

### 优化方案

在Vue3中，正确的做法是确保操作的是响应式数据：

```javascript
const list = [
    {name: '--'}
]

const data = ref(list)

for (const m of data.value) {
    fetch().then(res => {
        m.name = res.name  // 直接操作响应式数据
    })
}
```
