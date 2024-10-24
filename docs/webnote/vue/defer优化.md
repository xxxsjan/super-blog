# defer优化白屏

使用

```vue
<template>
 第10帧开始渲染
 <heavy-com v-if="defer(10)"></heavy-com>
</template>

<script>
    function useDefer(maxFrameCOunt = 1000){
        const frameCount = ref(0);
        const refreshFrameCOunt = function(){
            requestAnimationFrame(()=>{
                frameCount.value ++
                if(frameCount.value< maxFrameCOunt){
                    refreshFrameCOunt()
                }
            })
        }
        refreshFrameCOunt()
        return fucntion(showInFrameCount){
            return frameCount.value >= showInFrameCount
        }
    }
const defer = useDefer()
</script>



```
