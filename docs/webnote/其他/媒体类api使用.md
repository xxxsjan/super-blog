# 媒体类api使用

## 文字朗读

```js

if ('speechSynthesis' in window) {
  var synth = window.speechSynthesis;
  var utterance = new SpeechSynthesisUtterance('您要读出的文本');
  synth.speak(utterance);
} else {
  console.error('Web Speech API 不受支持');
  // 提示用户升级或使用其他浏览器。
}


window.speechSynthesis.pause() //暂停
 
window.speechSynthesis.resume() //继续播放

window.speechSynthesis.cancel() //清除所有语音播报创建的队列

// 语速
utterance.rate = 1.4;// 设置播放语速，范围：0.1 - 10之间

// 声音种类  需要异步获取，一开始同步执行时
window.speechSynthesis.getVoices()

// 使用对应的声音

synth.voice = voices[i]

```

## 录制

源获取

```js

const stream = await navigator.mediaDevices.getUserMedia()
//设置video
video.srcObject = stream

//录制
const options = {
 audioBitsPerSecond: 128000,
 videoBitsPerSecond: 2500000,
 mimeType: isSafari ? "video/mp4" : "video/webm",
}
const mediaRecorder = new MediaRecorder(stream, options)

recordedBlobs = []
// 录制中
mediaRecorder.ondataavailable = event => {
    if (event.data && event.data.size > 0) {
        recordedBlobs.push(event.data)
    }
}
// 录制结束回调
mediaRecorder.onstop = event => {
    console.log("Recorder stopped: ", event)
}
// 开始录制
mediaRecorder.start(10)

// 下载
download() {
 const blob = new Blob(recordedBlobs, { type: "video/mp4" })
 const a = document.createElement("a")
 a.setAttribute("download", Date.now() + ".mp4")
 a.href = URL.createObjectURL(blob)
 a.click()
}
```





## 音频播放

```js
const beep = (freq, wave, duration = 1) => {
    // Older webkit/blink browsers require a prefix
    const AudioContext = window.AudioContext || window.webkitAudioContext
    // 创建音频上下文
    const audioCtx = new AudioContext()
    // 创建音频振荡器
    const oscillator = audioCtx.createOscillator()
    // 创建音量控制
    const gainNode = audioCtx.createGain()
    // 创建音频输出端
    const destNode = audioCtx.destination
    // 串联各个 node
    oscillator.connect(gainNode).connect(destNode)

    // 设置鲨鱼齿波形
    oscillator.type = wave
    // 设置振荡器频率
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime)
    oscillator.start(audioCtx.currentTime)
    oscillator.stop(audioCtx.currentTime + duration)

    // 当前时间设置音量为 0
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime)
    // 0.01 秒后音量为 1
    gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01)
    // 1 秒内声音慢慢降低
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1)

    oscillator.onended = () => {
        audioCtx.close()
    }
}

const waves = ["sine", "square", "sawtooth", "triangle"];
const dolami = ["-9", "-7", "-5", "-4", "-2", "0", "2"];

const wave = "sine"
const idx = -9
const frequency = 440 * Math.pow(2, idx / 12)
// 振荡器发声
beep(frequency, wave)

```

