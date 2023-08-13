[https://mp.weixin.qq.com/s/R9wfbPSZgUOCMs9TBk3Jpw](https://mp.weixin.qq.com/s/R9wfbPSZgUOCMs9TBk3Jpw)

### docker文档
[https://www.coonote.com/docker/docker-cmd-manual.html](https://www.coonote.com/docker/docker-cmd-manual.html)
### 安装镜像
docker pull daocloud.io/library/mysql:8.0.20

 [更多版本](https://hub.daocloud.io) 

### 启动MySQL镜像
image --> container
> 即生成容器

换行写法

```json
docker run -d \ 
-p 3306:3306 \ 
--name mysql57 \ 
-v ~/mysql/data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=123456 \
--privileged=true \ 
be0dbf01a0f3(mysql镜像ID)
```
一行写法
docker run -d  -p 3306:3306  --name mysql57 -v ~/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 459651132a11

docker run -d  -p 3306:3306  --name mysql57 -v /mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 [image-id]
##### options如下
```json
-P: 随机端口映射，容器内部端口随机映射到主机的端口

-p: 指定端口映射，格式为：主机(宿主)端口:容器端口

-t: 为容器重新分配一个伪输入终端，通常与 -i 同时使用；

--name="nginx-lb": 为容器指定一个名称；

--dns 8.8.8.8: 指定容器使用的DNS服务器，默认和宿主一致；

--dns-search example.com: 指定容器DNS搜索域名，默认和宿主一致；

-h "mars": 指定容器的hostname；

-e username="ritchie": 设置环境变量；

--env-file=[]: 从指定文件读入环境变量；

--cpuset="0-2" or --cpuset="0,1,2": 绑定容器到指定CPU运行；

-m :设置容器使用内存最大值；

--net="bridge": 指定容器的网络连接类型，支持 bridge/host/none/container: 四种类型；

--link=[]: 添加链接到另一个容器；

--expose=[]: 开放一个端口或一组端口；

--volume , -v: 绑定一个卷
```
### 查看容器列表 id
docker ps -a
### 删除容器

```json
删除之前需要stop：
docker stop bac2692e2b9a(容器ID)

删除
docker rm bac2692e2b9a(容器ID：docker ps获取)
```

### 进入容器内部
```json
docker exec -it bac2692e2b9a(容器ID) sh(指定进入方式 或者 bash /bin/bash)

docker exec -it bac2692e2b9a sh
```
### 查看MySQL容器日志
```json
docker logs -f(查看最后几条)  bac2692e2b9a(容器ID)
```
### 重启容器
```json
docker restart bac2692e2b9a(容器ID)
```

### 重启后数据丢失
-v 和 -mount都可以解决
#### 通过-v
 -v /windows盘符/指定的文件夹路径:/var/lib/mysql
docker run -d  -p 3306:3306  --name mysql57 -v /d/docker/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 459651132a11



![docker inspect [容器id]](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281353623.png)





#### 通过-mount
[https://www.codenong.com/cs105884941/](https://www.codenong.com/cs105884941/)
docker run --name  mysql_mount -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 --mount type=bind,src=/d/docker/mysql/conf/my.cnf,dst=/etc/mysql/my.cnf --mount   type=bind,src=/d/docker/mysql/data,dst=/var/lib/mysql -d 459651132a11
##### docker inspect [容器id]  可查看
```json
 "Mounts": [                                      
     {                                            
         "Type": "bind",                          
         "Source": "/d/docker/mysql/conf/my.cnf", 
         "Destination": "/etc/mysql/my.cnf",      
         "Mode": "",                              
         "RW": true,                              
         "Propagation": "rprivate"                
     },                                           
     {                                            
         "Type": "bind",                          
         "Source": "/d/docker/mysql/data",        
         "Destination": "/var/lib/mysql",         
         "Mode": "",                              
         "RW": true,                              
         "Propagation": "rprivate"                
     }                                            
 ],                                               
```


![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281353266.png)



电脑重启后依旧存在，解决
相关问题
[http://t.zoukankan.com/T-FQlin-p-9294208.html](http://t.zoukankan.com/T-FQlin-p-9294208.html)