# docker安装使用jenkins



### 进入web管理页面

1、按推荐安装插件

2、密码在 cat /var/jenkins_home/secrets/initialAdminPassword

下一步，**安装推荐的插件**


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

## 添加github token

1、找到 系统设置- 系统配置 -

2、滑下去，找到github

3、点击添加github服务器

4、点击添加

<img src="https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281402891.png" alt="image.png" style="zoom:50%;" />

选择secret text

输入 secret（github的token），

描述最好也写上，起个备注作用，

点击添加，返到上一层

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

```bash
#输入几个测试命令
pwd
ls
echo $PATH
```



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
pm2 save
pm2 restart $APP_NAME
```





## ssh密钥登录服务器

1、jenkins 服务器 生成 密钥 ssh-keygen -t rsa -b 4096 -C "<your_email@example.com>"，密钥会生成在 ~/.ssh 目录下
2、查看内容 cat ~/.ssh/id_rsa.pub，复制内容 追加粘贴到目标服务器 ~/.ssh/authorized_keys  或者 ssh-copy-id root@66.22.33.97
3、目标服务器：cat ~/.ssh/authorized_keys 就可以看到添加进去了
4、安装 SSH Agent 插件 ，重启
5、去到凭证管理，随便点个域，再点 Add Credentials，

- 类型选择 SSH Username with private key，
- 在 “Username” 字段中输入目标服务器的用户名。
- 在 “Private Key” 部分，选择 “Enter directly”，然后将之前生成的私钥文件（id_rsa）的内容复制到文本框中。
- 可以根据需要填写 “ID” 和 “Description” 字段，然后点击 “OK” 保存。
6、在 Jenkins 任务的配置页面中，找到 “Build Environment” 部分，勾选 “Use secret text (s) or file (s)”，新增 SSH User Private Key， 添加的 SSH 密钥凭据。
7、在 “Build” 部分，点击 “Add build step” -> “Execute shell”（如果是 Linux 服务器）或 “Execute Windows batch command”（如果是 Windows 服务器）。在命令框中输入 SSH 命令，例如：

```
ssh root@11.22.33.44 <<\EOF
  touch "/www/dk_project/dk_app/jenkins/$(date +"%Y%m%d%H%M%S").txt"
EOF
```



## nodejs插件 使用pm2 start不生效

> 均为自测结论，无科学依据
>

如果使用了pm2，任务中的node环境安装的pm2会随构建结束而销毁（测了几遍得出来的结论）

但如果，外部环境（jenkins所在环境）有node，且安装了pm2，则正常

### 解决方法1：

只用一个node环境，不使用插件了，但要定义环境变量

安装node

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash;
source ~/.nvm/nvm.sh;
nvm install 22;
nvm use 22;
```



```bash
# 如果需要获取外部环境，需要export
export PATH=~/.nvm/versions/node/v22.13.1/bin:$PATH

#如果pm2 start还有问题，可以再补一个pm2 restart
# pm2 start npm --name "my-app" -- run dev
# pm2 save
```

### 解决方法2

1、外部安装node，全局安装pm2
2、任务内部也全局安装pm2，且pm2 start后要pm2 save

- save会把信息保存到外面的pm2里（[PM2] Successfully saved in /root/.pm2/dump.pm2）

```bash
# 任务里 执行 shell
npm i pm2 -g
```
