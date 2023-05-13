# svn使用

pc下载安装tortoiseSVN

网站svnbucket.com上注册账号，新建一个项目，其实就是git上的新建仓库，右上角就是仓库地址

pc上：

文件夹管理器中，右键svn检出，输入仓库地址，输入放哪个目录，点击确定，即可下载仓库的代码

## 提交代码

提交前，一般先更新update，然后解决冲突再提交submit

## 还原版本

### 已提交

右键日志里面，选中版本，右键复原此版本做出的操作

### 未提交撤销

方法1

选中文件，右键tortoiseSVN-svn还原

方法2

点击提交，右键文件svn还原

## 添加忽略

右键文件，tortoiseSVN-去除版本控制并添加到忽略，

## 项目转移svn to git

[https://blog.csdn.net/weixin_36294955/article/details/105218549](https://blog.csdn.net/weixin_36294955/article/details/105218549)

[https://blog.csdn.net/qq_41051202/article/details/100762266](https://blog.csdn.net/qq_41051202/article/details/100762266)

svn根目录编辑userinfo.txt

格式为svn_username=git_username<user_email>，提交记录里出现的所有svn_user都要有对应git_user

```
svn_user1=svn_user1<svn_user1@xxx.com>
svn_user2=svn_user2<svn_user2@xxx.com>
```

### 从svn拉取代码

配置git信息：

git config --global user.name "YOUR_USERNAME"

git config --global user.email "YOUR_EMAIL"

查看配置:

git config --list

拉取代码（项目越大，花费时间越多）

```
git svn clone -r 282506:HEAD svn_url --no-metadata -A userinfo_path local_path

git svn clone svn://127.0.0.1:33333/app/trunk/qct/JAVA/shinywayqct --no-metadata --authors-file=userinfo.txt  project-dir
```

-r 282506: HEAD 代表从svn的282506版本到最新版本的提交记录，避免从第一个版本拉取数据量过大，操作耗时高。

如果需要拉取所有记录，可去除 -r 282506: HEAD

svn_url 你的svn项目地址。

–no-metadata 防止git拉取无用的SVN附加信息

local_path 为git clone下来的svn目录，会自动新建

-A userinfo_path 你的userinfo.txt路径

## 分支trunk、branches、tags

[https://www.cnblogs.com/chengx/p/5893175.html](https://www.cnblogs.com/chengx/p/5893175.html)

## 创建 合并分支

[https://blog.csdn.net/justry_deng/article/details/82259470](https://blog.csdn.net/justry_deng/article/details/82259470)
