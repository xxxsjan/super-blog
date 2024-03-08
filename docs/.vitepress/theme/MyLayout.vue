<template>
  <Layout>
    <template #layout-bottom>
      <!-- 网易云外链播放器 -->
      <div :class="{ 'iframe-container': true, hidden: !show }">
        <div class="prefix" @click="show = !show">
          <img :src="svgSrc" alt="" />
        </div>
        <iframe
          width="330"
          height="86"
          frameborder="0"
          scrolling="no"
          allowtransparency="yes"
          :src="src"
        >
        </iframe>
      </div>
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
import { useData } from "vitepress";
import { ref, watch } from "vue";
const data = useData();
// console.log("data: ", data);

const { Layout } = DefaultTheme;
const songId = "30854100";
const svgSrcMap = {
  black: "/svg/right.svg",
  white: "/svg/right-white.svg",
};
const svgSrc = ref(svgSrcMap["black"]);

const show = ref(true);
// const src = 'https://music.163.com/outchain/player?type=2&id=167876&auto=1&height=66'
// const src =
//   "https://music.163.com/outchain/player?type=2&id=1923325275&auto=1&height=66";
// const src =
//   "https://music.163.com/outchain/player?type=2&id=1340439829&auto=1&height=66";

const src = `https://music.163.com/outchain/player?type=2&id=${songId}&auto=0&height=66`;

watch(
  () => data.isDark.value,
  (val) => {
    svgSrc.value = val ? svgSrcMap["white"] : svgSrcMap["black"];
  }
);
</script>

<style scoped>
.iframe-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 61;

  transition: all 1s;
  transform: translateX(0px);
}
.iframe-container .prefix {
  width: 20px;
  height: 20px;
  /* background-image: url("/svg/right.svg"); */
  /* background-size: contain; */
  /* background-repeat: no-repeat; */
  transition: all 0.5s;
  transform: rotate(0deg);
}
.prefix img {
  animation: float 2s ease-in-out infinite;
  object-fit: contain;
}
@keyframes float {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(10px, 0px);
  }
  100% {
    transform: translate(0, 0);
  }
}

.iframe-container.hidden {
  transform: translateX(300px);
}
.iframe-container.hidden .prefix {
  transform: rotate(180deg);
}
</style>
