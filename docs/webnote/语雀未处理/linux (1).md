负载均衡--upstream
```typescript
http{
upstream node {
 server 127.0.0.1:9001;
 server 127.0.0.1:9002;
 server 127.0.0.1:9003;
}
  server{
    listen    80;
    server_name localhost;
    location / {
     proxy_pass http://node
    }
  }
}
```
权重
```typescript
upstream node {
 server 127.0.0.1:9001 weight=3;
 server 127.0.0.1:9002 weight=2;
 server 127.0.0.1:9003 weight=1;
}
```
fail_timeout(秒)
```typescript
upstream node {
 server 127.0.0.1:9001 fail_timeout=30;
 server 127.0.0.1:9002 fail_timeout=20;
 server 127.0.0.1:9003 backup;
}
// backup：备用服务器
```
