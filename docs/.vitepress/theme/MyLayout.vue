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
import crawlerConfig from '../../../crawlerConfig.json'
const { Layout } = DefaultTheme;
const DEV = import.meta.env.MODE === 'development';

const start_urls = crawlerConfig?.start_urls[0]

const origin = start_urls && new URL(start_urls)?.origin

const badgeSrc = `https://visitor-badge.laobi.icu/badge?page_id=${origin}`
</script>

<style scoped></style>
