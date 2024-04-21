# https部署证书



https://www.bilibili.com/video/BV1dX4y137Z5



获取证书crt和私钥key文件

放到/web/ssl下

去到nginx配置443端口

```
server {
 listen 80;
 root ikun.com;
 index index.html;
 server_name ikun.com www.ikun.com;
 return 301 https://ikun.com$request_uri;
}
server{
 listen 443 ssl;
 root ikun.com;
 index index.html
 server_name ikun.com www.ikun.com;
 
 ssl_certificate /web/ssl/xxxx.crt;
 ssl_certificate_key /web/ssl/xxxx.key;
 
}
```

