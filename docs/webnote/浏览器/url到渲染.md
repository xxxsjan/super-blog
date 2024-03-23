 
[点击查看【bilibili】](https://player.bilibili.com/player.html?bvid=BV1Dh411J71c)

### 1 构建DOM树
#### 解析html
主线程由上而下解析
同步script会下载后执行，会阻塞解析

如果是图片、link 、script（async defer）则会异步下载 
预扫描
扫描字体 css script（defer async），进行下载
### 2构建CSSOM树
根据css生成css object model

### 3 合并DOM CSSOM
生成render Tree
### 4 布局
根据渲染树计算可见节点（display不为none）的宽高和位置，对所有节点进行布局规划
对于图片节点如果没有指定宽高，浏览器会先忽略其大小。
在图片加载完成后，浏览器会再次计算受影响的节点的位置（这一步 叫 回流）

### 5 绘制
根据计算的位置信息绘制页面，这里并没包括回流
如果有回流，比如上面说的图片加载完成，重新计算节点信息
就会进行重新绘制（重绘）
如果没发生回流重绘，而是产生新的图层，比如video标签、transform、opacity、will-change属性
浏览器会把这些图层组合起来，按正确的堆叠顺序渲染

### 6 后续
之前的script（defer async）下载完，会执行
完成后，网站就加载完成



### 


