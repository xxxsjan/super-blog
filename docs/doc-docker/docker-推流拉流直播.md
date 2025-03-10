### 相关文章

[利用Docker挂载Nginx-rtmp(服务器直播流分发)+FFmpeg(推流)+Vue.js结合Video.js(播放器流播放)来实现实时网络直播 - 掘金](https://juejin.cn/post/6844904132340531213)

[https://www.jianshu.com/p/16741e363a77](https://www.jianshu.com/p/16741e363a77)

## Nginx-rtmp 方案

docker pull alfg/nginx-rtmp

docker run -it -p 1935:1935 -p 8080:80 --rm alfg/nginx-rtmp

docker run -itd -p 1935:1935 -p 8080:80 --name nginx-rtmp-test alfg/nginx-rtmp

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281346654.png)

### 进入容器

docker exec -it  b0b9e286173ca sh

### 摄像头

查看设备列表：ffmpeg -list_devices true -f dshow -i dummy

video 和 audio要对应

推流：ffmpeg -f dshow -i video="lntegrated Camera":audio="Realtek(R) Audio" -tune:v zerolatency -f flv "rtmp://192.168.1.103:1935/stream/test1"

### 本地文件

先复制一个文件进容器

docker cp ./test.mp4 b0b9e286173ca7a7dfb4ecb5973d4557617c54de01059a038e0ea970dddf56b9:/home
             ![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281346731.png)
查看媒体信息

 ffprobe test.mp4
推流

ffmpeg -re -i test.mp4 -f flv rtmp://192.168.1.103:1935/stream/test

> **源文件必须是H.264+AAC编码的**

**报错**[Failed to update header with correct duration](https://zhuanlan.zhihu.com/p/124204591)

ffmpeg -re -i test.mp4  -f flv -c copy -flvflags no_duration_filesize rtmp://192.168.1.103:1935/stream/test

播放

ffplay rtmp://127.0.0.1:1935/stream/test.m3u8

ffplay rtmp://192.168.1.103:1935/stream/test.m3u8

推流

rtmp协议的默认端口是1935，如果启动容器的时候替换成了别的端口，需要在rtmp的地址后面跟上端口，除此之外，其他都一样

默认端口

ffmpeg -re -stream_loop -1 -i /home/test.mp4 -vcodec copy -acodec copy -f flv -y rtmp://127.0.0.1/live/test

自定义端口

ffmpeg -re -stream_loop -1 -i /home/test.mp4 -vcodec copy -acodec copy -f flv -y rtmp://127.0.0.1:1935/live/test

播放

默认端口

ffplay rtmp://127.0.0.1/live/test

自定义端口

ffplay rtmp://127.0.0.1:11935/live/test

### vue

 pnpm add video.js  aes-decrypter  m3u8-parser  mpd-parser   mux.js url-toolkit   videojs-contrib-hls

```vue
<template>
  <div>
    <video id="my-video" class="video-js vjs-default-skin" controls preload="auto" >
      <!-- 直播地址就是nginx映射后的播放地址，注意后缀为直播流的m3u8 -->
      <source src="http://192.168.99.100:8000/live/test.m3u8" >
      </video>
  </div>
</template>

<script>

  import videojs from 'video.js'
  import 'videojs-contrib-hls'
  import 'video.js/dist/video-js.css'

  export default {
    data () {
      return {
      }
    },
    mounted:function(){
      videojs('my-video', {
        bigPlayButton: true,
        textTrackDisplay: false,
        posterImage: true,
        errorDisplay: false,
        controlBar: true
      }, function () {
        this.play()
      })
    }
  }
</script>

<style>
</style>
```

## ffmpeg命令汇总

[https://juejin.cn/post/6844903550229676039](https://juejin.cn/post/6844903550229676039)
ffmpeg推流本地文件到服务器
-re表示实际速度
ffmpeg -re -i test.mp4 -acodec copy-vcodec copy -f flv rtmp://xxx、

### ffmpeg拉流 且 下载

-c copy保持原视频格式 ，不是rtmp协议的谨慎使用
ffmpeg -i rtmp://xxx  -c copy hks2.flv
自动转码，直接命名即可, ts后缀不对音频视频进行转码
ffmpeg -i rtmp://xxx  hks2.flv
自定义音频视频输出格式
ffmpeg -i rtmp://xxx -acodec aac -vcodec   libx264 hks2.flv

### ffmpeg推mac本地摄像头

ffmpeg -f avfoundation -video_size 1280x720 -framerate 30 -i 0:0 -vcodec libx264 -preset veryfast -f flv [http://192.168.1.103:8000/live/stream.flv](http://ip:8000/live/stream.flv)
>
> - ·-vide_size表示要输出的视频画面的分辨率尺寸
> - -f后面的参数 flv表述输出的格式，再后面的地址 [http://ip:8000/live/stream.flv](https://link.juejin.cn?target=http%3A%2F%2Fip%3A8000%2Flive%2Fstream.flv) 表示想要输出的地址，这个地址的stream.flv可以按照自己需求随意修改，保持后缀是你需要的flv格式即可

### ffmpeg查看摄像头信息

查看摄像头列表
ffmpeg -list_devices true -f dshow -i dummy
播放摄像头
ffplay -f dshow -i video="Integrated Camera"
> Integrated Camera 是通过查看列表的命令行获得的名称

查看摄像头的分辨率格式
ffmpeg -list_options true -f dshow -i video="FULL HD webcam"

### ffmpeg摄像头推流RTSP&RTMP

摄像头推流到RTMP服务
ffmpeg -f dshow -i video="USB webcam" -vcodec libx264 -acodec aac -ar 44100 -ac 1 -r 25 -s 1920*1080 -f flv rtmp://192.168.1.3/live/desktop

摄像头推流到RTSP（rtp over tcp）
ffmpeg -f dshow -i video="FULL HD webcam" -rtsp_transport tcp -vcodec libx264 -preset ultrafast -acodec libmp3lame -ar 44100 -ac 1 -r 25 -f rtsp rtsp://192.168.0.1/webcam

### ffmpeg桌面推流RTSP&RTMP

windows桌面推流到RTMP服务
ffmpeg -f gdigrab -i desktop -vcodec libx264 -preset ultrafast -acodec libmp3lame -ar 44100 -ac 1 -r 25 -s 1920*1080 -f flv rtmp://192.168.1.3/live/desktop

windows桌面推流到RTSP服务（rtp over udp）
ffmpeg -f gdigrab -i desktop -vcodec libx264 -preset ultrafast -acodec libmp3lame -ar 44100 -ac 1 -r 25 -f rtsp rtsp://192.168.0.1/desktop

### ffmpeg基本推拉流命令

RTMP推流
ffmpeg -re -i input.flv -f flv -r 25 -s 1920*1080 -an "rtmp://192.168.0.200/live/test"
RTSP拉流转RTMP推流
ffmpeg -rtsp_transport tcp -i "rtsp://admin:12345678@192.168.0.2" -f flv -c:v copy -a:v copy -r 25 -s 1920*1080 "rtmp://192.168.0.200/live/test"
本地视频文件RTSP推流 （tcp）
ffmpeg -re -i input.mp4 -rtsp_transport tcp -vcodec h264 -acodec copy -f rtsp rtsp://localhost/test
本地视频文件RTSP推流 （udp）
ffmpeg -re -i input.mp4 -rtsp_transport udp -vcodec h264 -acodec copy -f rtsp rtsp://localhost/test
RTSP拉流并播放 （tcp）
ffplay -i -rtsp_transport tcp rtsp://localhost/test
RTSP拉流并播放 （udp）
ffplay -i rtsp://localhost/test

### 剪切视频

ffmpeg -i "input.mp4" -vcodec copy -acodec copy -ss 00:02:00 -t 00:01:00  "output.mp4"

## SRS方案

#### 文章

[使用srs进行webrtc推流体验！](https://zhuanlan.zhihu.com/p/458504251)
[Docker | SRS](https://ossrs.net/lts/zh-cn/docs/v4/doc/getting-started)
[Docker 实战系列之 SRS 流媒体服务器_=蜗牛=的博客-CSDN博客_docker srs](https://blog.csdn.net/u011374856/article/details/107332309/)
docker pull ossrs/srs

## docker+srs

[https://www.jianshu.com/p/acb4f2af44b5](https://www.jianshu.com/p/acb4f2af44b5)
[https://juejin.cn/post/6844904020168065037](https://juejin.cn/post/6844904020168065037)

#### 拉取镜像

docker pull ubuntu:18.04
d盘映射，linux环境则正常写就行
docker run  --name srs -v /d/srs/files:/root/files -d -i  -p 1935:1935  ubuntu:18.04
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281347190.png)
查看容器列表：docker ps
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281347465.png)
进入指定容器：docker exec -it srs bash
（srs为上面步骤设置的容器名，或者使用容器id，容器id也不一定要粘贴全，取钱了十个字母也是可以的）
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281347488.png)

下载慢或者下载出问题，多半是源有问题，
设置源：
[https://www.yuque.com/yuqueyonghudteckj/nws0pf/fe4836](https://www.yuque.com/yuqueyonghudteckj/nws0pf/fe4836)

####

#### 更新软件

apt **update**
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281347703.png)

#### 安装依赖

apt install -y git gcc g++ unzip make  python
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281347047.png)
g++报错
[https://blog.csdn.net/weixin_43894075/article/details/115141599](https://blog.csdn.net/weixin_43894075/article/details/115141599)

#### 安装srs

cd /home && git clone [https://gitee.com/songboy/srs.git](https://gitee.com/songboy/srs.git)
查看目录
cd  /home/srs/trunk/  && ls
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281347199.png)

#### 编译

cd /home/srs/trunk/ && ./configure && make
回车后直接刷屏
不要慌，等~
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281347099.png)

#### 启动

上图有提示
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281347647.png)
cd /home/srs/trunk/ && ./objs/srs -c conf/srs.conf
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281347496.png)

#### obs推流测试

rtmp://127.0.0.1/live/ikun
 ![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281347477.png)

#### 拉流测试

ffplay rtmp://127.0.0.1/live/ikun
ffplay rtmp://127.0.0.1/live/ikun -an
-an 静音，不然很吵
ffplay命令

```vue
-x width    强制显示宽带。
-y height    强制显示高度。
-s size    帧尺寸 设置显示帧存储(WxH格式)，仅适用于类似原始YUV等没有包含帧大小(WxH)的视频。该参数已经被废弃，请尝试用-video_size代替
-fs    以全屏模式启动。
-an    禁用音频（不播放声音）
-vn    禁用视频（不播放视频）
-sn    禁用字幕（不显示字幕）
-ss pos    根据设置的秒进行定位拖动，注意时间单位：比如'55' 55 seconds, '12:03:45' ,12 hours, 03 minutes and 45 seconds, '23.189' 23.189 second
-t duration    设置播放视频/音频长度，时间单位如 -ss选项
-bytes    按字节进行定位拖动。
-seek_interval interval    自定义左/右键定位拖动间隔（以秒为单位），默认值为10秒
-nodisp    关闭图形化显示窗口，视频将不显示
-noborder    无边框窗口
-volume vol    设置起始音量。音量范围[0 ~100]
-f fmt    强制使用设置的格式进行解析。比如-f s16le
-window_title title    设置窗口标题（默认为输入文件名）
-loop number    设置播放循环次数
-showmode mode    设置显示模式，可用的模式值：0 显示视频，1 显示音频波形，2 显示音频频谱。缺省为0，如果视频不存在则自动选择2
-vf filtergraph    设置视频滤镜
-af filtergraph    设置音频滤镜
```

## nodemedia方案

[前端如何实现整套视频直播技术流程 - 掘金](https://juejin.cn/post/6844904071053180935)
docker 安装 Ubuntu
> linux下载nodemediaserver压缩包地址 [https://www.nodemedia.cn/doc/web/#/5?page_id=11](https://www.nodemedia.cn/doc/web/#/5?page_id=11)

docker run -itdp 8000:8000 --name ubuntu-nodemediaserver ubuntu
docker build -t ubuntu-nms .

```bash
FROM ubuntu:18.04
RUN apt-get update && apt-get install -y sudo && apt-get install wget -y
```

docker run -itdp 8000:8000 --name ubuntu-nodemediaserver ubuntu-nms

下载：wget <https://cdn.nodemedia.cn/nms/3.18.0/nms-linux-amd64-v3.18.0-20221031.tar.gz>
解压：tar -zxvf nms-linux-amd64-v3.18.0-20221031.tar.gz

解压后 : cd nms-linux-amd64   &&  ./nms

- 在控制台输入./nms运行
- 在当前程序目录下执行sudo ./service.sh install安装服务并自动运行
- 在当前程序目录下执行sudo ./service.sh uninstall停止并卸载服务å

[systemctl command not found_nachifur的博客-CSDN博客](https://blog.csdn.net/superjunenaruto/article/details/105399039)
apt-get install --reinstall systemd
apt-get install ssh
systemctl enable ssh
[解决 System has not been booted with systemd as init system (PID 1). Can‘t operate._duapple的博客-CSDN博客](https://blog.csdn.net/duapple/article/details/125194979)
[docker 报错Failed to connect to bus: Host is down](https://blog.csdn.net/zhangyuhaifa/article/details/119756642)
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281347759.png)

`http://localhost:8000`

ffmpeg推流到8000
ffmpeg -f avfoundation -video_size 1280x720 -framerate 30 -i 0:0 -vcodec libx264 -preset veryfast -f flv [http://192.168.1.103:8000/live/stream.flv](http://ip:8000/live/stream.flv)
>
> - ·-vide_size表示要输出的视频画面的分辨率尺寸
> - -f后面的参数 flv表述输出的格式，再后面的地址 [http://ip:8000/live/stream.flv](https://link.juejin.cn?target=http%3A%2F%2Fip%3A8000%2Flive%2Fstream.flv) 表示想要输出的地址，这个地址的stream.flv可以按照自己需求随意修改，保持后缀是你需要的flv格式即可

## 拓展：windows安装ffmpeg
>
> ffmpeg可以做很多东西，剪辑压缩转格式什么的，但要敲命令
> 也可以拉流播放各种协议格式的视频，拿来测试很不错
> 更多功能我没涉及，说的可能片面了

[https://www.bilibili.com/video/BV1oY41137AA?p=2&vd_source=11e14f37a256537712e73b4b7f52411c](https://www.bilibili.com/video/BV1oY41137AA?p=2&vd_source=11e14f37a256537712e73b4b7f52411c)
官网 [http://www.ffmpeg.org/download.html](http://www.ffmpeg.org/download.html)
不要下源码，下build
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281349559.png)
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281347468.png)
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281349528.png)

其实加个环境变量就行
用户和系统的path都加上，都加上
C:\Program Files\ffmpeg\bin
添加之前要把压缩包bin移到你加的路径上，不然找不到路径，添加了也白添加

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281354541.png)

命令行执行ffmpeg -version即可看到版本号

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281354952.png)

#### 剪切视频命令

ffmpeg -i 1111.mp4 -ss 00:00:20 -t  00:00:10  -vcodec copy -acodec copy output.mp4
> -ss 开始时间
> -t 持续时间
> -vcodec 输出的视频编码，copy为使用源格式
> -acodec 输出的音频编码，copy为使用源格式

![](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281347156.webp)
