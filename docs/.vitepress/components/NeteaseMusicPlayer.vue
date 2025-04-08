<template>
    <div :class="{ 'iframe-container': true, hidden: !show }">
        <div class="prefix" @click="show = !show">
            <img :src="svgSrc" alt="" />
        </div>
        <iframe width="330" height="86" frameborder="0" scrolling="no" allowtransparency="yes" :src="src">
        </iframe>
    </div>
</template>

<script>
export default {
    name: "NeteaseMusicPlayer",
};
</script>

<script setup>
import { useData } from "vitepress";
import { ref, watch } from "vue";
import crawlerConfig from '../../../crawlerConfig.json'

const data = useData();

const svgSrcMap = {
    black: "/svg/right.svg",
    white: "/svg/right-white.svg",
};
const svgSrc = ref(svgSrcMap["black"]);

const show = ref(true);

// const songId = "1923325275";// 只因你太美（狂放版）
// const songId = "167876"; // 有何不可
const songId = "28285736"; // 周柏豪 传闻


const src = `//music.163.com/outchain/player?type=2&id=${songId}&auto=1&height=66`;
console.log("src: ", src);

watch(
    () => data.isDark.value,
    (val) => {
        svgSrc.value = val ? svgSrcMap["white"] : svgSrcMap["black"];
    }
);


const DEV = import.meta.env.MODE === 'development';

const start_urls = crawlerConfig?.start_urls[0]

const origin = start_urls && new URL(start_urls)?.origin

const badgeSrc = `https://visitor-badge.laobi.icu/badge?page_id=${origin}`


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