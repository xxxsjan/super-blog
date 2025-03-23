## 替换数组

变更方法，顾名思义，会变更调用了这些方法的原始数组。相比之下，也有非变更方法，例如 filter()、concat() 和 slice()。它们不会变更原始数组，而总是返回一个新数组。当使用非变更方法时，可以用新数组替换旧数组：

example1.items = example1.items.filter(item => item.message.match(/Foo/))

你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。幸运的是，事实并非如此。Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的启发式方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。

## `v-for` 与 `v-if` 一同使用

当它们处于同一节点，`v-if` 的优先级比 `v-for` 更高，这意味着 `v-if` 将没有权限访问 `v-for` 里的变量：

## 事件修饰符 - .passive

### 基本介绍

.passive 修饰符用于优化事件监听器的性能，特别是在处理滚动事件时。它告诉浏览器你的事件处理器不会调用 preventDefault()，从而使浏览器可以立即开始滚动，而不需要等待事件处理器完成执行。

### 使用方法

```vue
<!-- 基本用法 -->
@scroll.passive="onScroll"

<!-- 在组件中的实际应用 -->
<div class="scroll-container" @scroll.passive="handleScroll">
  <!-- 滚动内容 -->
</div>
```

### 性能优化

- 在移动端应用中特别有用，可以显著提升滚动性能
- 适用于大列表或无限滚动场景
- 建议在所有不需要阻止默认滚动行为的场景下使用

### 注意事项

- 不要在 .passive 修饰符的处理函数中使用 preventDefault()
- 与 .prevent 修饰符互斥，不能同时使用

### 元素位置受限

有些 HTML 元素，诸如 `<ul>`、`<ol>`、`<table>` 和 `<select>`，对于哪些元素可以出现在其内部是有严格限制的。而有些元素，诸如 `<li>`、`<tr>` 和 `<option>`，只能出现在其它某些特定的元素内部。

这会导致我们使用这些有约束条件的元素时遇到一些问题。例如：

```
<table>
  <blog-post-row></blog-post-row>
</table>
```

这个自定义组件 `<blog-post-row>` 会被作为无效的内容提升到外部，并导致最终渲染结果出错。我们可以使用特殊的 `[is](https://v3.cn.vuejs.org/api/special-attributes.html#is)`[attribute](https://v3.cn.vuejs.org/api/special-attributes.html#is) 作为一个变通的办法：

```
<table>
  <tr is="vue:blog-post-row"></tr>
</table>
```

## 组件注册与使用

当使用 PascalCase (首字母大写命名) 定义一个组件时，你在引用这个自定义元素时两种命名法都可以使用。也就是说 `<my-component-name>` 和 `<MyComponentName>` 都是可接受的。
注意，尽管如此，直接在 DOM (即非字符串的模板) 中使用时只有 kebab-case 是有效的。
字符串模板就是写在vue中的template中定义的模板
