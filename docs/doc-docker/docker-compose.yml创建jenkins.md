[https://juejin.cn/post/6844904006184091662](https://juejin.cn/post/6844904006184091662)

linux环境
目录如下
/home/jenkins 
- docker-compose.yml 
- jenkins-home
 docker-compose.yml 
```ruby
version: '3'                                    # 指定 docker-compose.yml 文件的写法格式
services:                                       # 多个容器集合
  docker_jenkins: 
    user: root                                  # 为了避免一些权限问题 在这我使用了root
    restart: always                             # 重启方式
    image: jenkins/jenkins:lts                  # 指定服务所使用的镜像 在这里我选择了 LTS (长期支持)
    container_name: jenkins                     # 容器名称
    ports:                                      # 对外暴露的端口定义
      - '8080:8080'
      - '50000:50000'
    volumes:                                    # 卷挂载路径
      - /home/jenkins/jenkins_home/:/var/jenkins_home   # 这是我们一开始创建的目录挂载到容器内的jenkins_home目录
      - /var/run/docker.sock:/var/run/docker.sock
      - /usr/bin/docker:/usr/bin/docker                 # 这是为了我们可以在容器内使用docker命令
      - /usr/local/bin/docker-compose:/usr/local/bin/docker-compose     # 同样的这是为了使用docker-compose命令
```

执行
cd /home/jenkins
docker-compose up -d
即可创建容器
