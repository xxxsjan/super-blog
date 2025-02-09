# github

## 服务器生产公钥

```
ssh-keygen -t rsa -b 4096 -C "6266@qq.com"
```

回车，然后会显示文件地址

使用cat命令 查看文件内容，复制key，打开github账户的setting，SSH and GPG keys，点击new SSH key，粘贴key，保存

## 清理仓库

```
git reset --hard origin/master
git clean -f
echo "clean success"
git pull origin master
echo "pull success"

```
