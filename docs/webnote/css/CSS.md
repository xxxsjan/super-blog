# CSS

## 各种布局

### 圣杯布局（一体）

[https://www.jianshu.com/p/81ef7e7094e8](https://www.jianshu.com/p/81ef7e7094e8)

身体：大盒子里面 中（自适应）左（200px）右（150px）三个浮动盒子

			中盒子左右设置padding

左盒子设置宽度，margin:负宽度的值

右盒子设置宽度，margin:负宽度的值

--padding

```html
<div id="header"></div>
<div id="container">
  <div id="center" ></div>
  <div id="left" ></div>
  <div id="right"></div>
</div>
<div id="footer"></div>

<style>
//最小宽度：2倍left + 1倍right
body {min-width: 550px;}

#container {padding:0 150px 0 200px;}

#center,#left,#right {float: left;}

#center { width: 100%;min-height:400px}

#left {
  width: 200px; margin-left: -100%;
  position: relative;left: -200px;
}
#right { width: 150px; margin-right: -150px; }

#footer {clear: both;}
</style>
```

##### flex实现

```html
<div id="container">
  <div id="center"></div>
  <div id="left"></div>
  <div id="right"></div>
</div>
<style>
#container { display: flex; }
#center { flex: 1; }
#left {  flex: 0 0 200px;order: -1;//顺序，放前面}
#right { flex: 0 0 150px; }
</style>
```

##### calc计算也可以实现

```html
#container { 
 width:calc(100% - 400px)
}
```

##### 定位实现

```html
<div class="container">
  <div class="center"></div>
  <div class="left"></div>
  <div class="right"></div>
</div>
.container{
	position:relative;
	height:100%;
}
.left,.right{
	position:absolute;
	top:0;
	width:200px;
	min-height:200px;
	background:#bfa
}	
.left{left:0}
.right{right:0}
.center{
	margin:0 200px;
	min-height:400px;
	background:lightsalmon
}
```

### 双飞翼（翅膀是margin）

身体盒子：中左右三个左浮盒子同级，中盒子里面有个不浮动盒子，

翅膀：左右左浮的盒子

中盒子里面盒子设置左右margin

左右盒子设置宽度，margin设置负宽度的值

```
<body>
  <div id="header"></div>
  <div id="container" >
  	<div id="center"></div>
  </div>
  <div id="left" ></div>
  <div id="right" ></div>
  <div id="footer"></div>
<body>

body {min-width: 500px;}

#container {width: 100%;}

#center,#left,#right {float: left;}

#center {margin: 0 150px 0 200px;} 

#left {width: 200px; margin-left: -100%;}      
#right {width: 150px; margin-left: -150px;}  

#footer {clear: both;}
```

##### calc计算实现

```
.center{
  // 兼容到ie9，缺点：性能消耗
	width:calc(100% - 350px);min-height:400px
}
```

### 伪等高布局

	所有子元素样式设置：

	padding-bottom:10000px;

	margin-bottom:-10000px;

	父元素设置

	overflow:hidden;

### 粘连布局

	底部footer元素的上一个兄弟元素最小高度设置为min-height:100%

	html,body也得设置默认高度，不然上一行提到的兄弟元素没有高度参考（个人理解）

	html,body{	height: 100%;	}

	底部footer元素假如设置高度为50px

	然后兄弟元素需要设置padding-bottom等于footer的高度，

	因为footer原本是占兄弟元素底部的50px，不设置的话，

	兄弟元素内的内容撑开到50px以内时不会把footer往下推

### 两列布局

## 溢出显示省略号

		white-space: nowrap;

		text-overflow: ellipsis;

		overflow: hidden;

		display:block;(隐含条件，这是必要条件，不需要写，但元素须为块)

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

## 水平垂直居中★★

### 水平居中的方法

1. 元素为行内元素，设置父元素`text-align:center`
2. 如果元素宽度固定，可以设置左右`margin为auto` ;
3. 如果元素为绝对定位，设置父元素position为relative，元素设left:0;right: 0;margin: auto;
4. 使用flex-box布局，指定`justify-content:center`
5. display设置为tabel-ceil

### 垂直居中的方法

1. `display:table-cell` ,同时设置`vertial-align : middle`
2. 使用flex布局，设置为`align-item : center`
3. 绝对定位中设置`bottom:0,top:0` ,并设置`margin :auto`
4. 绝对定位中固定高度时设置`top : 50%`，`margin-top`值为高度一半的负值
5. 文本垂直居中设置`line-height` 为`height`值

### 垂直对齐

vertical-align:middle

```
添加一个同级空的元素，（占位元素）
.wrap:after{
  content:"";
  display:inline-block;
  height:100%;百分百才能-垂直-居中
  width:0;
  backgroud:pink;
  vertical-align:middle;
}
```

### 水平垂直居中

```
方法一：要求知道具体宽高
.father{
	width:100px;height:50px;
	position:relative;
}
.son{
	position:absolute;
	top:50%;left:50%;
	margin-left:-50px;
	margin-top:-25px;
}
方法二：不需要具体宽高
.father{
	width:100px;height:50px;
	position:relative;
}
.son{
	position:absolute;
	top:50%;left:50%;
	transform:translate(-50%,-50%)
}
方法三：有宽高就行
.father{
	width:100px;height:50px;
	position:relative;
}
.son{
	position:absolute;
	top:0;left:0;right:0;bottom:0;
	margin:auto
}
方法四：
.father{
 display:flex;
 justify-content:center;
 align-item:center;
}
方法五：需要固定宽高
.father{
	display:table-cell;
	vertical-align:center;
	text-align:center;
	width:500px;height:500px
}
.son{
	display:inline-block
}
```

## 靠内容撑开

```
.block-center {
  width: max-content;height: max-content; 
  position:absolute;
  top:0; left:0; bottom:0; right:0;
  margin:auto;
}
```

## div局部滚动

```css
左右div都设好固定的高度，
width:100%;
height: 980px;
overflow: auto
左右div的父级设置宽高
widht:100%;
height:100%;
```

## audio标签

```
<audio src="someaudio.wav">
。js
function(){
	let _audiold = this.$refs.audioRef
  if(_audiold.readyState === 4){
    _audiold,play()
  }
}
```

## 动画

```
aniamtion: ketframe .5s
animation-delay:1.5s
animation-fill-mode:forward
```

## box布局
| display: -webkit-box; | 类似flex |
| --- | --- |
| -webkit-line-clamp:2; | 显示行数 |
| -webkit-box-orient:vertical; | 同flex-direction: column |
|  |  |


## 文字显示两行，多的省略

```
  width: 200px;

  显示一行文字，多余的文字省略
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  
  显示两行文字，多余的文字省略
  overflow: hidden;
  text-overflow: ellipsis;
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  
  display: -moz-box;/** 对象作为伸缩盒子模型显示 **/
  -moz-line-clamp: 2;
  -moz-box-orient: vertical;/** 设置或检索伸缩盒对象的子元素的排列方式 **/
  
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
```

### 背景线性渐变

backgroud： linear-gradient(#**);

### 文字排版

	direction: ltr;左到右（文字顺序不变）

	direction: rtl;右到左（文字顺序不变）

	unicode-bidi:bidi-override;(文字倒序)

溢出显示省略号

### 隐形条件：盒子不能靠内容撑开，也就是有宽高（面试题）

	white-space: nowrap; //好像是不换行的意思

	overflow:hidden;//多的不显示

	text-hoverflow: ellipsis;//溢出的话显示省略号

### 盒子阴影

	box-shadow: 10px 10px blur  10px（前后？z轴？）[inset]

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

### botton上设置鼠标光标样式--cursor

设置鼠标指针的样式

cursor:pointer ;（手）

crosshair（十字架）

move（移动图标）

### 解决IE6双边距bug------

> ie6中设置向左浮动再设置左外边距时，边距翻倍


解决方法

设置成行内元素，行内元素设置对浮动不起作用，但能解决双边距bug

display:inline

### 雪碧图

左上角为0,0，往下移动，往右移动是负值

background：url:(img/*/) no-repeat -10px -10px;

### 文本域

```
<textarea class="tarea" placeholder="message"></textarea>
去除滚动条
overflow: auto;

设置文本域不能调整大小
resize: none;
```

### 自定义字体

网站推荐fontsquirrel、icomoon

### 回到顶部

```html
<a href="last">去到底部</a><br>
<a id="last" href="#">回到顶部</a>
```

### 选择器优先级

```javascript
// 这3个哪个优先呢？(优先级、权重)
.p1{ backgrond-color:red; }   类选择器  
p{ backgrond-color:yellow; }	元素选择器
#p2{ background-color:yellowgreen }	id选择器 
<p class="p1 p3" id="p2" style="skyblue">我是p段落</p>
```

### 优先级规则
| 内联样式 | 1000 |
| --- | --- |
| id选择器 | 100 |
| 类、伪类 | 10 |
| 元素选择器 | 1 |
| 通配* | 0 |
| 继承样式 | 无优先级 |
| 多种可相加
优先级一样，选后面的
!important 获得最高优先级，开发中尽量避免使用 |  |


### 伪类的顺序

> 	a:link   	默认值

> 	a:visited	访问过

> 	a:hover		移入

> 	a:active	点击


	四个选择器优先级一样，用后面的，所以hover在active前面



### 字体

```html
text-transform: none
				capitalize  首字母大写
				uppercase 	全大写
				lowercase 	全小写
text-decoration:none
				underline 下划线
				overline 	上划线
				line-through 删除线
				blink 闪烁
letter-spacing: noemal 
				length 值
word-spacing:normal
			 length 值
text-align: left    左对齐
			right   右对齐
			center  居中对齐
			justify 两端对齐
text-indent:length 	首行缩进 用2em，相对字体大小变化，做到两个空格缩进
```

### 盒子模型(框模型)box model

#### 透明度

opacity:0.5

filter:alpha(opacity:50)

### 背景

```
background-repeat: 	no-repeat 图片不铺满窗口
						repeat-x 图片横向平铺显示
						repeat-y 图片纵向平铺显示
背景图片默认左上角显示,两个值，只写一个值，第二个默认center
background-position:0% 0%;	---左上角
					top left ---左上角
					center center ---居中
					bottom right ---右下角
指定偏移量
	background-position: x y; ---x是水平，y是纵向，负值也行
指定图片是否随滚动而移动
	background-attachment：scroll;---随滚动
	fixed;--- 不随滚动，通常设置给body
简写属性 
	 ---给属性可以设置所有背景相关样式,没有顺序要求，没有数量要求，没写的按默认值
	background: #bfa url(img/1.png) center center no-repeat fixed;
```

#### 块渐变效果

	截一小块横向平铺，即可做出类似导航条

### 表单

```
<form action="#">
		<input class="text" type="text" placeholder="your name"  />
		<input class="text" type="text"  />
		<textarea class="tarea">  </textarea>
		<br/>
		提交按钮
		<button>Send it</button>
	</form>
```

去除默认style

```
padding: 10px;
margin: 0;
	去边框
	border: none;

占位符（水印）IE8及以下不支持，需要使用js兼容
placeholder
```
