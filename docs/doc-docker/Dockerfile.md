
```javascript
FROM nginx
RUN echo '这是一个本地构建的nginx镜像' > /usr/share/nginx/html/index.html
```

```javascript
FROM centos
RUN yum -y install wget \
    && wget -O redis.tar.gz "http://download.redis.io/releases/redis-5.0.3.tar.gz" \
    && tar -xvf redis.tar.gz
```

```javascript
# 定义父镜像
FROM centos:7
# 定义作者信息
MAINTAINER weiwei.xu <1900919313@qq.com>
# 执行安装vim命令
RUN yum -y install vim
# 定义默认的工作目录
WORKDIR /usr
# 定义容器启动执行的命令
CMD /bin/bash

作者：不为往事扰，余生只爱
链接：https://juejin.cn/post/6844904167987740686
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

上传镜像
docker pull xxxsjan/my-image:1.0

## 容器转为镜像

- 容器转为镜像

docker commit 容器id 镜像名称:版本号 复制代码

- 将镜像压缩

docker save -o 压缩文件名称 镜像名称:版本号 复制代码

- 将压缩文件还原为镜像

docker save -i 压缩文件名称
