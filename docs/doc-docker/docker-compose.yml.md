# docker-compose

## lobe compose

```
# https://github.com/lobehub/lobe - chat 项目源网址
version: '3.8'
services:
  lobe-chat:
    image: lobehub/lobe-chat # 容器映像
    container_name: lobe-chat # 容器名称
    networks:
      - bridge
    ports:
      - "3210:3210" # "服务器端口号:容器内端口号"
    environment: # 环境变量xxx
      - OPENAI_API_KEY=sk-xxxx # api密钥
      - OPENAI_PROXY_URL=https://api-proxy.com/v1 # api代理
      - ACCESS_CODE=lobe66 # 应用密码
    restart: always
networks:
  bridge:
    driver: bridge
```

## 宝塔jenkins插件的 compose

```
services:
  jenkins:
    image: jenkins/jenkins:lts
    ports:
      - "${JENKINS_HTTP_PORT:-12180}:8080"
      - "${TCP_PROXY_PORT:-15000}:50000"
    volumes:
      - ${JENKINS_DATA:-/www/dk_project/dk_app/dk_jenkins}/jenkins_home:/var/jenkins_home
    networks:
      - dk_jenkins_btnet

  ssh-agent:
    image: jenkins/ssh-agent
    networks:
      - dk_jenkins_btnet

networks:
  dk_jenkins_btnet:
    external: true
```
