<template>
  <Layout>
    <template #layout-bottom>
      <!-- 网易云外链播放器 -->
      <iframe
        width="330"
        height="86"
        frameborder="0"
        scrolling="no"
        allowtransparency="yes"
        :src="src"
        style="position: fixed; right: 0; bottom: 0; z-index: 61"
      >
      </iframe>
    </template>
  </Layout>
</template>

<script lang="ts" setup>
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";
const { page, theme, frontmatter } = useData();
const { Layout } = DefaultTheme;
const songId = "30854100";
// const src = 'https://music.163.com/outchain/player?type=2&id=167876&auto=1&height=66'
// const src =
//   "https://music.163.com/outchain/player?type=2&id=1923325275&auto=1&height=66";
// const src =
//   "https://music.163.com/outchain/player?type=2&id=1340439829&auto=1&height=66";

const src = `https://music.163.com/outchain/player?type=2&id=${songId}&auto=1&height=66`
</script>

<style scoped lang="scss"></style>
