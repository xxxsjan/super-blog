### vue2实现v-model
```typescript
// 父
<div>
  <child v-model="pVal"></child>
</div>

// 子
export default {
  model: {
    prop: "pVal",
    event: "input",// 默认就是input
  },
  props:['pVal'],
  methods:{
    changeVal(newVal){
      this.$emit('input',newVal)
    }
  }
}

```
### vue2使用.sync
```typescript
// 父
<div>
  <child :visible.sync="dialogVisible"></child>
</div>

// 子
export default {
  props:['visible'],
  methods:{
    changeVal(newVal){
      this.$emit('update:visible',newVal)
    }
  }
}
```
### vue3使用v-model 
其实就是整合了vue2的sync修饰
v-model默认是叫modelValue
xxxModifiers就是你加了修饰符的话，他能读到，.capitalize .number .trim
子组件可以知道上级设置了上面，从而在自己对应的Modifiers看到
```typescript
// 父
<div>
  <child 
    v-model.capitalize="pVal" 
    v-model:first-name="firstName"
    v-model:last-name="lastName"
></child>
</div>

// 子
export default {
  props: {
    modelValue:String,
    firstName: String,
    lastName: String,
    modelModifiers: {
      default: () => ({})
    },
    firstNameModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:modelValue','update:firstName', 'update:lastName'],
  methods:{
  changeVal(e){
    
    console.log(this.modelModifiers) // { capitalize: true }
    let value = e.target.value
    if (this.modelModifiers.capitalize) {
      // 知道了修饰符，就可以做一些处理
        value = value.charAt(0).toUpperCase() + value.slice(1)
      }
    
    this.$emit('update:modelValue', e.target.value)
    this.$emit('update:firstName', e.target.value)
    this.$emit('update:lastName', e.target.value)
  }
}
}
```

vue3 setup 使用
```javascript
const props = defineProps({
  progress: {
    type: [Number, String],
    default: 0,
  },
  modelValue: {
    type: [Number, String],
    default: 0,
  },
});
// 方法1：
const progress = toRef(props, 'progress');
// 方法2：
const { progress } = toRefs(props);

// setup的直接用就行

modelValue 就是v-model的默认名字
```
