# python安装







## 一、Anaconda

https://blog.csdn.net/qq_41813454/article/details/136111020

### 1 先清理已经安装的python

### 2 下载miniconda

​	[官网下载](https://docs.anaconda.com/free/miniconda/)	or   [国内镜像](https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/)

### 3 安装

Miniconda3-py39_24.1.2-0-Windows-x86_64为例子

- ​	安装用户
  - 只为当前用户安装，
  - 为所有用户安装（推荐）

- ​	安装地址 ：
  - 新建一个c:/miniconda文件夹（推荐）
  - c:/Program Files里（不建议）
- 勾选
  - ![image-20240411200621736](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/image-20240411200621736.png)

### 4 添加系统环境变量

path中新增

```
C:\\miniconda3
C:\miniconda3\Library\bin
C:\miniconda3\Scripts
```

### 5 验证

conda --version

python -V     自带python3.9环境

![image-20240411200600766](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/image-20240411200600766.png)

### 6 切换源

#### 设置pip源

https://pypi.tuna.tsinghua.edu.cn/simple
https://mirrors.aliyun.com/pypi/simple/



1a 命令行设置pip镜像源

```
pip config set global.index_url https://mirrors.aliyun.com/pypi/simple/
```

windows文件位置：C:\Users\xxxxx\AppData\Roaming\pip\pip.ini 



1b  手动设置，没有就新建文件夹/ 文件

```
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
[install]
trusted-host = pypi.tuna.tsinghua.edu.cn
```

 2 校验

输入 pip config list 查看有没设置成功

或者 pip config get global.index-url

#### 设置conda源



##### 清华镜像源

```
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
查看配置结果
conda config --show-sources
```



配置搜索和安装包时显示使用channel的 URL



```
conda config --set show_channel_urls yes
查看结果
conda config --show
```



##### 文件位置：

C:\Users\xxxx

```
channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
ssl_verify: true
```

### 7 初始化conda到全局PowerShell

​	condabin文件夹下![image-20240411200015377](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/image-20240411200015377.png)

```
./conda init --all
```



### 8 命令

conda create -n py38 python=3.8：创建一个名为py38的新环境，并安装Python 3.8。
conda activate py38：激活名为py38的环境。
conda deactivate：退出当前激活的环境。
conda install package_name：在当前环境中安装包名为package_name的包。
conda remove package_name：在当前环境中卸载包名为package_name的包。
conda env list：列出所有已创建的环境。
conda env export > environment.yml：导出当前环境的配置信息到environment.yml文件中。
conda env create -f environment.yml：根据environment.yml文件中的配置信息创建一个新的环境。
———————————————



## 二、pyenv-win

https://github.com/pyenv-win/pyenv-win

https://blog.csdn.net/Java_ZZZZZ/article/details/135478712

1. 下载项目zip

2. 选择一个安装目录，把压缩包里的pyenv-win解压出来

   ![image-20240411125346307](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/image-20240411125346307.png)

3. 新建系统变量![image-20240411125527633](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/image-20240411125527633.png)

4. 系统变量-Path-新建

   %PYENV%\bin 
   %PYENV%\shims

   ![image-20240411125720872](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/image-20240411125720872.png)

### 命令

```
pyenv install --list 查看能安装的版本
pyenv install 2.7.5 安装指定版本
pyenv versions 查看电脑安装的python
pyenv global 3.8.0 设置全局的版本
python -V  查看当前版本
pyenv which python  查看python安装路径
```

### 问题

#### 安装python卡住

1 去https://www.python.org/ftp/python/  安装包exe下载放到install_cache 文件夹下

![image-20240411131527581](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/image-20240411131527581.png)

2 修改安装目录下的.versions_cache.xml

```
https://www.python.org/ftp/python 全部替换为 https://npm.taobao.org/mirrors/python
```

#### python -V没反应

win10 进入设置 搜索 别名 

![image-20240411132645945](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/image-20240411132645945.png)

![image-20240411132629413](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/image-20240411132629413.png)



## 三、pyenv

https://developer.aliyun.com/article/1462462#slide-9



## 四、查看cuda版本

windows命令：nvidia-smi