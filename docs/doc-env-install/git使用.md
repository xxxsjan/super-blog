### git

### git 流程图

[https://www.bilibili.com/video/av75718460](https://www.bilibili.com/video/av75718460)

### 全局 配置

```
git config --global user.name "xxxsjan"
git config --global user.email "626653354@qq.com"
git config --list
// 移除配置
git config --global --unset user.name
git config --global --unset safe.directory D:/aa/bbb/cccc
git config --global --unset-all safe.directory
// 编辑
git config --global --edit
:wq保存退出
:q退出
:q!强制退出
```

配置当前当前 fork 的仓库的原仓库地址
git remote add upstream <原仓库 github 地址>

fork 相关操作

[https://zhuanlan.zhihu.com/p/467670042](https://zhuanlan.zhihu.com/p/467670042)

### 创建仓库

#### 没仓库

```javascript
mkdir vue-eleui
cd vue-eleui
git init
touch README.md    #新建文件
git add README.md    #添加暂存
git commit -m "first commit"  #提交本地仓库
git remote add origin https:xxxxxxxxxxxxxxxx   
git push -u origin master
```

#### 有项目没仓库

```javascript
打开项目根目录
git init
git add .
git commit -m "本地项目提交"
#绑定码云
git remote add origin https:xxxxxxxxxxxxxxxx  
#在码云上新建master主分支,并推送
git push -u origin master
```

#### 已有仓库

```
项目根目录
git remote add origin https:xxxxxxxxxxxxxxxx
git push -u origin master
```

### 常用命令

```sh
提交分支
远程没有分支
git push -u origin 新分支
有分支直接 git push
git init  #初始化git
git add .    #添加
git commit -m "你要添加的日志"  #可以不写
git commit -am "你要添加的日志"  #可以不写git add直接提交
#和自己的仓库简历远程连接，链接可以在你的github仓库中获得
git remote add origin https://github.com/xxx/xxx 
git pull orgin master    //从master 拉取
git push -u origin master  // 推送到master

#查看远程仓库地址
git remote -v
#修改远程仓库地址（方法一）
git remote origin set-url https://gitee.com/sjan233/shop_uniapp.git
#先删后改（方法二）
git remote rm origin
git remote add origin https://gitee.com/sjan233/bgsystem_byvueeleadmin

rm -rf .git/  #删除当前路径下的 git仓库
git branch  #Git分支
git branch -a #查看远程分支
git status  #git查看状态
git add .   #添加文件

pwd     #查看路径
cd ..    #上层路径
git commit -m "第一次提交"  #提交代码

git commit -m "注释内容"     #提交

git log --oneline # 查看提交记录

#把远程dev分支拷贝到本地
git checkout -b dev origin/dev
#拉取远程dev分支
git pull origin dev
```

### 图形化管理工具

1. github for desktop  --官方
2. source tree
    [https://www.jianshu.com/p/6d2717c2a3e1](https://www.jianshu.com/p/6d2717c2a3e1)
3. tortoiseGit
4. Git GUI Here（右键）

### 报错

##### 403： 无权限

##### fatal: remote origin already exists

先移除再添加

```
git remote rm origin
git remote add origin https://gitee.com/sjan233/miniProgram_shop.git
```

##### ![rejected]  master->master(fetch first)

##### error:failed to push some refs to '[https://github.com/xxx/xxx.git](https://github.com/xxx/xxx.git)'

原因是：刚才在网站上改了 README.md 文件，添加了一些项目的说明，然后使用 Git 客户端再次提交的时候，需要先更新服务器上的变化，然后才能提交，也就是先更新再提交。

将线上、线下代码进行合并

```
git pull --rebase origin master
```

然后再进行 push

```
git push origin master
```

#### cmd 报错：不是命令

系统变量 path 设置为 C:\Program Files\Git\cmd，网上那个 git-core bin 的替换掉

工具更新

```
打开Git Bash工具，查看Git版本：
git --version
更新Git工具版本：
git update
或
git update-git-for-windows
```

[https://blog.csdn.net/weixin_42596434/article/details/88759295](https://blog.csdn.net/weixin_42596434/article/details/88759295)

原因是没有指定本地 `master` 分支和远程 `origin/master` 的连接，这里根据提示：

```python
git branch --set-upstream-to=origin/master master
```

**解决方案：**

因为远程仓库新建时，有 LIENCE，由于本地仓库和远程仓库有不同的开始点，也就是两个仓库没有共同的 commit 出现，无法提交

此时我们需要在后面加上 --allow-unrelated-histories

把两段不相干的 分支进行强行合并

**也就是我们的 pull 命令改为下面这样的：**

```python
git pull origin master --allow-unrelated-histories
```

如果设置了默认分支，可以这样写：

```python
git pull --allow-unrelated-histories
```

然后 git push 就可以了。

### 编辑器出不去(vim编辑)

1. 按键盘上的`“i”`键可进入插入模式
2. 这时可以修改最上方的黄色部分，改成你想写的合并原因
3. 按键盘上的`“Esc”`键退出插入模式
4. 最后在最下面输入`“ :wq ”`后按回车键即可

#### 远程有打包 本地新增.gitignore 文件 更新远程

重置所有缓存(注意后面有个.)

git rm -r --cached .

重新添加(注意后面有个.)

git add .

提交

git commit -m ".gitignore is now working"

### 误操作

### 工作中

git commit -m "备注"

此时不要急着 push，先 pull 看看分支的代码有没更新---git pull

```javascript
#可设置upstream上流分支，提交分支到远程仓库remote，提示远程没有对应分支
git push --set-upstream origin bc-a

git fetch是将远程主机的最新内容拉到本地，用户在检查了以后决定是否合并到工作本机分支中。

git pull = git fetch + git merge

git rebase 分支名   ---以当前分支为基础，把别的分支的commit加到后面（其他分支的commit就算早于base分支也会放到后面，比如master 1，2，5，另一个 1 2 3 4，rebase后为12534）
```

### 分支管理规范

作者：敲代码的小提琴手链接：[https://juejin.cn/post/7089850111794085901](https://juejin.cn/post/7089850111794085901)

- 分支管理 `Gitflow`工作流文档

  > 一个功能一个分支，写完了一个功能就提 pr 提完 pr 就删除分支~
  >
  > 相关文档：`[my-git/git-workflow-tutorial.md at master · xirong/my-git (github.com)](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fxirong%2Fmy-git%2Fblob%2Fmaster%2Fgit-workflow-tutorial.md%23236-%E7%A4%BA%E4%BE%8B)`

- commit 命名规范
  - 每天一提交的 commit，这个还是要保证基本的规范滴，要不然想追溯之前的版本，就懵逼了 XD
  -

- 不要在代码仓库中使用强制回滚的命令~

### OpenSSL SSL_connect: Connection was reset in connection to github.com:443

[https://www.codenong.com/27807319/](https://www.codenong.com/27807319/)

```javascript
运行以下命令来获取openssl正在使用的"正确"目录(在Linux / Git Bash下)
openssl version -d | awk '{ print $2 }'
git config --global http.sslCAInfo $(openssl version -d | awk '{ print $2 }')


不推荐，但简单的解决方案：Disable certificate check
git config --system http.sslverify false

git config --global http.sslcainfo C:/Program Files/Git/mingw64/ssl/certs/ca-bundle.crt
git config --global http.sslCAInfo C:/Program Files/Git/mingw64/ssl/certs/ca-bundle.crt
```

## git 忽略大小写

```
git config core.ignorecase false

git config --unset core.ignorecase

git config --list

```

## 线性的提交记录

如果多人开发，别人提交了代码，你本地的base就是落后的，

需要rebase变基到最新的节点

命令为 git pull --rebase ，或者设置默认行为

```
git config --global pull.rebase true
```

但使用rebase前提是需要本地代码没改动的，所以结合stash暂存可以解决这个问题

## gitignore已经添加了，但线上没删除

要取消追踪才行，gitigonre只会对新追踪的生效

```
git rm -r --cached [dirname]
git commit -m 'remove dirname'
git push origin master

```

## 删除：远端已删除，本地还显示的分支

git remote prune origin

## 删除远端分支

git push origin --delete [branchname]
