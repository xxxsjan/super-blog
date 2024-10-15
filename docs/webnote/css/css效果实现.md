# 实现0.5px边框

利用scale只放大content width的特点，从而实现border的缩小two

```html
<div class="box two"></div>
<style>
  .box{
    width:200px;
    height:200px;

  }
  .box.two::after{
    position:absolude;
    left:0;
    top:0;
    border:1px solid #333;

  }
  @media (-webkit-min-device-pixel-radio:2){
    .box.two::after{
      width:200%;
      height:200%;
      tranform:scale(0.5)
    }
  }
</style>
```

# toast居中

```javascript
position:fixed;
width:fit-content;
inset-inline:1rem;
margin-inline:auto;

等价于
position:fixed;
width:fit-content;
left:1rem;
right:1rem;
margin-left:auto;
margin-right:auto;
```

 width:fit-content能在不改变元素display属性Q的的同时使其具有行内框的某些特性，如包裹内容以自适应内容宽度。如果是max-content就是在一行中尽量多的显示内容。min-content是最小内容宽度，如果是中文就是一个中文字符的宽度。

inset-inline 、margin-inline是逻辑css

# max-length过渡问题

两个方案

# ![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304232111246.png)![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304232111018.png)

## 滚动背景切换

```typescript
parent:
scroll=snap-type: y mandatory;

child:
scroll-snap-align:start
```

## css立体效果 透视效果

### 开启3d

使用了fransform(即 rotate scale这些)的元素上加

**活动的元素加：**transform-style:preserve-3d

注意：

假如子元素使用绝对定位

由于子元素已经使用了transform-style开启了3d

所以绝对定位的相对的就是父级

不需要再设置position:reactive

### 立体感

这时只是缩放的效果

需要立体感，需要开启透视(近大远小)

**父级元素设置：**perspective:1000px

### 其他知识

#### 翻转不可见

假如翻转后需要不可见，可使用

backface-visibility: hidden  

## 浮动环绕效果

默认是盒子边界，就算设置了border-radias也是一盒子为准

这时需要用到shape-outside:circle(50%)

## 真实边框效果 阴影

使用clip-path做抠图后，边框还是盒子边界

可以使用

filter:drop-shadow(0 0 10px #fff)

## 文字边缘环绕

盒子开启圆角，文字不环绕，还是根据盒子边界环绕，这时需要设置

shape-outside:circle(50%)

## 图片缩放

```plain
object-fit:cover;
object-position:left top;
```

## 等比例

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304232111797.png)

```css
.container{
  width:90%;
  height:300opx;
  margin:0 auto;
 aspect-ratio:16/9;
}
```

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304232111654.png)

## 行盒截断样式

box-decoration-break:clone  // slice

## 背光效果

根据图片颜色进行背光显示

```

.backlight:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:inherit;
  filter: blur(10px);
  z-index: -1;
}
```
