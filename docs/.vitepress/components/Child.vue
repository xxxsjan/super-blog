<template>
  <div>{{ count }}</div>
</template>

<script setup>
import { inject } from "vue";
const userData = inject("userData");
const count = inject("count");
</script>
