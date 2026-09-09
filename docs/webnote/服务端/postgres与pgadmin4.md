# Postgres 与 pgAdmin4

## 使用 pgAdmin4

参考：<https://cloud.tencent.com/developer/article/1679495>

```bash
docker pull dpage/pgadmin4
docker pull postgres

docker run -d -p 5432:5432 --name postgresql -v pgdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=pg123456 postgres

docker run -d -p 5433:80 --name pgadmin4 -e PGADMIN_DEFAULT_EMAIL=test@123.com -e PGADMIN_DEFAULT_PASSWORD=123456 dpage/pgadmin4
```

访问：<http://localhost:5433/>

- 使用设置的邮箱 `test@123.com` 和密码 `123456` 登录

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304140851611.png)

## 连接 Server

<img src="https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304140851517.png" alt="img" style="zoom:50%;" />

<img src="https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304140851861.png" alt="img" style="zoom:50%;" />

<img src="https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304140851606.png" alt="img" style="zoom:50%;" />

默认 username 是 `postgres`，password 是上面设置的 `pg123456`。

因为 pgAdmin 运行在 Docker 里，host 不能写 `localhost`。

`host.docker.internal` 代表宿主机，或直接用宿主机 IP。

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304140851704.png)

## 连接成功
