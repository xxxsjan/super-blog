# Charles抓包



https://juejin.cn/post/6844904182588112904



## 下载Charles

https://www.charlesproxy.com/



## 抓取HTTPS协议

### 安装根证书

【Help】-->选择【SSL Proxying】，点击【install Charles Root Certificate 】

点击安装证书

选择本地计算机

勾选 将所有的证书都放入下列存储

选择 受信任的根证书颁发机构

点击 下一步

完成 导入成功



### 设置代理的端口

点击【Proxy】-->【SSL Proxying Settings...】 

勾选【Enable SSL Proxying】

include 点击【add】，

在Host输入【*】

在Prot输入【443】

点击 OK 保存





## 代理端口抓包



通过无线代理达到拦截



设置代理端口

【Proxy】-->【Proxy Settings】我们在设置下端口号“9999”；

手机设备 wifi连接里面

设置代理

输入电脑ip

端口为9999



## 手机https的抓取

1，点击顶部菜单栏【Help】-->选择【SSL Proxying】，点击【install Charles Root Certificate】安装Charles根证书即可； 

2，点击安装【Install Charles Root Certificate On a Mobile Device or Remote Browser】在移动设备上或远程浏览器安装证书即可；（这里和上面安装一样）

