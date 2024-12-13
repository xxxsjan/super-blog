# scss

## 函数

```json
//使用scss的math函数，https://sass-lang.com/documentation/breaking-changes/slash-div
@use "sass:math";

//默认设计稿的宽度
$designWidth:1600;
//默认设计稿的高度
$designHeight:1200;

//px转为vw的函数
// 除法 math.div
@function vw($px) {
  @return math.div($px , $designWidth) * 100vw;
}

//px转为vh的函数

@function vh($px) {
  @return math.div($px , $designHeight) * 100vh;
}
```

## @at-root

SCSS中的@at-root可以用来放弃当前的嵌套层级，让其内部的CSS规则到根部。

比如我们通常会这样使用SCSS的嵌套

```css
.bar {
    .foo {
        color: red
    }
}

编译出来的css为

.bar .foo {
    color: red
}

但是如果我们这里使用@at-root，那编译出来的效果就不一样了

.bar {
    @at-root .foo {
        color: red;
    }
}

编译出来就是

.bar {}
.foo {
    color: red;
}

这个规则经常使用在CSS的BEM命名规范中

.header {
    width: 100px;
    @at-root &__button {
        background: red;
        
        @at-root &--primary {
            color: white;
        }
    }
}

编译出来就是

.header {
  width: 100px;
}
.header__button {
  background: red;
}
.header__button--primary {
  color: white;
}
```

## 语法

### Mixin 和 include

```scss
@mixin usethemn(){
 html[data-theme='light'] & {
  color:#fff;
 }
}
&是使用该mixin的那个选择器的变量，可以这么理解

使用

.item {
 @include usetheme;
}

编译后
html[data-theme='light'] .item{
   color:#fff;
}

```

### 变量

```scss
//普通结构
$data:'#fff'

//映射结构
$themes:(
  light:{
     color:#fff;
  },
  dark:{
    color:#000;
  }
)
//使用映射结构
@mixin usetheme(){
    @each $key , $value in $themes{
        html[data-theme=#{$key}] & {
    @content
     }
    }
}
@content是usetheme()的入参
但使用@include usetheme(color:#000;)，@content会是color:#000;

```

## BEM规范

```css
$namespace: 'ikun';
$element-separator: '__';
$modifier-separator: '-';

@mixin b($block) {
  $B: $namespace + '-' + $block !global;
  // 类似插槽
  .#{$B} {
    // 类型作用域传值，里面可以之间拿到$B
    @content;
  }
}
@mixin e($element) {
  // 可以拿到$B
  $currentSelector: '.' + $B + $element-separator + $element;
}
```

使用

```css
@include b(button){
  color:#333
}
// out
.ikun-button {
  color: #333;
}
@include b(button) {
  color: #333;
  @include e(eee) {
    color: #eee;
  }
}
// 
.ikun-button {
  color: #333;
}
.ikun-button__eee {
  color: #eee;
}
```

## 安装

#### node-sass

#### <https://github.com/sass/node-sass>

| NodeJS  | Supported node-sass version | Node Module |
| ------- | --------------------------- | ----------- |
| Node 19 | 8.0+                        | 111         |
| Node 18 | 8.0+                        | 108         |
| Node 17 | 7.0+, <8.0                  | 102         |
| Node 16 | 6.0+                        | 93          |
| Node 15 | 5.0+, <7.0                  | 88          |
| Node 14 | 4.14+                       | 83          |
| Node 13 | 4.13+, <5.0                 | 79          |
| Node 12 | 4.12+, <8.0                 | 72          |
| Node 11 | 4.10+, <5.0                 | 67          |
| Node 10 | 4.9+, <6.0                  | 64          |
| Node 8  | 4.5.3+, <5.0                | 57          |
| Node <8 | <5.0                        | <57         |

#### node12 的话

```javascript
"devDependencies": {
    "node-sass": "^4.14.1",
    "sass-loader": "^7.1.0", 
}
```

#### node 16

两种，16不会报错
dart-sass@1.25.0: This package has been renamed to 'sass'.
dart-sass已经重命名为了sass，所以安装sass即可
node-sass和node版本依赖较强，所以使用sass吧
不然你得往低版本node切换才能启动项目

```javascript
{
  "devDependencies": {
    "sass-loader": "^7.2.0",
    "sass": "^1.22.10"
  }
}
或者
{
  "devDependencies": {
    "sass-loader": "^7.2.0",
    "node-sass": "^5.0.0"
  }
}
```

#### 高版本 17 18版本报错

解决 nodejs 17: digital envelope routines::unsupported
相关构建命令之前加入set NODE_OPTIONS=--openssl-legacy-provider

```javascript
"serve": "set NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service serve",
```

## 语法

### unquote

不要引号

```scss
$size:unquote('#{random(100)}px')
```

### function

```scss
@function getShadows($n){
 $shadows: '#{random(100)}vw '#{random(100)}vh #fff'
    @for $i from 2 through $n {
          $shadows: '#{$shadows}, #{random(100)}vw '#{random(100)}vh #fff'  
    }    
 @return unquote($shadows)
}

usage

box-shadows:getShadows(1000)
```
