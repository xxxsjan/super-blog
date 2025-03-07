# CSS

## 清除浮动-高度塌陷

1、给父级加高度

2、开启BFC--但IE6不支持（无法触发haslayout，相当于IE6的BFC）

3、br标签--IE6不支持，违反了结构行为样式相分离的原则

4、空标签 --违反了结构行为样式相分离的原则

5、伪元素+开启haslayout--因为IE67不支持伪元素

**方案一：**给父元素一个固定的高度

**缺点：**给父元素固定高度违背了高度自适应的原则，不够灵活，不推荐使用。

**方案二：**给父元素添加属性 overflow: hidden;

**优点：**浏览器支持好，简单;

**缺点：**当子元素有定位属性时，设置 overflow: hidden; 容器以外的部分会被裁剪掉。

**方案三：**在子元素的末尾添加一个空的 div ，并设置下方样式

```
 div{ 
 clear: both;     
 height: 0;   
 overflow: hidden; 
 }
```

**优点：**所有浏览器都支持，并且容器溢出不会被裁剪;

**缺点：**在页面中添加无意义的div，容易造成代码冗余。

**方案四：**万能清除浮动法 父元素添加类clearfix

               一个冒号两个冒号都可以，两个是新版本的

```
.clearfix:after{     
   content: "";
   font-size:0;
   display: block;
   height: 0;
   clear: both;
   visibility: hidden; // 将元素隐藏，但是在网页中该占的位置还是占着
   overflow: hidden; // 可选
}
.clearfix{
 *zoom:1;
}
```

优点：不会造成代码冗余，剩余代码性能优化，推荐使用。

**其他方案：**

```css
.clearfix:before,
.clearfix:after{
  content: "";
  display: table;
  clear: both;
}
.clearfix{zoom: 1;}
```

## box布局

| display: -webkit-box; | 类似flex |
| --- | --- |
| -webkit-line-clamp:2; | 显示行数 |
| -webkit-box-orient:vertical; | 同flex-direction: column |
|  |  |

### 文字排版

 direction: ltr;左到右（文字顺序不变）

 direction: rtl;右到左（文字顺序不变）

 unicode-bidi:bidi-override;(文字倒序)



### 盒子倒影

-webkit-box-reflect: above 10px;

第一个值可选：上obove;下below;右righ;左left;

第二个值：偏移量（offset）



### resize支持拖动缩放

 overflow: auto;（需要这个才能使用）

 resize: both; （both全方向拖动缩放;horizontal水平拖动缩放）



### white-space

子盒子dispaly设置inline block时可实现不换行

```
white-space:nowrap
```

拓展：word-space是单词间间隔

   lettter-space是字母之间间隔



### 解决IE6双边距bug------

> ie6中设置向左浮动再设置左外边距时，边距翻倍

解决方法

设置成行内元素，行内元素设置对浮动不起作用，但能解决双边距bug

display:inline





## getComputedStyle和 getBoundingClientRect

style.width  dom树

window.getComputedStyle CSSOM

Element.getBoundingClientRect  LayoutTree  用户眼睛看到的  可见尺寸



## img底部间隙

原因：img默认inline-block，默认字体基于baseline对齐，底部会出行间隙<br />

解决：
diisplay:block;
fontsize：0;
float：left;
vertical-align: top;



## 爱恨原则

link--visited--hover-active，也就是我们常说到的LoVe HAte原则

## text-transform

[https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-transform](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-transform)

```json
/* Keyword values */
text-transform: capitalize;
text-transform: uppercase;
text-transform: lowercase;
text-transform: none;
text-transform: full-width;

/* Global values */
text-transform: inherit;
text-transform: initial;
text-transform: unset;
```
