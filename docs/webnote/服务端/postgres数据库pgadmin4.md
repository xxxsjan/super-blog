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

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304140851611.png)

- ## 连接server

<img src="https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304140851517.png" alt="img" style="zoom:50%;" />

<img src="https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304140851861.png" alt="img" style="zoom:50%;" />

<img src="https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304140851606.png" alt="img" style="zoom:50%;" />

默认username是postgres，password是上面设置的pg123456 注意，

因为pgadmin运行在[docker](https://cloud.tencent.com/product/tke?from=10680)里，所以host不能写localhost。

host.docker.internal代表[宿主机](https://cloud.tencent.com/product/cdh?from=10680)器，或者用宿主机IP。

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304140851704.png)

## 连接成功，完成
