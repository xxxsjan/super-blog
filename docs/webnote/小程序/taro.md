# taro





## 路径问题注意

项目文件都得放在src目录下，比如不能把public放根目录

不然如果tabbar配置的png路径文件是在src之上的，目录，会导致输出png文件不成功

taro中public文件夹不是vue那种概念，不会原封不动移动的到输出目录

代码的根目录最多到src这一层