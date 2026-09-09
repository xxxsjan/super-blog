# Vue3 Hooks 与指令

## v-memo 指令

v-memo 是一个性能优化指令，用于有条件地跳过子树的更新。

### 使用场景

- 当有大量静态内容需要渲染时
- 当组件重新渲染的开销较大时
- 当需要精确控制子组件更新时机时

### 使用方法

```js
// 传入依赖数组，仅当数组中的值发生变化时才会重新渲染
<div v-memo="[valueA, valueB]">
  <!-- 复杂的子树 -->
</div>

// 传入空数组时，效果等同于 v-once，永远不会重新渲染
<div v-memo="[]">
  <!-- 静态内容 -->
</div>
```

## effectScope

effectScope 是 Vue3 提供的一个强大的响应式系统 API，用于自动收集和管理副作用（如 watch、computed 等）。

### 使用场景

- 需要集中管理多个响应式副作用
- 需要手动控制副作用的生命周期
- 在组件外部使用响应式系统
- 开发可复用的组合式函数时需要清理副作用

### 基本用法

```js
const scope = effectScope()

scope.run(() => {
  // 在作用域内定义的所有响应式副作用
  // 都会被自动收集和管理
  watch(source, callback)
  watch(source2, callback2)
  watchEffect(callback3)
  const computedValue = computed(() => {})

  // 支持嵌套作用域
  // 默认情况下，父作用域停止时会同时停止子作用域
  const childScope = effectScope()
  childScope.run(() => {
    // 子作用域的副作用
  })

  // 传入 true 可以创建分离的作用域
  // 父作用域停止时不会影响该作用域
  const detachedScope = effectScope(true)
  detachedScope.run(() => {
    // 独立的作用域
  })
})

// 调用 stop 会停止该作用域内的所有副作用
// 包括 watch、computed、effectScope 等
scope.stop()
```

### 最佳实践

1. 在组合式函数中使用 effectScope 管理副作用：

```js
export function useFeature() {
  const scope = effectScope()
  
  scope.run(() => {
    // 定义响应式数据和副作用
  })

  // 提供清理函数
  return () => scope.stop()
}
```

2. 使用分离的作用域管理独立的功能模块：

```js
const moduleScope = effectScope(true)

moduleScope.run(() => {
  // 模块级别的响应式逻辑
})
```
