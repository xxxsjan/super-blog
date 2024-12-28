# aniamtion

```
aniamtion-timeline:view();
animation-range:entry 0% cover 40%; // 达到40%视口完成动画
```

## animation steps

<https://www.zhangxinxu.com/wordpress/2018/06/css3-animation-steps-step-start-end/>

## 参数

steps两个参数，number 和 postion

number：步数

position：两个可选值： start end

## 举例说明

比如一段100px位移，分两步，那就会产生三个关键点

A--B--C        起始A，中间点B，终点C

也就是三个关键的状态，

因为分两步只会取两个关键点，所以start end就是取点的规则

设置start ，不要第一个点A，取后面的BC

设置end，不要最后一个点C，取前面的AB

## 具体理解

**设置哪个就不要哪一边的点，就不要哪一边的转态**

沿用上面的例子

设置start ，不要第一个点A， 也就是0px的状态你是看不到的，动画是从50px到100px

设置end，不要最后一个点C，也就是100px的状态你是看不到的，动画是从0px开始的

效果图辅助理解

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304132225679.gif)

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305131203419.gif)

## 辅助理解的数学图形

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304132225554.png)

## **简化写法**

step-start等同于steps(1, start)，

step-end等同于steps(1, end)或者steps(1)。end是默认值
