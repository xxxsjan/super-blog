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

登录 Jenkins 管理界面，点击左侧菜单中的 “新建任务”。
在 “输入任务名称” 框中输入你为该任务起的名称，比如 “vue - project - build”。
选择 “自由风格的软件项目”，然后点击 “确定”。

配置任务

- 源码管理

在任务配置页面中，找到 “源码管理” 部分，选择 “Git”。
Repository URL：输入远端 Vue 项目的 Git 仓库地址，例如 <https://github.com/yourusername/your-vue-project.git。>
Credentials：如果是私有仓库，点击 “添加” 按钮，选择合适的凭证类型。
如果使用 SSH 密钥，选择 “SSH Username with private key”，输入用户名和私钥内容；
如果使用访问令牌，选择相应的令牌类型并输入令牌信息。
如果是账户密码 ，选择 “Username with password”，输入用户名和密码。

并且选择监听分支，默认是master

- 构建触发器

设置轮询      **** *   表示每分钟，星号之间要一个空格

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281403841.png)

- 构建环境

勾选Use secret text(s) or file(s)
点击添加
选择secret text，
设置github生成的token

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281403334.png)

- 构建

使用shell

输入几个测试命令

```javascript
pwd
ls
echo $PATH
```

- 构建后的操作

这里可以做一些打包结果上传服务器的操作

这里跳过，不操作 点击保存

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

git log -1 --oneline --decorate origin/main

node -v
npm i pnpm pm2 -g
pnpm i

pm2 stop $APP_NAME || true
pm2 delete $APP_NAME || true
pm2 start npm --name $APP_NAME -- run start -- --port 3100 ||  handle_error "pm2 start failed"

echo "保存 PM2 进程列表..."
pm2 save || handle_error "PM2 保存进程列表失败"
```

### 使用ssh

- 安装 Publish Over SSH 插件
- 进入 Jenkins 的全局配置界面（Manage Jenkins -> Configure System）。
- 滚动页面找到 Publish over SSH -> SSH Servers
- 点击 Add 按钮添加一个新的 SSH 服务器配置：
- Name：为服务器配置起一个名称，例如 target-server。
- Hostname：输入目标服务器的 IP 地址或域名。
- Username：用于 SSH 连接的用户名。
- Remote Directory：指定远程服务器上的工作目录。
- Password/Key：如果你使用密码认证，输入对应的密码；若使用密钥认证，点击 Advanced 按钮，在 Key 字段中粘贴私钥内容。
- 点击 Test Configuration 按钮，确保能够成功连接到目标服务器。

打开你要配置的 Jenkins 任务，进入 Configure 页面。
滚动到 Build Environment 部分，勾选 Send files or execute commands over SSH after the build runs。
在 SSH Server 下拉菜单中选择之前配置好的服务器（如 target-server）。
在 Exec command 文本框中输入用于在目标服务器上创建文件的命令。以下是几种不同的创建文件方式及示例：

```
cd /www/dk_project/dk_app/jenkins
DATE=$(date +"%Y%m%d")
touch "/var/www/html/${DATE}.txt"
```
