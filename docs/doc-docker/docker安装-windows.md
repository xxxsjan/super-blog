[started](https://www.docker.com/get-started)

[https://docs.docker.com/desktop/install/windows-install/](https://docs.docker.com/desktop/install/windows-install/)

[https://www.bilibili.com/video/BV1za411Q7er](https://www.bilibili.com/video/BV1za411Q7er?spm_id_from=333.337.search-card.all.click&vd_source=11e14f37a256537712e73b4b7f52411c)

### 下载

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281327418.png)

安卓模拟器 需要关闭hyper V
docker需要开启hyper
这就很难受/(ㄒoㄒ)/~~
docker需要开启的
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281327051.png)

虚拟化 一般bios自动开启的
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281327009.png)

###

### 配置镜像加速

设置 Docker Engine 写入配置：
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281327156.png)

```json
{
  "registry-mirrors": [
    "http://hub-mirror.c.163.com/",
    "https://registry.docker-cn.com"
  ],
}
```

### wsl

wsl是windows的命令
windows10 11默认有wsl命令，win10 要2004
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281327096.png)
[https://docs.microsoft.com/zh-cn/windows/wsl/basic-commands](https://docs.microsoft.com/zh-cn/windows/wsl/basic-commands)

运行 wsl --list --online 以查看可用发行版列表

运行 wsl --install -d [自定义的名称] 以安装发行版

要查看 Linux 发行版是设置为 WSL 1 还是 WSL 2，请使用命令 wsl -l -v。

wsl --list  查看安装了的linux发行版

卸载

wsl --unregister [DistributionName]

[安装VMware16兼容Hyper-v+WSL2+Docker+解决0x80370102报错 - 百度文库](https://wenku.baidu.com/view/5c827502ee630b1c59eef8c75fbfc77da26997c8.html)

[夜神模拟器和wsl2冲突解决](https://www.bilibili.com/read/cv13748859/)

打开"适用于Linux的Window子系统"选项
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
打开Hyper-v 注意这里不要在"启用或关闭Windows功能"（命令optionalfeatures）中勾选Hyper-v
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
守护hyper进程
--这个很可能是开启hyper后不生效的主因
来源[https://blog.csdn.net/MyronCham/article/details/125216511](https://blog.csdn.net/MyronCham/article/details/125216511)
bcdedit /set hypervisorlaunchtype auto

### docker命令基础

- docker images 查看镜像
- docker ps 查看启动的容器 (-a 查看全部)
- docker rmi 镜像ID 删除镜像
- docker rm 容器ID 删除容器
- docker exec -it 1a8eca716169(容器ID:docker ps获取) sh 进入容器内部
- docker inspect bf70019da487(容器ID) 查看容器内的信息

### 镜像image

#### 安装镜像

进入<https://hub.daocloud.io> 

搜索node，切换到版本获取下载地址

##### 拉取镜像

- docker pull daocloud.io/library/node:12.18

#### 获取镜像id

- docker images

#### 重命名镜像

- docker tag 28faf336034d node ---

#### 导出镜像

docker save -o node.image(导出镜像要起的名称) 28faf336034d(要导出的镜像的ID)

#### 导入本地镜像

docker load -i node.image(导入的镜像名称)

### 报错

#### wSL 2 is not installed

这个应该是hyper-v没开
还有就是子系统要装一个linux，这个需要虚拟服务

### ![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281326647.png)
