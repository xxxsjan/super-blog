[https://blog.csdn.net/qq_40864647/article/details/119606298](https://blog.csdn.net/qq_40864647/article/details/119606298)<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1668094214998-6f6d0613-4812-4a1b-8426-839fb88011e2.png#averageHue=%23d8cb8b&clientId=u9fb768d2-f094-4&from=paste&height=374&id=ub247a239&originHeight=467&originWidth=622&originalType=binary&ratio=1&rotation=0&showTitle=false&size=110232&status=done&style=none&taskId=uf5d019fe-35ff-4a0f-9d99-36a1bdd01f8&title=&width=497.6)


<a name="WvzHT"></a>
###  对比
|  | 标准盒模型 | box-sizing下 |
| --- | --- | --- |
| style.heihgt | content-height  |  不变 |
| clientHeight | content + padding | 设置的height 减去 border |
| offsetHeight | content + padding + border  | 设置的height |
| clientLeft | 左边边框宽度 | 不变 |
| Element.getBoundingClientRect | content+padding+border  | 设置的width height |
| window.getComputedStyle(Element).height | content-height | 始终是你设置的height |

> 总结：box-sizing height就是最大高度了，当然还是不包括margin

<a name="rBsMX"></a>
### 窗口宽度
window.innnerWidth：包括滚动条

document.documentElecment.clientWidth<br />显示区域的宽度，**不包括滚动条**
<a name="eybBK"></a>
#### document.documentElement.offsetWidth
获取DOM文档的根节点html元素对象的宽度，即offsetWidth=width+padding+border，不包括margin。
