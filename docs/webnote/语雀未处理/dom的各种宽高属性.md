[https://blog.csdn.net/qq_40864647/article/details/119606298](https://blog.csdn.net/qq_40864647/article/details/119606298)<br />![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151245147.png)

### 对比

|  | 标准盒模型 | box-sizing下 |
| --- | --- | --- |
| style.heihgt | content-height  |  不变 |
| clientHeight | content + padding | 设置的height 减去 border |
| offsetHeight | content + padding + border  | 设置的height |
| clientLeft | 左边边框宽度 | 不变 |
| Element.getBoundingClientRect | content+padding+border  | 设置的width height |
| window.getComputedStyle(Element).height | content-height | 始终是你设置的height |

> 总结：box-sizing height就是最大高度了，当然还是不包括margin

### 窗口宽度

window.innnerWidth：包括滚动条

document.documentElecment.clientWidth

显示区域的宽度，**不包括滚动条**

#### document.documentElement.offsetWidth

获取DOM文档的根节点html元素对象的宽度，即offsetWidth=width+padding+border，不包括margin。
