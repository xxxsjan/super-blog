### linux

### 配置网络
| 查看ip | ip addr |
| --- | --- |
| 进入配置目录 | cd /etc/sysconfig/network-scripts |
| 查看目录 | ls |
| 编辑器打开 | vi ifcfg-ens33 |
|  | 将onboot=no 改成yes |
| 退出 | esc :wq 回车 |


sudo 临时获取权限（以管理员打开）

### xshell 远程管理

### 查看ip

ip addr



xshell里

新建会话，主机那里输入ip，点击连接



这样就可以在xshell里面直接使用命令行控制linux系统了，

xshell美化代码会好点

复制

粘贴：鼠标中间 shift + insert

### 修改源

##### 首先mv备份/etc/yum.repos.d/CentOS-Base.repo

```
sudo mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
```

##### curl 下载文件

```
sudo curl -o Centos-Base.repo http://mirrors.163.com/.help/CentOS7-Base-163.repo
```

运行以下命令生成缓存

sudo yum clean all

sudo yum makecache

#### 拓展--附加商店

yum install epel-release

#### 拓展--下载工具

yum install wget -y

多线程下载器

yum install axel

安装后

wget url

axel -n 8 -a http://...

### 常用命令

```shell
#安装
yum install xxx
rpm -ivh xxx
yum update xxx
#卸载
yum remove xxx
rpm -e xxx
pwd
#查看是否已安装
yum list installed  | grep wget    
yum info wget
rpm -q wget
rpm -qa|grep mariadb

yum install -y lrzsz
#查看mysql是否存在
ps ajx | grep mysql
service mysql start/stop/restart
```

### vim

u 撤销

ctrl r 取消撤销

#### 鼠标控制光标

临时设置   :set mouse=a

长久设置，在~/.vimrc中添加 set mouse=a

### 占用端口

**1.查找被占用的端口**

netstat -tln 查看端口使用情况

netstat -tln | grep 8080则是只查看端口8080的使用情况

**2.查看端口属于哪个程序？端口被哪个进程占用**

lsof -i:8060

COMMAND  PID  USER  FD  TYPE  DEVICE SIZE/OFF NODE NAME

Java  20804  root  36u IPv6 35452317   0t0 TCP *:pcsync-https (LISTEN)

**3.杀掉占用端口的进程 根据pid杀掉**

kill -9 进程id

kill -9 20804

### pm2管理项目

安装：npm i pm2 -g

查看版本：pm2 -v

使用pm2启动项目，在终端中输入命令：pm2 start app.js --name [自定义名字]

查看项目列表命令：pm2 ls

重启项目：pm2 restart 自定义名称

停止项目：pm2 stop 自定义名称

删除项目：pm2 delete 自定义名称

#### 一些error提示

提示 pm2 command not found

表示pm2没有加入环境变量。

此时需要配置好pm2环境变量。

ln -sv   /usr/local/src/nodejs/bin/pm2   /usr/local/bin

### 小皮面板

输入xp即可调出菜单

### 查看nginx的进程

ps -ef|grep nginx，但是找不到配置文件

### windows下使用linux

要安装vmware

[https://blog.csdn.net/qq_40950957/article/details/80467513](https://blog.csdn.net/qq_40950957/article/details/80467513)
