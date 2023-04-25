

# uniapp 原生app本地打包安卓

https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android.html#

## 教程

https://blog.csdn.net/qq_40230735/article/details/123346723



准备

- Android Studio

- App离线SDK

- HbuilderX

uniapp打包后你可以获得

 打包后的文件

对应的名称`__UNI__6C0DB6E`类似这种



解压App离线SDK

Android Studio打开解压后的HBuilder-HelloUniApp

这是一个安卓项目

替换里面的内容



## 修改assets/data/dcloud_control.xml

```
<hbuilder>
<apps>
    <app appid="__UNI__6C0DB6E" appver=""/>
</apps>
</hbuilder>
```





### Androidmanifest.xml添加代码

apk.applicationId 这个值 === com.android.HelloH5

com.android.HelloH5的两处地方

- app\src\main\AndroidManifest.xml

- app\build.gradle

```
<!--provider节点必须添加-->
<provider
  android:name="io.dcloud.common.util.DCloud_FileProvider"
  android:authorities="${apk.applicationId}.dc.fileprovider"
  android:exported="false"
  android:grantUriPermissions="true">
  <meta-data
      android:name="android.support.FILE_PROVIDER_PATHS"
      android:resource="@xml/dcloud_file_provider" />
</provider>

```





## app\build.gradle值修改

app\src\main\assets\apps\__UNI__B\www\manifest.json的

```
"version":{"name":"1.0.0","code":"100"}
```

与app\build.gradle的 

```
versionCode 1
versionName "1.0"
```

要保持一致

## 开发者中心

https://dev.dcloud.net.cn/pages/app/list



包名  就是上面的com.android.HelloH5

SHA1 

MD5





## 获取SHA1 

 ![在这里插入图片描述](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304141445230.png)



 ![在这里插入图片描述](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304141445584.png)



 ![在这里插入图片描述](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304141445148.png)



## key.jks   目录下执行

 keytool -list -v -keystore key.jks    

输入123456

获取SHA1

 ![在这里插入图片描述](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304141446350.png) 





 ![在这里插入图片描述](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304141446938.png) 