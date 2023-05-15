## verdaccio

[https://juejin.cn/post/6932264833312096270](https://juejin.cn/post/6932264833312096270#heading-1)
npm i -g verdaccio
执行    verdaccio   即可启动，参考如下
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151259833.png)
> config file是配置文件config.yaml
> htpasswd是用户名单

配置文件config.yaml里加个 search: true
这样可以搜索

### 权限修改

```json
packages:
  '@*/*':
    access: $authenticated
    publish: $authenticated
    unpublish: $authenticated
    proxy: npmjs
  '**':
    access: $authenticated
    publish: $authenticated
    unpublish: $authenticated
    proxy: npmjs 
```

### 限制注册

```json
auth:
  htpasswd:
    file: ./htpasswd
    max_users: -1
```

### 注册用户

```json
npm adduser --registry http://localhost:4873/
```

#### 新增的用户这里看

C:\Users\admin\AppData\Roaming\verdaccio\htpasswd

### 登录

npm login

### 添加、切换源

#### 安装nrm

npm i -g nrm

#### 查看源列表

 nrm ls 命令来查看目前存在的源

#### 添加源

`nrm add mynpm http://localhost:4873/`
> 删除源的话 nrm del mynpm

#### 使用源

nrm use mynpm

### 发布npm包

`npm publish --registry http://localhost:4873`

### 删除包

目录下删除 C:\Users\admin\AppData\Roaming\verdaccio\storage
