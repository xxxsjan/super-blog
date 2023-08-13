[https://juejin.cn/post/6870371104335069192#heading-27](https://juejin.cn/post/6870371104335069192#heading-27)
菜鸟
[https://www.runoob.com/docker/docker-command-manual.html](https://www.runoob.com/docker/docker-command-manual.html)

### 镜像市场
[https://hub.daocloud.io/](https://hub.daocloud.io/)
[https://hub.docker.com/search?q=](https://hub.docker.com/search?q=)
### 镜像操作
#### 查找
docker search nginx
```
docker search images_name       # 查看仓库的镜像资料
docker pull images_name         # 下载镜像
docker images                   # 显示本地镜像
docker rmi images_name/image_id # 删除本地镜像
```
#### Dockerfile创建
docker build -t image-01 .
#### 
### 容器的命令
```
docker ps        #查看当前运行的容器
docker ps -a     #查看存在的所有容器
docker stop      #停止容器
docker start     #运行容器
docker restart   #重启容器
docker rm container_id/container_name #删除容器
docker logs [options] container_id/container_name     #查看容器日志，出错或者调试可用
docker exec -it container_id/container_name [/bin/bash 或者 sh]  #进入容器分配一个终端/bin/bash，不存在就用sh
exit #在容器内部 
docker commit container_id/container_name # 将容器
```
#### 创建容器
docker run -d -p 80:80 [image-name]
docker run -dp 80:80 [image-name]
docker run -d -p 3000:80 --name [custom-container-name] [image-name]
##### -v 选项（volumes）
本地路径:容器路径
/D/docker:/home/jenkins   ===>  windows d盘
test-dir  ===>   windows在\\wsl.localhost\docker-desktop-data\data\docker\volumes\_data
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281355094.png)


#### 检查container
[https://www.cnblogs.com/ivictor/p/4834864.html](https://www.cnblogs.com/ivictor/p/4834864.html)
 docker inspect 7dcfa72f17a1d64350ed73e6d6c918bad5679d12e38b202bcf3d21fd4f5b5f54
Mounts下可以看到 之前-v设置的映射路径
```json
 "Mounts": [                                
     {                                      
         "Type": "bind",                    
         "Source": "/mysql/data",           
         "Destination": "/var/lib/mysql",   
         "Mode": "",                        
         "RW": true,                        
         "Propagation": "rprivate"          
     }                                      
 ],                                         
```

#### 进入容器
docker exec -it bac2692e2b9a(容器ID) sh(指定进入方式 或者 bash /bin/bash)
docker exec -it bac2692e2b9a sh
### 卷的操作
```
#查看本地volume
docker volume ls
#删除指定volume
docker volume rm volume_id/volume_name
#删除所有的volume
docker volume prune
```
### network
```
#查看docker中存在的网络
docker network ls

#查看网络的详细信息
docker network inspect

#自定义网络（默认是bridge类型）
docker network create front-net

#将容器web1 和 web2 加入网络，这样容器web1 和 web2 用这个来两个名字就能互相ping同，会自动进行DNS解析
docker network connect front-net web1
docker network connect front-net web2

#断开连接
docker network disconnect front-net web1
docker network disconnect front-net web2

使用网络

```

# Dockerfile
[https://juejin.cn/post/6844904167987740686](https://juejin.cn/post/6844904167987740686)
#### 命令
>  nginx:v3（镜像名称:镜像标签）

```vue
docker build -t nginx:v3 .
```
#### 例子
##### node
使用官方 Node.js 轻量级镜像[https://hub.docker.com/_/node](https://hub.docker.com/_/node)
```vue
FROM node:16-slim
# 定义工作目录
WORKDIR /usr/src/app
# 将本地代码复制到工作目录内
COPY ./ ./
RUN npm install
# 安装 pm2
RUN npm install pm2 -g
# 启动服务
CMD pm2-runtime 'npm start'
```
##### maven
```vue
FROM maven:3.5-jdk-8-alpine as builder

# Copy local code to the container image.
WORKDIR /app
COPY pom.xml .
COPY src ./src

# Build a release artifact.
RUN mvn package -DskipTests

# Run the web service on container startup.
CMD ["java","-jar","/app/target/father-backend-0.0.1-SNAPSHOT.jar","--spring.profiles.active=prod"]
```
##### nginx
```vue
FROM nginx

WORKDIR /usr/share/nginx/html/
USER root

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist  /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```
##### java
```vue
FROM java:8

VOLUME /tmp

ADD ./target/code-nav-mp-server-0.0.1.jar code-nav-mp-server.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "code-nav-mp-server.jar", "--spring.profiles.active=prod"]

```


## 占用端口则删除容器
#删除已建的容器，防止容器名，端口冲突
```bash
if docker ps -a|grep -i container-name;then
   docker rm -f container-name
fi
```
镜像新增同名，不会删除，只会把原来的变为none
需要手动删除
```bash
echo ---------------Clear-Images...------------------
clearImagesList=$(docker images -f "dangling=true" -q)
if [ ! -n "$clearImagesList" ]; then
echo "no images need  clean up."
else
docker rmi $(docker images -f "dangling=true" -q)
echo "clear success."
fi
```

## docker命令基础

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