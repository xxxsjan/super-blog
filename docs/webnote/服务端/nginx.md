# nginx



```
start nginx

tasklist /fi "imagename eq nginx.exe"

nginx -s stop  (快速停止nginx) 

或 nginx -s quit  (完整有序的停止nginx)

taskkill /f /t /im nginx.exe
```

## 代理静态文件

```
location /static/ {
	alias /var/www/static/;
}
location /images/ {
	alias /var/www/images/;
}

location /image/ {    
  root  /data/;     
  autoindex on;  # 请求目录时返回目录下的文件列表
}
```



## 反向代理

```
location /api/ {
	proxy_pass http://172.31.0.5:8080; 
}
```

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

