# Vue3中的ref获取DOM

## 基础模板引用

在Vue3中，我们可以使用ref来获取DOM元素或组件实例。模板引用提供了一种直接访问底层DOM元素的方式。

### 单个元素引用

```vue
<template>
  <div>
    <button ref="myButton" @click="handleClick">Click me!</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const myButton = ref(null);

    function handleClick() {
      myButton.value.style.color = 'red';
    }

    return {
      myButton,
      handleClick
    }
  }
}
</script>
```

## v-for中的模板引用

### 动态ref名称方式

通过动态拼接ref名称，可以获取v-for中的每个元素。

```vue
<template>
  <div>
    <div v-for="item in list" :key="item.id" :ref="'myRef'+item.id">{{ item.name }}</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const list = [
      { id: 1, name: 'foo' },
      { id: 2, name: 'bar' },
      { id: 3, name: 'baz' }
    ];

    const refs = {};

    onMounted(() => {
      for (let i = 0; i < list.length; i++) {
        refs['myRef' + list[i].id] = ref(null);
      }
      console.log(refs);
    });

    return {
      list,
      ...refs
    }
  }
}
</script>
```

### 数组引用方式（推荐）

使用单个ref获取所有元素的数组，这是Vue3中最简洁的方式：

```vue
<template>
  <div v-for="item in list" :key="item.id" ref="listRef">
    {{ item.id }}
  </div>
</template>

<script>
const list = [
  { id: 1, name: "Foo" },
  { id: 2, name: "Bar" },
  { id: 3, name: "Baz" },
];
const listRef = ref(null); // 获取的是一个ref数组，DOM元素或组件实例的数组
</script>
```

## 函数式ref

函数式ref允许我们在元素被挂载时执行自定义逻辑。

> 详细文档请参考：[Vue3官方文档-函数模板引用](https://cn.vuejs.org/guide/essentials/template-refs.html#function-refs)

```vue
<template>
  <div>
    <button @click="handleClick">Click me!</button>
    <my-component v-for="item in list" :key="item.id" :ref="createRef(item.id)"></my-component>
  </div>
</template>

<script>
import { ref } from 'vue';
import MyComponent from './MyComponent.vue';

export default {
  components: { MyComponent },

  setup() {
    const list = [
      { id: 1, name: 'Foo' },
      { id: 2, name: 'Bar' },
      { id: 3, name: 'Baz' }
    ];

    function createRef(id) {
      return ref(null);
    }

    function handleClick() {
      for (let i = 0; i < list.length; i++) {
        const myComponent = createRef(list[i].id).value;
        myComponent.doSomething();
      }
    }

    return {
      list,
      createRef,
      handleClick
    }
  }
}
</script>
```

注意：函数式ref会在每次组件更新时触发，适合需要即时响应元素变化的场景。如果需要收集引用，请注意去重处理。
