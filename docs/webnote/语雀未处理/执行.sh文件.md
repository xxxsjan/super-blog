# js执行
```javascript
var child = require('child_process');
 
child.exec('ls', function(err, sto) {
    console.log(sto);//sto才是真正的输出，要不要打印到控制台，由你自己啊
})
```
# .sh语法
sh ./xx/sh  prod
文件里通过$1获取参数
```javascript
#!/bin/bash

function build(){
    yarn build:$1
    zip -r build.zip ./build/*
    scp ./build.zip root@117.50.4.30:/data/myweb
}

if [ $1 == "pre" ]; then
build $1
elif [ $1 == "prod" ]; then
build $1
else
echo "your params is not pre or prod"
fi
```

```javascript
#!/bin/bash
# 首先备份当前版本v1.0.0
zip -r build.zip.old ./build/*
cp ./build.zip.old /data/myweb/backup/build.zip.old
# 解压最新的版本v1.0.1
unzip -o build.zip
# 获取当前的时间，拼接下
current_time=$(date "+%Y%m%d%H")
cd /data/myweb/backup
mv build.zip.old build.zip."$current_time"
```
