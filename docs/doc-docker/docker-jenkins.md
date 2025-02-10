# docker安装使用jenkins

## 安装node

启动容器后，安装node

```
 curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash;
 source ~/.nvm/nvm.sh;
 nvm install 22;
 nvm use 22;
 npm i pnpm pm2 -g;
```

运行后，看日志，拿到初始密码

### 进入web管理页面

外网地址:12180，按推荐安装插件

第一次打开页面，输入密码
密码在 cat /var/jenkins_home/secrets/initialAdminPassword

下一步，**安装推荐的插件**
<img src="https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281350376.png" alt="image.png" style="zoom:50%;" />

提示某些插件下载失败（如SSH Build Agents）就先跳过

进入系统再设置源 解决下载错误的问题

#### 设置源

在插件管理-高级进行设置源

```javascript
https://updates.jenkins.io/update-center.json
http://mirror.esuni.jp/jenkins/updates/update-center.json
```

<img src="https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281350297.png" alt="image.png" style="zoom:50%;" /><img src="https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281405332.png" alt="image.png" style="zoom: 50%;" />

## github生成token

<img src="https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281402283.png" alt="image.png" style="zoom:50%;" />

勾选

- [x] repo

- [x] admin:repo_hook
  <img src="https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281350365.webp" style="zoom:50%;" />

#### jenkins-测试github服务连接

找到系统设置-系统配置-滑下去，找到github

点击添加github服务器

点击添加

<img src="https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281402891.png" alt="image.png" style="zoom:50%;" />

选择secret text

输入 secret（github的token），

描述最好也写上，起个备注作用
`![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281402773.png)

点击测试，没报红则测试通过
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281402337.png)

---

## 安装node插件

1. 安装 NodeJS 插件
   登录 Jenkins 管理界面，点击 “管理 Jenkins”。
   在管理页面中，选择 “插件管理”。
   切换到 “可选插件” 标签页，在搜索框中输入 “NodeJS Plugin”。
   勾选该插件后，点击 “直接安装”，安装完成后可选择重启 Jenkins 以使插件生效。

2. 配置 Node.js 环境
   进入全局工具配置页面：在 Jenkins 管理界面，点击 “管理 Jenkins”，然后选择 “全局工具配置”。
   添加 Node.js 安装项：在页面中找到 “NodeJS” 部分，点击 “新增 NodeJS” 按钮。
   设置 Node.js 名称：在 “名称” 字段中为你要配置的 Node.js 环境起一个便于识别的名字，例如 “Node.js 18 LTS” 。

3. 在 Jenkins 任务中使用配置好的 Node.js 环境
   创建或编辑 Jenkins 任务：在 Jenkins 主页，点击要配置的任务名称，然后选择 “配置”。
   设置构建环境：在任务配置页面中，找到 “构建环境” 部分，勾选 “Provide Node & npm bin/folder to PATH” 。这一步会将配置好的 Node.js 和 npm 的可执行文件路径添加到 Jenkins 构建任务的环境变量 PATH 中，这样在后续的构建步骤中就可以直接使用 node 和 npm 命令。

## 新建任务

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

使用shell

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

## shell示例

#### docker jenkins next shell

```bash
APP_NAME="my-app"
# 定义错误处理函数
handle_error() {
    local error_message=$1
    echo "【ERROR】 $error_message"
    exit 1
}

echo "清理本地代码并拉取最新代码..."
git reset --hard origin/main || handle_error "Git reset 失败"
git clean -df || handle_error "Git clean 失败"
git pull origin main || handle_error "首次 Git pull 失败"
git checkout main || handle_error "Git checkout 失败"
git pull origin main || handle_error "二次 Git pull 失败"

git status

node -v
npm i pnpm pm2 -g
pnpm i

pm2 stop $APP_NAME || true
pm2 delete $APP_NAME || true
pm2 start npm --name $APP_NAME -- run start -- --port 3100 ||  handle_error "pm2 start failed"

echo "保存 PM2 进程列表..."
pm2 save || handle_error "PM2 保存进程列表失败"
```
