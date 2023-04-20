# 源码分析

## 初始化Vue

new Vue()

```typescript
"dev": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:full-dev",
```

### Vue

```javascript
function Vue(options) {
  if (__DEV__ && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 初始化
  this._init(options)
}
```

### this._init 

```typescript
export function initMixin(Vue: typeof Component) {
  Vue.prototype._init = function (options?: Record<string, any>) {
    const vm: Component = this
    // 设置组件的uid，每个组件都不一样
    vm._uid = uid++


    // 性能检测相关代码，标记开始
    let startTag, endTag
    if (__DEV__ && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // 方便判断当前是vue实例的标志，后续不用instanceOf判断
    vm._isVue = true
    // 避免被观察
    vm.__v_skip = true
    
    // effect scope
    vm._scope = new EffectScope(true /* detached */)
    vm._scope._vm = true
    
    // 合并options
    if (options && options._isComponent) {
      // 优化内部组件的实例化过程，因为动态选项合并非常缓慢，而且不需要对任何内部组件选项进行特殊处理
      initInternalComponent(vm, options as any)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor as any),
        options || {},
        vm
      )
    }

    // 如果是开发环境，就创建代理对象代理组件，不是的话自身就是自己的代理对象
    // 代理对象的作用是将组件实例内部的属性和方法进行封装，以便在访问时可以进行一些额外的处理
    if (__DEV__) {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // 存一份当前的实例
    vm._self = vm
    // 初始化组件实例生命周期
    initLifecycle(vm)
    // 初始化组件实例事件
    initEvents(vm)
    // 初始化组件实例渲染
    initRender(vm)
    // 生命周期beforeCreate的执行时机
    callHook(vm, 'beforeCreate', undefined, false /* setContext */)
    // 初始化注入属性  在data/props之前
    initInjections(vm) 
    // 初始化data props
    initState(vm)
    // 初始化提供属性 在data/props之后
    initProvide(vm) 
    // 生命周期created的执行时机
    callHook(vm, 'created')

    // vue框架做性能检测的相关代码  标记结束
    if (__DEV__ && config.performance && mark) {
      // 将当前组件实例的名称格式化为字符串，并将其存储到 _name 属性中
      vm._name = formatComponentName(vm, false)
      // 记录一个结束标记  
      mark(endTag)  
      // 计算组件实例初始化所消耗的时间 startTag 和 endTag 分别代表开始和结束的标记名称
      measure(`vue ${vm._name} init`, startTag, endTag)
    }
		// 如果设置了el，就挂载
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}
```

## 初始化详解

### initLifecycle 生命周期

initLifecycle(vm) 是 Vue.js 中一个初始化组件实例生命周期的函数。该函数的作用是为组件实例 vm 设置一些生命周期相关的属性和方法，以便在组件的不同阶段进行相应的处理。

具体来说，initLifecycle(vm) 函数主要包含以下几个步骤：

1. 初始化 $parent 属性：设置当前组件实例的父组件实例。
2. 初始化 $root 属性：设置当前组件实例所在的根组件实例。
3. 初始化 $children 属性：设置当前组件实例的子组件实例列表。
4. 初始化 _isMounted 属性：设置当前组件实例是否已经挂载到 DOM 上的标志位。
5. 初始化 _isDestroyed 属性：设置当前组件实例是否已经被销毁的标志位。
6. 初始化 _isBeingDestroyed 属性：设置当前组件实例是否正在被销毁的标志位。
7. 定义 $destroy() 方法：用于销毁当前组件实例及其所有子组件。

总之，initLifecycle(vm) 函数是 Vue.js 组件生命周期管理的重要部分，它通过设置一些特定的属性和方法，为组件的各个生命周期阶段提供了必要的支持和功能。这些属性和方法包括了父子组件关系、DOM 挂载状态、销毁状态等方面，能够帮助开发者更加方便地管理和维护组件实例的生命周期。



### initEvents

initEvents(vm) 是 Vue.js 中一个初始化组件实例事件相关的函数。该函数的作用是为组件实例 vm 设置一些事件相关的属性和方法，以便在组件的事件处理过程中进行相应的处理。

具体来说，initEvents(vm) 函数主要包含以下几个步骤：

1. 初始化 _events 属性：定义一个空对象，用于存储组件实例的事件监听器列表。
2. 定义 $on() 方法：用于添加事件监听器。
3. 定义 $once() 方法：用于添加只执行一次的事件监听器。
4. 定义 $off() 方法：用于移除事件监听器。
5. 定义 $emit() 方法：用于触发指定的事件并调用相应的事件监听器。

总之，initEvents(vm) 函数是 Vue.js 组件事件管理的重要部分，它通过设置一些特定的属性和方法，为组件的事件处理提供了必要的支持和功能。这些属性和方法包括了事件监听器列表、事件添加和移除、事件触发等方面，能够帮助开发者更加方便地管理和维护组件实例的事件机制。



### initRender

initRender(vm) 是 Vue.js 中一个初始化组件实例渲染相关的函数。该函数的作用是为组件实例 vm 设置一些渲染相关的属性和方法，以便在组件的模板编译和渲染过程中进行相应的处理。

