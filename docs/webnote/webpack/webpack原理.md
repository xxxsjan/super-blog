### 流程
![](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151300591.jpeg)

### 教程视频截图

#### 工作原理剖析
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151300383.png)
#### webpack cli
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151300617.png)
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151300859.png)
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151300884.png)

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151301323.png)

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151301398.png)

#### 创建Compiler对象
根据option 创建compiler
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151301305.png)

具体代码

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151301399.png)

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151301537.png)
#### 开始构建
watch，监视模式
如果是监视模式就调用Compiler对象的watch方法，以监视模式启动构建但这不是主要关心的主线
如果不是监视模式就调用Compiler对象的run方法，开始构建整个应用.

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151301359.png)
调用compiler.run方法

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151301553.png)
调用compile方法开始编译
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151301150.png)
编译时生成compilation对象，给make每个钩子传进去
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151301010.png)

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151302314.png)
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151302539.png)

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151302698.png)

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151302352.png)

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151302480.png)
