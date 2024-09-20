# js 技巧

## 判断能不能播放

场景：视频不能自动播放的场景

```
const ctx = new AudioContext();
const canPlay = ctx.state === 'running';
ctx.close;
if(canPlay) {
 video.muted = false;
}else {
 // 展示交互 触发用户手动播放
}

```