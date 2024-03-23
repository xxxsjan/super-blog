### div 100%和canvas100%不一样
canvas会出现滚动条
[https://www.bilibili.com/video/BV1TW4y1v7mm/](https://www.bilibili.com/video/BV1TW4y1v7mm/?spm_id_from=444.41.list.card_archive.click&vd_source=11e14f37a256537712e73b4b7f52411c)
```html
// 1 这种div不会有滚动条
<style>
  #app{
    width:100vw;
    height:100vh;
    background-color:red
  }
</style>

<div id="app"></div>

// 2 假如里面加个图片,就会出现空白，出现滚动条
<style>
  #app{
    width:100vw;
    height:100vh;
    background-color:red
  }
</style>
<div id="app">
  <img src=""/>
</div>

// 3 这样就会出现滚动条
<style>
  #app{
    width:100vw;
    height:100vh;
    background-color:red
  }
</style>
<div id="app">
  <img src=""/>ggg
</div>

// 4 不会出现
<style>
  #app{
    width:100vw;
    height:100vh;
    background-color:red
  }
  img{
    display:'inline-block'
  }
</style>
<div id="app">
  <img src=""/>ggg
</div>

// 5 不会出现
<style>
  #app{
    width:100vw;
    height:100vh;
    background-color:red
    font-size:0
  }
</style>
<div id="app">
  <img src=""/>ggg
</div>
```
原因：
inline-block默认以基线对齐，当没有文字时，会预留底部基线位置，所以底部会多出空白空间
例如：
像abc和jq这种就不一样，就是为了显示脚部，所以预留
解决：
1 img或者canvas设置 :   display:block
2 父元素 font-size:0
3 img或者canvas设置: vertical-align:top

