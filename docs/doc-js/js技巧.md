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





### 数组的坑 every



- `every()` 对**空数组**调用时，始终返回 `true`（因为 “所有元素都满足条件” 的逻辑在空集下成立）。
- `some()` 对**空数组**调用时，始终返回 `false`（因为 “至少有一个元素满足条件” 在空集下不成立）。