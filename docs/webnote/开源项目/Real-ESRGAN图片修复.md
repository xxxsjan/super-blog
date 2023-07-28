## Real-ESRGAN图片修复 

## 准备

### 安装ffmpeg

https://ffmpeg.org/download.html

下载windows软件 

安装

添加bin文件夹的路径到环境变量

![image-20230722181144582](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307221811730.png)

![image-20230724105547020](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307241057115.png)

### 安装Real-ESRGAN

#### realesrgan介绍

https://github.com/xinntao/Real-ESRGAN#portable-executable-files-ncnn

windows下载可执行文件---Portable executable files (NCNN)

基础使用

```javascript
./realesrgan-ncnn-vulkan.exe -i input.jpg -o output.png -n [model_name]
```

4个 models:

1. realesrgan-x4plus（默认）
2. reaesrnet-x4plus
3. realesrgan-x4plus-anime（针对动漫插画图像优化，有更小的体积）
4. realesr-animevideov3 (针对动漫视频)

#### 下载可执行文件

releases里找到0.2.5版本下载

已包含模型

![image-20230722181436791](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307221814654.png)





## 开始

### ffmpeg获取图片

realesrgan安装目录下新建tmp_frames文件夹

```
ffmpeg -i onepiece_demo.mp4 -qscale:v 1 -qmin 1 -qmax 1 -vsync 0 tmp_frames/frame%08d.png

-i onepiece_demo.mp4：这指定了输入文件名和格式。在这种情况下，输入文件是一个 MP4 视频文件，文件名为 onepiece_demo.mp4。

-qscale:v 1：这指定了视频质量等级，值为 1 表示最高质量。这个选项用于控制视频编码器的压缩质量。

-qmin 1：这指定了压缩质量的最小值，值为 1。这个选项用于控制视频编码器在压缩过程中的最小质量水平。

-qmax 1：这指定了压缩质量的最大值，值为 1。这个选项用于控制视频编码器在压缩过程中的最大质量水平。

-vsync 0：这禁用了视频同步。这个选项用于控制如何同步视频帧和音频帧。

tmp_frames/frame%08d.png：这指定了输出图像序列的模式。%08d 是帧数的占位符，用零填充到 8 位数字。图像序列将被保存在 tmp_frames 目录中，文件名前缀为 frame，后跟帧号和 .png 文件扩展名。
```

执行之后tmp_frames会有每一帧的图片

创建 out_frames 文件夹 作为 输出图片的位置

```
./realesrgan-ncnn-vulkan.exe -i tmp_frames -o out_frames -n realesr-animevideov3 -s 2 -f jpg

-i tmp_frames：这指定了输入图像序列的目录。在这个命令中，输入图像序列保存在 tmp_frames 目录中。

-o out_frames：这指定了输出图像序列的目录。在这个命令中，处理后的图像序列将保存在 out_frames 目录中。

-n realesr-animevideov3：这指定了要使用的 RealESRGAN 模型。在这个命令中，使用的是 realesr-animevideov3 模型，这是一个专门用于处理动画视频的模型。

-s 2：这指定了超分辨率处理的比例因子。在这个命令中，比例因子为 2，意味着输出图像的尺寸将是输入图像的两倍。

-f jpg：这指定了输出图像序列的文件格式。在这个命令中，输出图像将被保存为 JPEG 格式的图像文件。
```



### 重新生成视频



先知道源视频的帧率 `ffmpeg -i onepiece_demo.mp4`

然后根据帧率输入相关ffmpeg命令

```
ffmpeg -r 23.98 -i out_frames/frame%08d.jpg -c:v libx264 -r 23.98 -pix_fmt yuv420p   output.mp4

-r 23.98：这将输入帧速率设置为 23.98 帧每秒。这是电影和视频制作中常用的帧速率。

-i out_frames/frame%08d.jpg：这指定了输入图像序列的模式。%08d 是帧数的占位符，用零填充到 8 位数字。图像序列位于 out_frames 目录中，文件名前缀为 frame，后跟帧号和 .jpg 文件扩展名。

-c:v libx264：这将视频编解码器设置为 libx264，这是一种广泛使用的 H.264 编码视频编解码器。

-r 23.98：这将输出帧速率设置为 23.98 帧每秒。

-pix_fmt yuv420p：这将像素格式设置为 yuv428p，这是一种 4:2:2 色度子采样格式。这意味着在水平方向上，每 2 个像素只有 1 个垂直方向上的像素包含颜色信息。相对于其他子采样格式，这可以提供更高的图像质量。

output.mp4：这指定了输出文件名和格式。在这种情况下，输出文件将是一个 MP4 视频文件。
```

