<template>
    <div id="waline"></div>
</template>

<script setup>
// https://waline.js.org/guide/get-started/#vercel-%E9%83%A8%E7%BD%B2-%E6%9C%8D%E5%8A%A1%E7%AB%AF
import { init } from '@waline/client';
import '@waline/client/dist/waline.css';
import { onMounted } from 'vue';
onMounted(() => {
    // https://waline.js.org/guide/get-started/#html-%E5%BC%95%E5%85%A5-%E5%AE%A2%E6%88%B7%E7%AB%AF
    init({
        el: '#waline',
        serverURL: 'https://waline1-ten.vercel.app',
        placeholder: '请留下你的评论...',
        avatar: 'mp',
        meta: ['nick', 'mail', 'link']
    });
});
</script>