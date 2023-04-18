# vue使用jsx

https://juejin.cn/post/7114063575122984973

## 事件修饰符

```
import { withModifiers, defineComponent, ref } from 'vue'

const App = defineComponent({
  setup() {
    const count = ref(0);

    const inc = () => {
      count.value++;
    };

    return () => (
      <div onClick={ withModifiers(inc, ['self']) }>{ count.value }</div>
    );
  },
})
```

> 注意：Vue模板中ref变量是可以直接解构的，但是在jsx中不行，需要记得添加`.value`，比如上面的`{ count.value }`。

## v-model:xxx

SX中不能直接用`v-model:visible`的语法，需要传入一个数组`[menuShow.value, 'visible']`，数组的第二个参数就是要绑定的自定义名称。

```
<d-flexible-overlay v-model={[menuShow.value, 'visible']}></d-flexible-overlay>

<d-flexible-overlay v-model:visible="menuShow"></d-flexible-overlay>
```

## slot 插槽

```
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props, { slots }) { // 逻辑
    return () => {
      return <button>{ slots.default?.() }</button>
    }
  },
})

还可以使用renderSlot方法：
import { renderSlot } from 'vue'

<button>
  { renderSlot(slots, 'default') }
</button>

```

### Scoped Slots 作用域插槽

### vue

```
<d-tree :data="data">
  <template #mySlot="item">
    <IconOpen v-if="item.open" />
    <IconClose v-else />
  </template>
</d-tree>
 
```

### jsx

```
// 1 
<d-tree data={data}>
  {{
    mySlot: (item) => (item.open ? <IconOpen /> : <IconClose />),
  }}
</d-tree>

// 2 或者使用renderSlot方法，第三个参数就是要传给插槽的参数：
import { renderSlot, useSlots } from 'vue'

<button>
  { renderSlot(useSlots(), 'mySlot', item) }
</button>

```

## v-bind

```
<div v-bind="properties"></div>

<div {...properties}></div>
```

## class

```
import styles from './index.module.scss'

<div class={styles.wrap}></div>
```

