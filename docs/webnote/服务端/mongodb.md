# mongodb



## docker创建副本集



### 宝塔默认

```
services:
  mongodb_S4Yj:
    image: mongo:7.0.12
    #    container_name: ${CONTAINER_NAME}
    deploy:
      resources:
        limits:
          cpus: ${CPUS}
          memory: ${MEMORY_LIMIT}
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${USERNAME}
      MONGO_INITDB_ROOT_PASSWORD: ${PASSWORD}
    ports:
      - ${HOST_IP}:${SERVICE_PORT}:27017
    volumes:
      - ${APP_PATH}/data:/data/db
    labels:
      createdBy: "bt_apps"
    networks:
      - baota_net

networks:
  baota_net:
    external: true
    
    
VERSION=7.0.12
CONTAINER_NAME=CONTAINER_NAME
HOST_IP=0.0.0.0
SERVICE_PORT=27017
USERNAME=mongodb
PASSWORD=riSYinCCinzEzjNA
CPUS=0
MEMORY_LIMIT=0MB
APP_PATH=/www/dk_project/dk_app/mongodb/mongodb_S4Yj

```



### compose

```
services:
  mongo1:
    image: mongo:7.0.12
    container_name: mongo1
    networks:
      - mongo-network
    environment:
      MONGO_INITDB_ROOT_USERNAME: mongodb
      MONGO_INITDB_ROOT_PASSWORD: riSYinCCinzEzjNA
    ports:
      - "0.0.0.0:27017:27017"
    volumes:
      - mongo1-data:/data/db
      - ./mongodb-keyfile:/data/keyfile/mongodb-keyfile
    command: --replSet rs0 --keyFile /data/keyfile/mongodb-keyfile

  mongo2:
    image: mongo:7.0.12
    container_name: mongo2
    networks:
      - mongo-network
    environment:
      MONGO_INITDB_ROOT_USERNAME: mongodb
      MONGO_INITDB_ROOT_PASSWORD: riSYinCCinzEzjNA
    ports:
      - "0.0.0.0:27018:27017"
    volumes:
      - mongo2-data:/data/db
      - ./mongodb-keyfile:/data/keyfile/mongodb-keyfile
    command: --replSet rs0 --keyFile /data/keyfile/mongodb-keyfile

  mongo3:
    image: mongo:7.0.12
    container_name: mongo3
    networks:
      - mongo-network
    environment:
      MONGO_INITDB_ROOT_USERNAME: mongodb
      MONGO_INITDB_ROOT_PASSWORD: riSYinCCinzEzjNA
    ports:
      - "0.0.0.0:27019:27017"
    volumes:
      - mongo3-data:/data/db
      - ./mongodb-keyfile:/data/keyfile/mongodb-keyfile
    command: --replSet rs0 --keyFile /data/keyfile/mongodb-keyfile
  
networks:
  mongo-network:

volumes:
  mongo1-data:
  mongo2-data:
  mongo3-data:
```

### 创建keyfile

需要再docker compose yaml相同目录下执行

```
openssl rand -base64 756 > mongodb-keyfile

sudo chmod 600 mongodb-keyfile
sudo chown 999:999 mongodb-keyfile

# 999 可以进到容器里 cat /etc/passwd 查看mongo用户组

sudo cat ./mongo-keyfile

ls -l  查看权限

```

### 创建容器

```
docker-compose down -v

docker-compose up -d

docker logs mongo1

docker volume ls
```



### 初始化

```bash
mongosh -u mongodb -p riSYinCCinzEzjNA --authenticationDatabase admin

rs.initiate({
    _id: "rs0",
    members: [
        { _id: 0, host: "47.121.117.97:27017" },
        { _id: 1, host: "47.121.117.97:27018" },
        { _id: 2, host: "47.121.117.97:27019" }
    ]
})

rs.status()
```

###  连接

```
mongodb://mongodb:riSYinCCinzEzjNA@47.121.117.97:27017/?replicaSet=rs0
```

