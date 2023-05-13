# vue2
子
```css
<template>
  <div>
    <label>{{ label }}</label>
    <input :value="value" @input="updateValue($event.target.value)" />
  </div>
</template>

<script>
export default {
  name: "MyInput",
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  model: {
    prop: "value",
    event: "input",
  },
  methods: {
    updateValue(newValue) {
      this.$emit("input", newValue);
    },
  },
};
</script>

```
父
```css
<template>
  <div>
    <my-input v-model="name" label="Name" />
  </div>
</template>

<script>
import MyInput from "./MyInput.vue";

export default {
  components: {
    MyInput,
  },
  data() {
    return {
      name: "",
    };
  },
};
</script>

```
# vue3
```css
<template>
  <div>
    <label>{{ label }}</label>
    <input :value="value" @input="updateValue($event.target.value)" />
  </div>
</template>

<script>
import { defineComponent,  onMounted, ref } from "vue";

export default defineComponent({
  name: "MyInput",
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const value = ref(props.modelValue);

    onMounted(() => {
      // 在组件挂载时初始化值
      emit("update:modelValue", value.value);
    });

    const updateValue = (newValue) => {
      value.value = newValue;
      // 手动触发自定义事件
      emit("update:modelValue", newValue);
    };

    return {
      value,
      updateValue,
    };
  },
});
</script>

```
```css
<template>
  <div>
    <my-input v-model="name" label="Name" />
  </div>
</template>

<script>
import MyInput from "./MyInput.vue";
import { ref } from "vue";

export default {
  components: {
    MyInput,
  },
  setup() {
    const name = ref("");

    return {
      name,
    };
  },
};
</script>

```
