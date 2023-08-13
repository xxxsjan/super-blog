## 拉取镜像
### centos
docker search centos
[https://hub.daocloud.io/repos/bf207788-d7de-4044-bdeb-521a998f748b](https://hub.daocloud.io/repos/bf207788-d7de-4044-bdeb-521a998f748b)
docker pull daocloud.io/centos:6 
docker pull daocloud.io/centos:7

### ubuntu
 docker pull ubuntu:16.04
[tags](https://hub.docker.com/_/ubuntu/tags)

#### dockerfile安装
要使用systemctl，参考下面文章创建

[解决 System has not been booted with systemd as init system (PID 1). Can‘t operate._duapple的博客-CSDN博客](https://blog.csdn.net/duapple/article/details/125194979)



docker build -t ubuntu-nms .



```bash
# 指定该 Docker 镜像的基础镜像为 Ubuntu 18.04。
FROM ubuntu:18.04

# 定义一个 `user` 参数，用于指定用户名。在这里，我们将默认的用户名设置为 `duapple`
ARG user=duapple

# 添加标签，包含维护者的姓名和电子邮件地址
LABEL maintainer="hejiang" email="2832893880@qq.com"

# 安装依赖 在 Ubuntu 18.04 上更新软件包列表并安装 `sudo` 和 `wget` 软件包。
#RUN apt-get update && apt-get install -y sudo &&　apt-get install wget -y

# 创建一个新用户并赋予 `sudo` 权限
# RUN useradd --create-home --no-log-init --shell /bin/bash ${user} \
#     && adduser ${user} sudo \
#     && echo "${user}:123123" | chpasswd

# 更改用户的 UID 和 GID
#RUN usermod -u 1000 ${user} && usermod -G 1000 ${user}

# 设置容器工作目录为用户的主目录
# WORKDIR /home/${user}

# 将容器的默认用户更改为 `${user}`
# USER {user}

```


#### 运行容器

docker run -itdp 8000:8000 --name ubuntu-nodemediaserver ubuntu-nms


#### 常规命令
查看镜像列表：docker images

新建且启动容器：docker run -itd --name ubuntu-test ubuntu

查看容器列表：docker ps

进入指定容器：docker exec -it xxxxx   bin/bash

已包含 tar apt apt-get



> yum是一个在Fedora和RedHat以及CentOS中的Shell前端软件包管理器



apt-get安装依赖前，先：apt-get update



下载wget ：apt-get install wget

下载：wget https://cdn.nodemedia.cn/nms/3.18.0/nms-linux-amd64-v3.18.0-20221031.tar.gz

解压 ：tar -zxvf nms-linux-amd64-v3.18.0-20221031.tar.gz



#### 修改源--提高下载速度

文件路径： /etc/apt/sources.list

可用源：[https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/)

https报错就改成http



```vue
// 清华源https
echo 'deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic main restricted universe multiverse' > /etc/apt/sources.list && 
echo 'deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse' >> /etc/apt/sources.list  &&
echo 'deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse' >> /etc/apt/sources.list  &&
echo 'deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-security main restricted universe multiverse' >> /etc/apt/sources.list
   
// 清华源http   报does not have a Release file.就用http
echo 'deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic main restricted universe multiverse' > /etc/apt/sources.list && 
echo 'deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse' >> /etc/apt/sources.list  &&
echo 'deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse' >> /etc/apt/sources.list  &&
echo 'deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-security main restricted universe multiverse' >> /etc/apt/sources.list
```



查看刚刚写入的内容，使用cat命令

cat /etc/apt/sources.list