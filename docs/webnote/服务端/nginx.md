# nginx

## 负载均衡

```
http {
 upstream asdadad {
  ip_hash;
        server 172.31.0.5:8080 weight=5;
        server 172.31.0.8:18083 weight=15;
        server 172.31.0.8:6666  backup; # 兜底服务器
    }
    server {
     location /api/ {
   proxy_pass http://asdadad; 
  }
    }
}
```

### 注意

/test/ 这种需要单页面部署的

需要使用alias，不能使用root

否则会使单页面应用刷新时500

因为

root是找设置的目录下找，比如访问/test/user ，try_files如下

- $uri /usr/share/nginx/html/test/test/user 找不到这个文件
- $uri/ /usr/share/nginx/html/test/test/user/ 当做目录也找不到这个文件
- /test/index.html 访问/test/index.html
  - $uri /usr/share/nginx/html/test/test/index.html 找不到
  - $uri/ /usr/share/nginx/html/test/test/index.html/ 找不到
  - /test/index.html 找不到

alias则是改别名，比如访问/test/user ，try_files如下

- $uri /usr/share/nginx/html/test 找不到这个文件
- $uri/ /usr/share/nginx/html/test/ 当做目录也找不到这个文件
- /test/index.html 访问/test/index.html
  - $uri /usr/share/nginx/html/test/index.html 找到了

个人理解，有错望指出
