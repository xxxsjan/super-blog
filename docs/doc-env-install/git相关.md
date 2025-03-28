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

 



## git文件大小写问题

git默认不识别大小写

执行 命令

git config core.ignorecase false



## ssh

1、执行 ssh-keygen -t rsa -b 4096 -C "<your_email@example.com>"

2、保存路径C:\Users\admin/.ssh/id_rsa.pub，回车后命令行会显示

3、查看 C:\Users\admin/.ssh/id_rsa.pub 内容

4、公钥 复制下来，放到 github 》setting 》 ssh 》新建

5、类型选择 Signing keys
