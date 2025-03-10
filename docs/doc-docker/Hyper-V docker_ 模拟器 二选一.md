[https://blog.csdn.net/qq_31985307/article/details/115147897](https://blog.csdn.net/qq_31985307/article/details/115147897)
模拟器需要把这个关了
docker需要开启这个

### 检查是否启动

```javascript
bcdedit /enum {current}
```

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281357443.png)

### 启用、关闭

#### 方法一

windows 搜索 **windows功能**
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281357791.png)

#### 方法二：执行命令

如果方法一不生效
cmd(管理员)执行
使用模拟器执行这个
bcdedit /set hypervisorlaunchtype off
使用docker执行这个
bcdedit /set hypervisorlaunchtype auto
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281357748.png)

#### 方法三

右键我的电脑-管理-服务，启动类型改为手动
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281357613.png)

### 其他设置

#### 虚拟化

虚拟机平台是在您的计算机上运行其他操作系统（如 Linux）所需的系统的一部分。
它类似于 Hyper-V 服务。

##### 查看当前状态

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281357417.png)

> 雷电模拟器不需要虚拟化

##### 开关方法

设置搜索 windows功能
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281357620.png)
取消勾选“虚拟机平台”
点击确定，然后重新启动计算机，即可生效
要是还是报没关虚拟化，可以右键计算机-管理-服务-服务
找到hyper开头的，状态是运行的都右键停止
这样应该可以解决报错了
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281358490.png)
