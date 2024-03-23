解释：在高清屏下，移动端的1px 会很粗
原因：DPR(devicePixelRatio) 设备像素比
> 拿2倍屏来说，设备的物理像素要实现1像素，而DPR=2，所以css 像素只能是 0.5。



### 方案1：直接写
border:0.5px solid #E5E5E5
### 方案2：使用图片

### 方案3：box-shadow
```javascript
box-shadow: -1px 0px 0px 0px #333, 
  0px -1px 0px 0px #333,
  0px -0px 1px 0px #333, 
  0px -0px 0px 1px #333;
```
### 方案4：伪元素
```javascript
// 1 条border
.setOnePx{
  position: relative;
  &::after{
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    background-color: #e5e5e5;
    display: block;
    width: 100%;
    height: 1px; /*no*/
    transform: scale(1, 0.5);
  }
}
// 4 条border
.setBorderAll{
     position: relative;
       &:after{
           content:" ";
           position:absolute;
           top: 0;
           left: 0;
           width: 200%;
           height: 200%;
           transform: scale(0.5);
           transform-origin: left top;
           box-sizing: border-box;
           border: 1px solid #E5E5E5;
           border-radius: 4px;
      }
    }
```
### 方案5 ：设置viewport的scale值
```javascript
<html>
  <head>
      <title>1px question</title>
      <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
      <meta name="viewport" id="WebViewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">        
      <style>
          html {
              font-size: 1px;
          }            
          * {
              padding: 0;
              margin: 0;
          }
          .top_b {
              border-bottom: 1px solid #E5E5E5;
          }

          .a,.b {
                      box-sizing: border-box;
              margin-top: 1rem;
              padding: 1rem;                
              font-size: 1.4rem;
          }

          .a {
              width: 100%;
          }

          .b {
              background: #f5f5f5;
              width: 100%;
          }
      </style>
      <script>
          var viewport = document.querySelector("meta[name=viewport]");
          //下面是根据设备像素设置viewport
          if (window.devicePixelRatio == 1) {
              viewport.setAttribute('content', 'width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no');
          }
          if (window.devicePixelRatio == 2) {
              viewport.setAttribute('content', 'width=device-width,initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no');
          }
          if (window.devicePixelRatio == 3) {
              viewport.setAttribute('content', 'width=device-width,initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no');
          }
          var docEl = document.documentElement;
          var fontsize = 32* (docEl.clientWidth / 750) + 'px';
          docEl.style.fontSize = fontsize;
      </script>
  </head>
  <body>
      <div class="top_b a">下面的底边宽度是虚拟1像素的</div>
      <div class="b">上面的边框宽度是虚拟1像素的</div>
  </body>
</html>
```
### 