具体来说，initRender(vm) 函数主要包含以下几个步骤：

1. 定义 $vnode 属性：设置当前组件实例对应的虚拟节点（VNode）。
2. 定义 _vnode 属性：设置当前组件实例上一次渲染生成的虚拟节点。
3. 定义 $slots 属性：通过解析插槽内容，生成一个对象，用于存储当前组件实例的插槽信息。
4. 定义 $scopedSlots 属性：用于存储当前组件实例的作用域插槽信息。
5. 定义 $createElement() 方法：用于创建虚拟节点。

总之，initRender(vm) 函数是 Vue.js 组件模板渲染管理的重要部分，它通过设置一些特定的属性和方法，为组件的模板编译和渲染提供了必要的支持和功能。这些属性和方法包括了虚拟节点、插槽解析、作用域插槽等方面，能够帮助开发者更加方便地管理和维护组件实例的模板渲染过程。



### initInjections

initInjections(vm) 是 Vue.js 在初始化组件实例时调用的一个方法，它的作用是初始化注入属性。

在 Vue.js 中，注入属性是指自动将祖先组件中指定的数据或方法注入到当前组件的特定选项中。具体而言，就是在祖先组件中通过 provide 选项提供注入属性，在子组件中通过 inject 选项接收这些注入属性。

在 initInjections(vm) 方法中，Vue.js 会根据当前组件的配置选项中是否定义了 inject 选项来决定是否需要初始化注入属性。如果存在 inject 选项，则遍历该选项中的所有属性，在祖先组件的 provide 中查找相应的属性值，并将其注入到当前组件的对应属性中。

最终，initInjections(vm) 方法返回一个对象，包含了所有初始化后的注入属性。这些属性可以在组件实例中通过 this 访问到。

### initState

initState(vm) 是 Vue.js 在初始化组件实例时调用的一个方法，它的作用是初始化组件状态数据。

在 initState(vm) 方法中，Vue.js 会首先从组件实例的配置选项中获取 data 属性值。如果该属性是一个函数，则调用它，并将返回值作为组件的状态数据；如果是一个对象，则直接使用它作为组件的状态数据。

接着，Vue.js 会将组件的状态数据与其它选项合并，包括计算属性、方法、观察者等。最终，组件的状态数据会被添加到组件实例上，并且可通过 this 访问到。

在 Vue.js 中，组件状态数据的设计思想是“响应式”的，也就是说一旦状态数据发生变化，相关的视图会自动更新。这个特性是通过 Vue.js 的响应式系统来实现的。在 initState(vm) 方法中，Vue.js 会使用 Object.defineProperty() 和数组变异方法来对状态数据进行响应式处理。

总之，initState(vm) 方法是 Vue.js 初始化组件状态数据的核心方法，它为 Vue.js 的响应式系统提供了必要的基础。







## EffectScope 的源码实现

EffectScope 类的实现中，使用 reactive 创建了一个响应式的 source 对象，用于存储所有在该副作用范围内创建的 effect。在构造函数中，通过 watchEffect 监听 source 对象的变化，以便在对象改变时销毁 effect。

createEffect 方法用于在 EffectScope 范围内创建新的 effect。它接收一个回调函数 fn，该函数会被传入一个 onCleanup 参数，用于在 effect 被销毁时执行清理操作。在 createEffect 方法中，使用 watchEffect 创建一个新的 effect，并将其添加到 source 对象上。然后返回执行结果。

stop 方法用于停止该副作用范围内的所有 effect。它依次停止 source 对象上的所有 effect，并清空 source 对象。最后停止监视 source 对象。

总体来说，EffectScope 的实现非常简单，但却能够很好地帮助我们控制组件内的副作用。

```typescript
import { reactive, watchEffect } from 'vue'

export class EffectScope {
  private stop?: () => void
  private readonly source = reactive({})

  constructor() {
    // 在构造函数中，监视 source 对象的变化，以便在对象改变时销毁 effect
    this.stop = watchEffect(() => {
      // do nothing
    }, {
      flush: 'sync',
      onTrigger: null,
      onStop: null
    })
  }

  createEffect<T>(fn: (onCleanup: (fn: () => void) => void) => T): T {
    let result!: T

    // 在 createEffect 方法中，使用 stopWatchEffect 创建一个新的 effect，并将其添加到 source 对象上
    const stopWatchEffect = watchEffect((onInvalidate) => {
      result = fn(onInvalidate)
    }, {
      flush: 'post',
      onTrigger: null,
      onStop: null
    })

    // 添加新的 effect 到 source 对象
    this.source[result as any] = stopWatchEffect

    // 返回执行结果
    return result
  }

  stop() {
    // 调用 stop 方法时，依次停止 source 对象上的所有 effect，并清空 source 对象
    for (const key in this.source) {
      this.source[key].stop()
      delete this.source[key]
    }

    // 停止监视 source 对象
    this.stop?.()
    this.stop = undefined
  }
}
```