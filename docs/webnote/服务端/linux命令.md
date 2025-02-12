# linux命令

<https://github.com/jaywcjlove/linux-command>

<https://wangchujiang.com/linux-command/>

<https://www.linuxcool.com/>

```
netstat -nplt

nginx -t

nginx -s reload

unzip xxx.zip

curl -i "http://localhost:8000"
```

## 一个端口部署多个单页面应用

test  应用1 base:/test/  publicPath:/test/

test2 应用2 base:/test2/  publicPath:/test2/

```txt
http {
    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        # http://localhost:80
        # location / {
            # root   /dist/;
            # index  index.html;
            # try_files $uri $uri/ /index.html;
        # }

        # http://localhost:80/test /test /test/ 都可以
        location  /test/ {
            alias   D:/Downloads/nginx-1.26.0/umi/;
            index   index.html;
            try_files $uri $uri/ /test/index.html;
        }

        # http://localhost:80/test2
        location  /test2 {
            alias   D:/Downloads/nginx-1.26.0/test2/;
            index   index.html;
            try_files $uri $uri/ /test2/index.html;
        }
   
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}

```

## location 匹配规则

location ^~ /html-demo：

匹配以 /html-demo 开头的任意 URI。这意味着不仅会匹配 /html-demo 本身，还会匹配 /html-demoabc、/html-demo/xyz 等。

location ^~ /html-demo/：

只匹配以 /html-demo/ 开头的 URI，也就是 /html-demo 后面必须紧跟一个斜杠。它会匹配 /html-demo/、/html-demo/xyz，但不会匹配 /html-demoabc。
