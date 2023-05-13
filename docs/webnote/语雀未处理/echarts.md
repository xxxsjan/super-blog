### echarts

### 动画

```
#加载数据前show，加载数据完后，在回调hide
mCharts.showLoading()
$.get('json',function(ret){
	mCharts.hideLoading()
})
#增量动画，改变数据后通过 .setOption()实现
#动画
var option = {
  animation:true
  //延迟
  animationDuration:function(arg){
    return 2000*arg
  }
 	//缓动-弹弹弹
	animationEasing:'bounceOut',
    //动画阈值，超过这个数就没动画
    animationThreshold:7 
}
#连接两个图标，共用一些配置
mcharts.connect(['charts1','charts2'])

#地图geo api
https://echarts.apache.org/zh/option.html#geo
```

### series-label-formatter回调函数使用和添加图片样式

在series-> label -> formatter中设置添加图片, 要配合rich才能实现

[https://blog.csdn.net/zm_miner/article/details/102689266](https://blog.csdn.net/zm_miner/article/details/102689266)

```
{
        name: '峰值',
        type: 'bar',
        stack: 'b',
        yAxisIndex: 0,
        barGap: '-100%',
        barWidth: 15,
        data: [100, 200],
        label: {
          normal: {
            show: true,
            position: 'right',
            distance: 10,
            rich: {
              img1: {
                backgroundColor: {image: '本地路径或者http都可以'}
              }
            },
            formatter: function (param) {
              var res = param.value + '\n {img1|}'
              return res;
            },
            textStyle: { color: '#ccc', fontSize: '16' }
          }
        },
        itemStyle: {
          normal: { color: '#fff' }
        },
        z: 1
      },
```

### 监听点击事件

```
this.$echarts.on('click',()=>{})
```
