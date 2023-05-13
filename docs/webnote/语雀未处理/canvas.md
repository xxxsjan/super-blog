
### drawImage
三种传值
drawImage(image, dx, dy)
原图在画布上一比一绘制，直到画布边界
drawImage(image, dx, dy, dWidth, dHeight)
图片在画布dx,dy坐标开始绘制，宽 dWidth高dHeight绘制图片，图片会缩放全部绘制
drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
先裁剪图片，再放到画布上
![](https://cdn.nlark.com/yuque/0/2023/jpeg/28823371/1677121855491-7f2897dc-a84a-47b1-9966-d9b2d0ac4175.jpeg#averageHue=%23ededeb&clientId=u437657df-9c56-4&from=paste&id=u4d347769&originHeight=290&originWidth=300&originalType=url&ratio=1.25&rotation=0&showTitle=false&status=done&style=none&taskId=u272906dc-f694-465c-965d-48a58bb003f&title=)

不清晰问题
公式：原始尺寸 = 样式尺寸 * 缩放倍率（devicePixelRatio）
原始尺寸就是canvas的width height
样式尺寸就是css width height
