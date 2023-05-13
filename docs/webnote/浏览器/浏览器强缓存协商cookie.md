# **浏览器强缓存协商cookie**

## 强缓存

**expries、cache-control**

- 非no-cache，也就是max-age的设置，有文件  走200，不发请求
- no-cache  会发请求，根据服务端响应，如果不携带body， 状态码304，就使用缓存
- no-store    不走强缓存

- public  浏览器和中间代理可以缓存
- private 只有浏览器可以缓存

​       ---所以上面两个（public、private）和浏览器没什么关系，浏览器有权限缓存

- max-age 浏览器缓存时长
- s-maxage  代理服务器缓存时长，与浏览器无关

**url输入请求资源，强缓存会清除，协商缓存还在**

|                       | 强缓存 | 协商缓存 |
| --------------------- | ------ | -------- |
| f5 、点刷新、ctrl r   | ✔️      | ✔️        |
| ctrl f5 ，ctrl shit r | ❌      | ❌        |

## 协商缓存

etag、if-none-match

last-modify if-modified-since

## cookie

### domain

a.com a是二级，com是顶级  只能a.com访问该cookie

.a.com  a.com及其子域可以访问该cookie

手动设置的话

document.cookie ="domain=a.com"  其实设置的是```.a.com``` 这个注意

document.cookie ="domain=.a.com" 设置的是```.a.com``` 这个正常

### path

a.com 设置path 为 /  ： 就是a.com/xxx/xxx  都可以访问该cookie

a.com 设置path 为 /a ：a.com/a才能访问该cookie

### expries 、max-age

max-age优先级大于expries

expries是过期的时间点

max-age是设置多少秒后过期

### httponly

设置则为仅http访问，js拿不到，只能通过set-cookie设置

### secure

告诉浏览器这个cookie只能用作https传输，http下可看到，但他不传输

### samesite

**none**

无论是否跨站都发cookie,  同时需要设置secure，浏览器才会认为他是有效的设置

例子：

a.com设置了cookie，b.com向a.com发送请求，会把cookie发给a.com，a服务器会以为请求是来源a，这很危险

 **lax**

默认值，只允许部分请求下跨站请求可以发cookie

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305131330435.png)

**strict**

跨站不发送
