# CSS

## 各种布局

### 圣杯布局（一体）

[https://www.jianshu.com/p/81ef7e7094e8](https://www.jianshu.com/p/81ef7e7094e8)

### 双飞翼（翅膀是margin）

### 伪等高布局

 所有子元素样式设置：

 padding-bottom:10000px;

 margin-bottom:-10000px;

 父元素设置

 overflow:hidden;

### 粘连布局

 底部footer元素的上一个兄弟元素最小高度设置为min-height:100%

 html,body也得设置默认高度，不然上一行提到的兄弟元素没有高度参考（个人理解）

 html,body{ height: 100%; }

 底部footer元素假如设置高度为50px

 然后兄弟元素需要设置padding-bottom等于footer的高度，

 因为footer原本是占兄弟元素底部的50px，不设置的话，

 兄弟元素内的内容撑开到50px以内时不会把footer往下推

### 两列布局

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

### 雪碧图

background：url:(img/*/) no-repeat -10px -10px;



### 选择器优先级

| 内联样式 | 1000 |
| --- | --- |
| id选择器 | 100 |
| 类、伪类 | 10 |
| 元素选择器 | 1 |
| 通配* | 0 |
| 继承样式 | 无优先级 |

## getComputedStyle和 getBoundingClientRect

style.width  dom树

window.getComputedStyle CSSOM

Element.getBoundingClientRect  LayoutTree  用户眼睛看到的  可见尺寸
