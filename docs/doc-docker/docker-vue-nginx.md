[Docker 入门终极指南，详细版！别再说不会用 Docker 了！](https://mp.weixin.qq.com/s/mql5LQ-PuUQm0CGvLE67pQ)
[WSL2 + Docker + xfce4安装及使用_笔上烽烟的博客-CSDN博客_docker wsl2](https://blog.csdn.net/qq_38856939/article/details/116528514)

## nginx相关
### 新建default.conf
```javascript
server {
    listen       80;
    server_name  localhost;

    #charset koi8-r;
    access_log  /var/log/nginx/host.access.log  main;
    error_log  /var/log/nginx/error.log  error;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```
## docker相关
### 新建Dockerfile
```javascript
FROM nginx  
COPY dist/ /usr/share/nginx/html/  
COPY default.conf /etc/nginx/conf.d/default.conf 
```

- FROM nginx 指定该镜像是基于 nginx:latest 镜像而构建的；
- COPY  [本地文件] [镜像里的路径]  ---复制文件
### 构建image
使用docerFile构建镜像  image
Dockerfile文件的目录下执行
```javascript
docker build -t image-01 .
```
#### 查看镜像列表
docker image ls
### 运行容器 Containers
```javascript
docker run -d -p 3000:80 --name container-01 image-01
```

- -d 设置容器在后台运行
- -p 表示端口映射，把本机的 3000 端口映射到 container 的 80 端口，这样外网就能通过本机的 3000 端口访问了
- --name 设置容器名 container-01
- image-01 是我们上面构建的镜像名字


#### 查看运行容器列表
##### 命令方式
```javascript
docker ps -a
```
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281356148.png)
##### 软件方式
> 软件里Containers列表可以看到已经启动

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281356362.png)
#### 暂停容器
```javascript
docker stop  [container-name]
```
