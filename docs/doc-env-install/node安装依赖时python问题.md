# node安装依赖时python问题

### sass说没python

gyp verb check python checking for Python executable "python2" in the PATH

意思是找不到python2，也就是没安装python环境

**使用限制：node版本16.15**

#### 方法一：

https://blog.csdn.net/zhao97/article/details/109203025

```plain
npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass
```

https://www.yuque.com/shenmingkai/notes/hf4bq7

#### 方法二：

```plain
npm install --global --production windows-build-tools
npm install --global windows-build-tools
yarn global add windows-build-tools
```

#### 方法三：

windows-build-tools装不了的话，可以去C:\Users\admin\.windows-build-tools

这个目录，点击python安装包进行安装

记得选择添加环境变量，

##### 安装python27

安装时记得选Add python.exe to Path>>Entire feature will be installed on local hard drive

选上了会把安装目录添加到环境变量



------

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304291744719.png)

假如错过了可以**手动设置环境变量**

右键我的电脑--属性--高级系统设置--环境变量：

系统变量，PATH，添加C:\Python27

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304291743071.png)

###### 检验安装结果

python -V

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304291744819.png)



##### vs_buildtools

另一个vs_buildtools也要操作

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304291744148.png)

点击打开，点击修改，单个组件，搜索node，结果就一个，勾选完，右下角确认（下载）

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304291744405.png)





### 其他

https://blog.csdn.net/wangtao88888888/article/details/106681641



### 报错：需要python3

共存方式

https://blog.csdn.net/weixin_44953600/article/details/107638692

https://www.jianshu.com/p/fe327b72fa31

miniconda会小一点,50m

anaconda 要600m

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304291744923.png)



安装2 3其实改一个就好，以你喜欢的为python，

比如你想默认是2 那2的exe就python不改，pip也不用刷新安装了，pip2 -V是不会报错的

pip3 -V就会报错

这时你可以

python3 -m pip install --upgrade pip --force-reinstall

这样pip3 -V也能用了