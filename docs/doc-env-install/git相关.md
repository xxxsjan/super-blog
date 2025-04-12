## git设置host

<https://ping.chinaz.com/github.com> 这个网站可以看哪个ip延迟低，从而选择好的ip

<https://www.ipaddress.com/> 这个是根据域名查ip

### hosts文件路径

C:\Windows\System32\drivers\etc\hosts

```plain
140.82.112.4  github.com
199.232.69.194 github.global.ssl.fastly.net

140.82.114.3 github.com
151.101.113.194 github.global.ssl.fastly.net

140.82.121.4 github.com
谷歌翻译host
142.251.40.42 translate.googleapis.com
```

改完后ping 域名可以看结果，也可以到对应ip是什么

### ![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305011859917.png)



## git地址变更 （remote修改）

git remote set-url origin <github地址>



## fork仓库的更新

<https://blog.csdn.net/JavaMonsterr/article/details/125930855>

 点击 pull request

 按箭头指示，更新本地就是自己在左，源仓库在右

如果base fork选择了自己fork完的项目后变成两个都是main，

可以点一下“**compare across forks**”

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305011859227.png)

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305131202734.png)

点击create pull request

填写信息，这个是自己fork的仓库的commit







## 提交到暂存，提交错了分支

执行`git reset --soft HEAD^`

如果是是vscode，他支持撤销



## git reset 和 git revert区别

git reset 撤销提交

git reset --hard HEAD^ 执行后回取消之前提交的记录以及代码，也就是git log里面记录的，会回滚

git revert 撤销提交，会留记录

git revert HEAD 会记录你的撤销操作在log里



## git 撤销

<https://www.bilibili.com/video/BV1ne4y1S7S9/?spm_id_from=333.337.search-card.all.click>

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305011900034.jpeg)

### reset

#### 1 编辑器编辑后的撤销

git checkout <file_name>

git restore <file_name>    -- 新版本git

#### 2 撤销暂存区的修改

即撤销到git add之前的状态

git checkout <file_name>

git restore --staged <changed_file>   撤销后，暂存区没了这个文件，但本地文件转态是你修改过的

git checkout HEAD <changed_file>    撤销后，暂存区没了这个文件，本地文件状态是从未修改过的

> HEAD表示最近一次的commit的文件状态
>

#### 3 撤销commit的修改

即撤销到commit之前

- `git reset --soft HEAD~` 命令会将 Git 移动到上一个提交，并保留工作树和暂存区中的更改。这使得用户可以在将文件添加到 Git 的新提交之前修改它们。
- `git reset --soft HEAD~1` 命令会将 Git 移动到两个提交之前的提交，并保留工作树和暂存区中的更改。这意味着用户可能会在回滚到之前的状态后，继续进行编辑，并将其作为新提交。
- `git reset --hard HEAD~` 命令会将 Git 移动到上一个提交，并完全删除工作树和暂存区中的更改。这意味着用户可能会失去将文件添加到 Git 的新提交之前的更改。

### 强制提交git push -f

场景，当你本地分支git reset --hard HEAD~1

也就是回退一个版本，你再提交远端git push会不给你提交

因为远端会发现你莫名其妙少了最近一个版本，也就是HEAD那个版本

#### 使用建议

做好用于个人分支

假如用到公有分支，其他开发者就乱套了

### revert

把修改的文件反过来，之前新增的修改，变成移除，重新给你commit上去，会有log记录，以此达到回退的目的

git revert HEAD   反推最近一次commit，变成之前的状态，并生成新的commit

对比reset的优点，可以回到之前任意的时间点

下图chang2是最新commit，也就是HEAD，

指定70a0，其实就是HEAD~1

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305011900542.png)

### 使用建议

revert 可适用于个人分支和公有分支，因为有迹可循

reset   只推荐使用于个人分支

 





## ssh

1、执行 ssh-keygen -t rsa -b 4096 -C "<your_email@example.com>"

2、保存路径C:\Users\admin/.ssh/id_rsa.pub，回车后命令行会显示

3、查看 C:\Users\admin/.ssh/id_rsa.pub 内容

4、公钥 复制下来，放到 github 》setting 》 ssh 》新建

5、类型选择 Signing keys





### 全局 配置

```
# 设置全局用户名
git config --global user.name "xxxsjan"
# 设置全局用户邮箱
git config --global user.email "626653354@qq.com"
# 查看全局配置列表
git config --list

# 移除全局用户名配置
git config --global --unset user.name
# 移除指定安全目录配置
git config --global --unset safe.directory D:/aa/bbb/cccc
# 移除所有安全目录配置
git config --global --unset-all safe.directory

# 编辑全局配置
git config --global --edit
# 在 Vim 中，:wq 保存并退出
# 在 Vim 中，:q 退出
# 在 Vim 中，:q! 强制退出
```

配置当前当前 fork 的仓库的原仓库地址
git remote add upstream <原仓库 github 地址>



### 创建仓库

#### 没仓库

```javascript
git init

git add .

git commit -m "first commit"

git remote add origin https:xxxxxxxxxxxxxxxx

git push -u origin master
```

#### 有项目没仓库

```javascript
git init

git add .

git commit -m "本地项目提交"

git remote add origin https:xxxxxxxxxxxxxxxx

git push -u origin master
```

#### 已有仓库情况

```
git remote add origin https:xxxxxxxxxxxxxxxx

git push -u origin master
```



### ![rejected]  master->master(fetch first)

##### error:failed to push some refs to '[https://github.com/xxx/xxx.git](https://github.com/xxx/xxx.git)'

原因是：刚才在网站上改了 README.md 文件，添加了一些项目的说明，然后使用 Git 客户端再次提交的时候，需要先更新服务器上的变化，然后才能提交，也就是先更新再提交。

将线上、线下代码进行合并

```
# 合并线上和线下代码
git pull --rebase origin master
# 再次推送
git push origin master
```

#### cmd 报错：不是命令

解决方案：将系统变量 path 设置为 C:\Program Files\Git\cmd，替换原有的 git-core bin 路径。

工具更新

```
# 打开 Git Bash 工具，查看 Git 版本
git --version
# 更新 Git 工具版本
git update
# 或者使用以下命令更新
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
# 指定本地 master 分支和远程 origin/master 的连接
git branch --set-upstream-to=origin/master master
# 强行合并两个不相干的分支
git pull origin master --allow-unrelated-histories
# 若设置了默认分支，可简化命令
git pull --allow-unrelated-histories
# 推送至远程仓库
git push
```



### 编辑器出不去(vim编辑)

1. 按键盘上的`“i”`键可进入插入模式
2. 这时可以修改最上方的黄色部分，改成你想写的合并原因
3. 按键盘上的`“Esc”`键退出插入模式
4. 最后在最下面输入`“ :wq ”`后按回车键即可

 

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



## git 忽略大小写

```
git config core.ignorecase false

git config --unset core.ignorecase

git config --list
```





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