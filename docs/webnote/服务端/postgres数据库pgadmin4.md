# pgadmin4管理mysql

## 使用pgadmin4

<https://cloud.tencent.com/developer/article/1679495>

```
docker pull dpage/pgadmin4
docker pull postgres

docker run -d -p 5432:5432 --name postgresql -v pgdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=pg123456 postgres

docker run -d -p 5433:80 --name pgadmin4 -e PGADMIN_DEFAULT_EMAIL=test@123.com -e PGADMIN_DEFAULT_PASSWORD=123456 dpage/pgadmin4

<http://localhost:5433/>
```

- 输入我们设置的邮箱test@123.com和密码123456，点击Login

![img](https://cdn.nlark.com/yuque/0/2022/png/28823371/1665052561393-64e80c63-4fd5-4d3a-af9b-d738fad66cc0.png)

- ## 连接server

<img src="https://cdn.nlark.com/yuque/0/2022/png/28823371/1665052561588-2083a757-3e74-4cde-b8e6-1e4b922186d3.png" alt="img" style="zoom:50%;" />

<img src="https://cdn.nlark.com/yuque/0/2022/png/28823371/1665052561413-3cafbac6-aebe-4796-8c97-572d5c62e1e5.png" alt="img" style="zoom:50%;" />

<img src="https://cdn.nlark.com/yuque/0/2022/png/28823371/1665052561393-81ebc1d7-8682-4059-9ab5-d9f328d18dfb.png" alt="img" style="zoom:50%;" />

默认username是postgres，password是上面设置的pg123456 注意，

因为pgadmin运行在[docker](https://cloud.tencent.com/product/tke?from=10680)里，所以host不能写localhost。

host.docker.internal代表[宿主机](https://cloud.tencent.com/product/cdh?from=10680)器，或者用宿主机IP。

![img](https://cdn.nlark.com/yuque/0/2022/png/28823371/1665052561381-97828694-6970-4599-af4f-6a06e51b6556.png)

## 连接成功，完成
