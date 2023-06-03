<template>
  <div>
    <h2>Custom Component</h2>
    <button :class="$style.button" @click="count++">Increment</button>
    The count is: {{ count }}
    <Child />
  </div>
</template>

<script setup>
import { ref, provide } from "vue";
import Child from "./Child.vue";
const count = ref(0);
const userData = ref({ name: "John Doe", email: "johndoe@example.com" });
provide("userData", userData);
provide("count", count);
</script>

<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>
