[https://www.cnblogs.com/powerbear/p/15924858.html](https://www.cnblogs.com/powerbear/p/15924858.html)
### 拉取镜像image
docker pull nginx
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281355734.png)



## 创建容器

### dockerFile创建

docker build -t .

```bash
FROM nginx

WORKDIR /usr/share/nginx/html/
USER root

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./dist  /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### 命令行创建

#### 新建并启动container



docker run -d -p 80:80 --name nginx nginx
docker run -d -p 80:80  -v   /nginx/html:/usr/share/nginx/html    --name nginx   nginx
docker run -d -p 80:80 --name nginx   ubuntu/nginx
docker run -d -p 80:80  -v   /nginx/html:/usr/share/nginx/html    --name nginx   ubuntu/nginx



> - `-d`：这是选项，表示容器将在后台运行，而不会占用当前终端。
> - `-p 80:80`：这是用于指定容器端口映射的选项，将容器的 80 端口映射到主机的 80 端口。
> - `-v /nginx/html:/usr/share/nginx/html`：这是用于指定容器挂载目录的选项，将主机上 `/nginx/html` 目录挂载到容器中的 `/usr/share/nginx/html` 目录。
> - `--name nginx`：这是用于指定容器的名称的选项，将容器命名为 `nginx`。
> - `nginx`：这是用于指定要启动的 Docker 镜像的名称，即我们要在 Nginx 镜像上启动一个容器。





## docker命令

### 查看容器列表

docker ps （ `process status`  进程状态，-a 列出所有，包括没运行的）

或者

docker container ls

列出的images是镜像，name是容器名

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281356036.png)



### 进入容器

docker exec -it  【容器id}】 bash

或者软件里

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281356865.png)



### 复制文件

容器地址-->本机地址

docker cp    容器id:/etc/nginx/nginx.conf     /nginx/conf/ 

docker cp    容器id:/etc /nginx/conf.d/default.d     /nginx/conf.d/

### 复制文件夹 

##### 容器复制到wsl目录

docker cp my_container:/app/data /home/user/data

##### wsl目录复制到容器

docker cp /home/user/data my_container:/app/data

##### linux html例子

docker cp 容器id:/usr/share/nginx/html /nginx/html 



## nginx相关文件路径位置

ubuntu/nginx 配置文件路径参考



日志文件位置：/var/log/nginx/

配置文件位置：/etc/nginx/

index.html位置：/usr/share/nginx/html



或者是

默认安装到 **/usr/local/nginx**

配置文件路径：**/usr/local/nginx/conf/nginx.conf**



![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281356337.png)

###  


## linux命令
### 查找文件夹
find / -name file
### nginx配置文件
[找到nginx服务用的是哪个配置文件_yeluomen的博客-CSDN博客_nginx配置文件在哪](https://blog.csdn.net/sinat_24354307/article/details/124518927)

查看运行  ps -ef | grep nginx  
nginx -t  
### linux版本查询
cat /proc/version

### linux目录详解

[Linux 目录详解 - Coding十日谈 - 博客园](https://www.cnblogs.com/jfzhu/articles/12940175.html)


