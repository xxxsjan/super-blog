
### drawImage
三种传值
drawImage(image, dx, dy)
原图在画布上一比一绘制，直到画布边界
drawImage(image, dx, dy, dWidth, dHeight)
图片在画布dx,dy坐标开始绘制，宽 dWidth高dHeight绘制图片，图片会缩放全部绘制
drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
先裁剪图片，再放到画布上
![](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151245768.jpeg)

不清晰问题
公式：原始尺寸 = 样式尺寸 * 缩放倍率（devicePixelRatio）
原始尺寸就是canvas的width height
样式尺寸就是css width height
