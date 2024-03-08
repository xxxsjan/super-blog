[get started](https://www.docker.com/get-started)

[bilibili 2022最新Windows docker安装方法](https://www.bilibili.com/video/BV1za411Q7er)

## [下载](https://docs.docker.com/desktop/install/windows-install/)

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281327418.png)

## 安装

一路默认

## 配置环境

### windows功能开启

docker需要开启hyper-V

> 安卓模拟器 需要关闭hyper-V，二者需求会冲突

开启虚拟化

可在任务管理器查看是否开启

开启方式：bios

<img src="https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281327051.png" alt="image.png" style="zoom:50%;" /><img src="https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281327009.png" alt="image.png" style="zoom:50%;" />



### windows功能需要开启

#### ✅开启 适用于Linux的Window子系统

dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

#### ✅开启 Hyper-v 

⚠注意这里不要在"启用或关闭Windows功能"（命令optionalfeatures）中勾选Hyper-v

可以通过命令行开启

dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

##### hyper莫名关闭

守护hyper进程

--这个很可能是开启hyper后不生效的主因

--来源[https://blog.csdn.net/MyronCham/article/details/125216511](https://blog.csdn.net/MyronCham/article/details/125216511)

启用系统中的虚拟化功能

bcdedit /set hypervisorlaunchtype auto

### 配置镜像加速

设置 Docker Engine 写入配置：
<img src="https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281327156.png" alt="image.png" style="zoom:67%;" />

```json

增加/更新"registry-mirrors"字段
{
  "registry-mirrors": [
    "http://hub-mirror.c.163.com/",
    "https://registry.docker-cn.com"
  ],
}
```

### wsl2安装

> Windows Subsystem for Linux（windows 子系统 linux）

windows10 11默认有wsl命令，win10 要2004

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281327096.png)

wsl --list 看是否安装

未安装

![image-20230729022354243](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307290223805.png)

已安装

![image-20230729033826005](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202308131600177.png)

#### 安装wsl2更新包

<https://learn.microsoft.com/zh-cn/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package>

#### 安装Ubuntu  

wsl --install -d Ubuntu

安装之后会弹出Ubuntu命令窗口

输入用户名、密码创建账户，用户名不能是root

比如我设置的是 xxsjan 123456

![image-20230729033606943](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202308131601479.png)

#### 使用Ubuntu命令行

搜索Ubuntu即可进入命令行

#### wsl命令

| wsl --install                                     | 安装 WSL 和 Linux 的默认 Ubuntu 发行版                       |
| ------------------------------------------------- | ------------------------------------------------------------ |
| wsl --list --online                               | 列出可用的 Linux 发行版                                      |
| wsl --list --verbose                              | 查看安装在 Windows 计算机上的 Linux 发行版列表，其中包括状态（发行版是正在运行还是已停止）和运行发行版的 WSL 版本（WSL 1 或 WSL 2）。 [比较 WSL 1 和 WSL 2](https://learn.microsoft.com/zh-cn/windows/wsl/compare-versions)。 此命令也可输入为：`wsl -l -v`。 可与 list 命令一起使用的其他选项包括：`--all`（列出所有发行版）、`--running`（仅列出当前正在运行的发行版）或 `--quiet`（仅显示发行版名称）。 |
| wsl --install -d [distribution]                   | distribution 是 --online 列出list的name的值，可以为Ubuntu    |
| wsl --unregister [DistributionName]               | 卸载                                                         |
| wsl --set-version distribution name versionNumber | 将 WSL 版本设置为 1 或 2 请将 `<distribution name>` 替换为发行版的名称，并将 `<versionNumber>` 替换为 1 或 2 |
| wsl --set-default Distribution Name               | 若要设置 WSL 命令将用于运行的默认 Linux 发行版，请将 `<Distribution Name>` 替换为你首选的 Linux 发行版的名称。 |

 [更多命令的使用](https://docs.microsoft.com/zh-cn/windows/wsl/basic-commands)

[安装VMware16兼容Hyper-v+WSL2+Docker+解决0x80370102报错 - 百度文库](https://wenku.baidu.com/view/5c827502ee630b1c59eef8c75fbfc77da26997c8.html)

[夜神模拟器和wsl2冲突解决](https://www.bilibili.com/read/cv13748859/)

## 报错情况汇总

### wSL 2 is not installed

<img src="https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307281326647.png" alt="image.png" style="zoom:50%;" /><img src="https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307290216200.png" alt="image-20230729021607449" style="zoom:50%;" />

装wsl，也就是linux ，这个需要虚拟服务

![image-20230729024219629](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307290242444.png)

### WslRegisterDistribution failed with error: 0x800701bc

![image-20230729025442947](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307290318484.png)

这个错误代码0x800701bc通常表示WSL 2内核未安装或未启用，导致注册WSL分发失败

原因:
wsl1升级到wsl2之后，内核却没有升级，所以会出现这种错误提示!
解决方法:
1、下载最新的wsl安装包
2、安装包下载后，直接运行安装即可!

更新包：

<https://learn.microsoft.com/zh-cn/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package>
