# wsl系统的文件目录位置



[https://javaforall.cn/136580.html](https://javaforall.cn/136580.html)

### wsl
ubuntu Linux子系统的目录是在这个目录下
C:\Users\用户名\AppData\Local\Packages\CanonicalGroupLimited.UbuntuonWindows_79rhkp1fndgsc\LocalState\rootfs


### wsl2
wsl2的套路变了，linux的文件系统整个是个镜像文件，启动系统后，这个文件系统映射到了 \\wsl$\系统名 下面
\\wsl$\Ubuntu-20.04\
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281355336.png)


## Linux访问windows文件
windows的磁盘被挂载到了/mnt下，可以直接访问
