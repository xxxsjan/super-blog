# 文件分析

#### FilesInspector

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305131133515.png)

# WizTree

<https://www.diskanalyzer.com/>

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305131133204.png)

# exe图标icon获取

ArtIcons Pro

# 数据库管理工具

beekeeper studio

<https://www.beekeeperstudio.io/>

# 按键盘小人 bongo cat Mver

<https://bongo.cat/>

<https://www.bilibili.com/read/cv9758540>

# scrcpy投屏

## 下载

<https://github.com/Genymobile/scrcpy/releases/tag/v2.1.1>

## 开发者选项

usb调试、usb安装

数据线连手机

解压、点击exe文件

如果不成功

win x打开终端，cd到解压目录

（地址栏输入cmd也可以，没管理员win x）

执行 ./scrcpy.exe

回车后可以看到失败原因

![image-20230819022249252](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202308190222394.png)

```
-d 使用usb

-e 使用wifi
```

首次连接手机使用usb的话，第二个是读取手机wifi信息，后面断了usb，wifi可以无缝衔接

```
./scrcpy.exe -d

./scrcpy.exe --tcpip
```

首次使用wifi的话，第二个是usb连接

```
./scrcpy.exe --tcpip

./scrcpy.exe -e
```

## 指令

```
全屏 -f

帮助 -h
```

### Easy Context Menu（管理右键菜单）

不太好用

<https://www.sordum.org/7615/easy-context-menu-v1-6/>

<https://zhuanlan.zhihu.com/p/428605288>

### 修改右键

win+R   输入cmd

回到win10的右键输入：

reg add HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32 /f /ve

恢复win11的右键输入：

reg delete "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}" /f

任务管理器，右键文件管理器，重新启动即可刷新

### 根据窗口获取软件文件路径

adwView2.43

SoftCnKiller

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305131337130.png)

### 根据快捷方式获取icon

ArtIcons Pro

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305131337761.png)

### powertoys

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305131337942.png)

### 发送文件给服务器

| FileZilla |      |      |
| --------- | ---- | ---- |
| winscp    |      |      |

### 注册表整理与删除

Wise Registry Cleaner

### 性能监控

<https://zhuanlan.zhihu.com/p/66377147>

#### Wise System Monitor

#### 软媒系统雷达

### everything

<https://www.voidtools.com/zh-cn/>

### 格式转换工具

<https://www.bilibili.com/video/BV18T411R7YR/?spm_id_from=444.41.list.card_archive.click&vd_source=11e14f37a256537712e73b4b7f52411c>

<https://www.reaconverter.com/>

<https://www.toprender.com/forum.php?mod=forumdisplay&fid=286&filter=typeid&typeid=237>

## GeekDesk

小巧、美观的桌面快速启动工具

<https://github.com/BookerLiu/GeekDesk>

内置everything
