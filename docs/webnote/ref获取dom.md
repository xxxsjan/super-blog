# ref获取dom

## 模板引用  ref是字符串

### 获取单个

```
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



### 获取多个

https://cn.vuejs.org/guide/essentials/template-refs.html#function-refs

```
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

### 结合v-for

直接获取了结果，推荐使用

```
<div v-for="item in list" :key="item.id" ref="listRef">
        {{ item.id }}
      </div>


const list = [
  { id: 1, name: "Foo" },
  { id: 2, name: "Bar" },
  { id: 3, name: "Baz" },
];
const listRef = ref(null);// 获取的是一个ref数组，dom的话是dom，组件的话是实例


```



## 函数模板引用  ref是函数

### 获取单个多个都一样

他会多次触发，适合针对执行对应业务，收集的话注意去重

```
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



