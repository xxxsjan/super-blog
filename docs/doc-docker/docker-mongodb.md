[https://hub.daocloud.io/repos/487751ba-45ef-49d6-833a-490dfaa5e08b](https://hub.daocloud.io/repos/487751ba-45ef-49d6-833a-490dfaa5e08b)
**library/mongo**
[Docker安装MongoDB及使用_你好啊cbw的博客-CSDN博客_docker mongdb](https://blog.csdn.net/qq_40454863/article/details/122165962)

### 启动 MongoDB 容器

#### 安装images且启动container

> ·docker run -d -p 27017:27017 --name example-mongo mongo:latest

会提示你本地没找到，他会自动从library/mongo下载（images）
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281358463.png)

#### 配置型写法
docker run -d  -p 27017:27017 --name mongodb -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=123456 mongo

#进入容器 
docker exec -it mongodb /bin/bash
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281358233.png)

#登录mongo，登录的数据库是admin数据库 

mongo 192.168.1.101:27017 -u 'admin' -p '123456' --authenticationDatabase 'admin'
mongo localhost:27017 -u 'admin' -p '123456' --authenticationDatabase 'admin'
> 用ip或者localhost都行

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281358569.png)

### mongodb操作
show dbs;  查看所有数据库
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281358823.png)
MongoDB常用操作

 >use shop创建并切换数据库
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281358958.png)
管理员身份创建用户，一个用户可以有多个角色，每个角色管理对应的数据库
管理员创建用户sh，分配数据库shop，该用户拥有的权限dbOwner 
#账号：sh
#密码：123456
#角色：dbOwner  对当前数据库有全部权限
#管理数据库：shop
>db.createUser({ user: 'sh', pwd: '123456', roles: [ { role: "dbOwner", db: "shop" } ] });
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281359214.png)
登录数据库
>use shop切换到shop数据库
>db.auth("sh","123456") 返回1表示sh登录成功，前提是给sh用户分配了数据库shop
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281359914.png)
查看所有数据库
> show dbs;
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281359218.png)
创建文档集合（表）
> db.createCollection("item")
没有权限，需要退出当前admin用户，重新登录mongodb，切换到shop数据库，再登录

连接本地mongo数据库，直接mongo指令即可，连接其它数据库，后面跟上ip即可

查看文档集合(查看有哪些表)：
> show tables;
>
> ![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281400552.png)
> 添加文档(向表item中添加数据)
> db.文档集合名称.insert(数据); _id是固定的，id值最好自己写且唯一，默认生成的无规则
> db.item.insert({_id:"No1",name:"华为Mate 40 Pro",price:8500})
> db.item.insert({_id:"No2",name:"华为Mate 40",price:6500})
> db.item.insert({_id:"No3",name:"华为Mate 40 Pro +",price:12500})

查询文档(查询指定数据表中所有数据)
> db.item.find()
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281401867.png)
分页查询()，跳过前2条记录，查询后两条记录
> db.item.find().skip(2).limit(2)
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281401798.png)
模糊查询（正则匹配）：db.item.find({列名:匹配规则})
> db.item.find({name:/Pro/})
> db.item.find({name:/^华为/}) 以华为开始的

精确查询
> db.item.find({_id:"No1"})

复杂查询：
db.item.find({name:/^华为/})                     以华为开始的
db.item.find({price:{$gt:7000}})              price>7000元，$gte则表示>=
db.item.find({price:{$lt:7000}})              price<7000元，$lte则表示<=
db.item.find({price:{$ne:8500}})              price!=8500
db.item.find({_id:{$in:["No1","No3"]}})       _id包含No1 No2的数据
db.item.find({_id:{$nin:["No1","No3"]}})      _id不包含No1 No2的数据
db.item.count()				      总条数查询，count({条件})
> db.item.count({price:{$lt:9000}}) 价格小于9000的总数

修改文档(修改数据)
自增操作：
db.item.update({_id:"No1"},{$inc:{price:1}})
指定列修改：
db.item.update({_id:"No1"},{$set:{name:"华为P40 Pro"}})

删除文档(删除数据)
> db.item.remove({_id:"No3"})

退出

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281400074.png)
————————————————

### 权限说明
read: 只能读取指定数据库
readWrite: 能读写指定数据库
dbAdmin: 能执行管理函数，如索引创建、删除，查看统计或访问 system.profile
dbOwner: 对当前数据库有全部权限
userAdmin: 能创建、删除和管理用户
clusterAdmin: 只能在 admin 数据库中可用，能赋予用户所有分片和复制集相关函数的管理权限
readAnyDatabase: 只能在 admin 数据库中可用，能赋予用户所有数据库的读权限
readWriteAnyDatabase: 只能在 admin 数据库中可用，能赋予用户所有数据库的读写权限
userAdminAnyDatabase: 只能在 admin 数据库中可用，能赋予用户所有数据库的 userAdmin 权限
dbAdminAnyDatabase: 只能在 admin 数据库中可用，能赋予用户所有数据库的 dbAdmin 权限
root: 只能在 admin 数据库中可用。超级权限


[
](https://blog.csdn.net/qq_40454863/article/details/122165962)
[
](https://blog.csdn.net/qq_40454863/article/details/122165962)
