
[(一) jenkins + GitHub 手把手教你实现项目及自动化部署](https://www.bilibili.com/read/cv16633755)
[（一）jenkins + GitHub 实现项目自动化部署 | Laravel China 社区](https://learnku.com/articles/44764)
[https://www.jianshu.com/p/343bdd43c82a](https://www.jianshu.com/p/343bdd43c82a)
[一套真实前端开发环境搭建+可持续集成+自动化部署实践（第二篇 jenkins关联 GitHub自动打包部署） - 掘金](https://juejin.im/post/5c1a3282f265da61764ad51a)
[https://www.jianshu.com/p/6787a8b843d8](https://www.jianshu.com/p/6787a8b843d8)

## docker安装jenkins

### 创建容器

#### 单行

```
docker run  -d  --rm -u root -p 8080:8080  -v jenkins-data:/var/jenkins_home  -v /var/run/docker.sock:/var/run/docker.sock -v /d/docker/jenkins/home:/home  --name jenkins jenkinsci/blueocean
```

-rm 关闭后会移除容器

```
docker run  -d  -u root -p 8080:8080  -v jenkins-data:/var/jenkins_home  -v /var/run/docker.sock:/var/run/docker.sock -v /d/docker/jenkins/home:/home   --name jenkins jenkinsci/blueocean
```

#### 多行

```javascript
docker run \
  -d \
  --rm \
  -u root \
  -p 8080:8080 \
  -v jenkins-data:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v "$HOME":/home \
  jenkinsci/blueocean
```

搜索命令：docker search jenkinsci/blueocean
下载镜像：docker pull  jenkinsci/blueocean
新建容器：docker run  -d  --rm -u root -p 8080:8080  -v jenkins-data:/var/jenkins_home  -v /var/run/docker.sock:/var/run/docker.sock -v "$HOME":/home   jenkinsci/blueocean

"$HOME"会报错，待解决，可使用下面命令

docker run  -d  --rm -u root -p 8080:8080  -v jenkins-data:/var/jenkins_home  -v /var/run/docker.sock:/var/run/docker.sock -v /d/docker/jenkins/home:/home   --name jenkins jenkinsci/blueocean

#### Dockerfile创建（待完善）

docker build -t .

```javascript
FROM jenkinsci/blueocean

```

---

## 前置准备

#### github生成token

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281402283.png)

勾选repo、admin:repo_hook
![](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281350365.webp)

#### jenkins-测试github服务连接

找到系统设置
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281402494.png)

滑下去，找到github

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281402793.png)

点击添加github服务器
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281402891.png)

选择secret text   输入 secret（github的token），描述最好也写上，起个备注作用
`![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281402773.png)

点击测试，没报红则测试通过
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281402337.png)

---

## 首次进入jenkins

`http://localhost:8080`

### 输入密钥

第一次打开页面，输入密码
密码在 cat /var/jenkins_home/secrets/initialAdminPassword
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281403181.png)
下一步，**安装推荐的插件**
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281350376.png)

提示某些插件下载失败（如SSH Build Agents）就先跳过

进入系统再设置源 解决下载错误的问题

### 设置源

在插件管理-高级进行设置源

```javascript
https://updates.jenkins.io/update-center.json
http://mirror.esuni.jp/jenkins/updates/update-center.json
```

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281350297.png)![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281405332.png)

创建用户或者使用管理员继续
> 管理员账号：admin 密码为上面那个密码

下一步叫你重启，确认，等待

## 开始使用

### 新建任务

相关视频

<https://www.bilibili.com/video/BV1zM41127hC/?spm_id_from=333.337.search-card.all.click&vd_source=11e14f37a256537712e73b4b7f52411c>

左侧新建任务
输入任务名，例如test，选择构建自由风格项目（自定义）

#### general

设置git地址

#### 源码管理

点击git

填写地址

添加用户
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281403579.png)

类型、用户名、密码和描述，填完

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281403817.png)

并且选择监听分支

默认是master，我的是main

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281403009.png)

#### 构建触发器

设置轮询      **** *   表示每分钟，星号之间要一个空格

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281403841.png)

#### 构建环境

勾选**Use secret text(s) or file(s)**

**绑定里添加secret text，就是之前github生成的token**

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281403334.png)

#### 构建

----使用shell

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281404626.png)

输入几个测试命令试试水

```javascript
pwd
ls
echo $PATH
```

#### 构建后的操作

这里可以做一些打包结果上传服务器的操作

这里跳过，不操作 点击保存
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281351835.png)

### 构建

回到首页，看到任务test已经出现了，点击test的名称
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281351172.png)

进去后看左侧，点击立即构建

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281404339.png)

然后下方出现构建的列表

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281404268.png)
点击对应数字，可以进去看详情

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281351774.png)
点击左侧的控制台输出，看到shell的测试命令有输出
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281404390.png)

### 继续使用-shell脚本

点击任务，点击配置，可再次设置配置
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281351750.png)
构建下的shell修改一下
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281404145.png)

示例shell

作用是压缩项目代码，解压放到nginx代理的html目录

```javascript
echo $PATH
node -v
npm -v #检查编译环境
npm install chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver
npm install 
npm run build #编译项目
cd dist
tar -zcvf dist.tar.gz * #所有文件压缩
tar -zxvf /root/.jenkins/workspace/test/dist/dist.tar.gz -C /usr/share/nginx/html #压缩文件解压到nginx映射目录
cd /root/.jenkins/workspace/vue-online-admin 
rm -R dist #删除项目打包后的残留
```

## 目录说明

/var/jenkins_home/workspace
nginx html位置
/usr/share/nginx/html
git项目拉取目录
/var/jenkins_home/workspace/test
