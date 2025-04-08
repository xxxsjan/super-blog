<template>
  <Layout>
    <!-- src/client/theme-default/Layout.vue -->
    <template #nav-bar-title-after>
      <img v-if="!DEV" class="visitor" :src="badgeSrc" onerror="this.style.display='none'" />
    </template>
    <template #layout-bottom>
      <NeteaseMusicPlayer />
    </template>
  </Layout>
</template>

<script>
export default {
  name: "MyLayout",
};
</script>

<script setup>
import DefaultTheme from "vitepress/theme";
import NeteaseMusicPlayer from '../components/NeteaseMusicPlayer.vue'
const { Layout } = DefaultTheme;
</script>

<style scoped></style>
