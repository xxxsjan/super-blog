# Vue2和Vue3中的Props通信

## Vue2中的v-model实现

v-model是Vue中实现双向绑定的语法糖，在Vue2中需要通过以下方式来自定义组件的v-model：

```typescript
// 父组件
<div>
  <child v-model="pVal"></child>
</div>

// 子组件
export default {
  model: {
    prop: "pVal",
    event: "input" // 默认事件名为input
  },
  props: ['pVal'],
  methods: {
    changeVal(newVal) {
      this.$emit('input', newVal)
    }
  }
}
```

## Vue2的.sync修饰符

.sync修饰符提供了另一种实现「双向绑定」的方式，常用于对话框等需要同步状态的场景：

```typescript
// 父组件
<div>
  <child :visible.sync="dialogVisible"></child>
</div>

// 子组件
export default {
  props: ['visible'],
  methods: {
    changeVal(newVal) {
      this.$emit('update:visible', newVal)
    }
  }
}
```

## Vue3的v-model使用

Vue3中的v-model是对Vue2 v-model和.sync修饰符的统一。它提供了更灵活的自定义能力：

- 默认prop名更改为modelValue
- 支持多个v-model绑定
- 提供修饰符支持（如.capitalize、.number、.trim等）

```typescript
// 父组件
<div>
  <child 
    v-model.capitalize="pVal" 
    v-model:first-name="firstName"
    v-model:last-name="lastName"
  ></child>
</div>

// 子组件
export default {
  props: {
    modelValue: String,
    firstName: String,
    lastName: String,
    modelModifiers: {
      default: () => ({})
    },
    firstNameModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:modelValue', 'update:firstName', 'update:lastName'],
  methods: {
    changeVal(e) {
      console.log(this.modelModifiers) // { capitalize: true }
      let value = e.target.value
      if (this.modelModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1)
      }
      
      this.$emit('update:modelValue', value)
      this.$emit('update:firstName', value)
      this.$emit('update:lastName', value)
    }
  }
}
```

## Vue3 Setup语法中的Props使用

在Composition API中，我们可以使用defineProps来声明props，并通过toRef或toRefs来创建响应式引用：

```javascript
const props = defineProps({
  progress: {
    type: [Number, String],
    default: 0
  },
  modelValue: {
    type: [Number, String],
    default: 0
  }
});

// 方法1：单个prop转换为ref
const progress = toRef(props, 'progress');

// 方法2：将所有props转换为refs
const { progress } = toRefs(props);

// modelValue是v-model的默认prop名
```
