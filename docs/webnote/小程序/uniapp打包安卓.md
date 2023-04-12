

# uniapp 打包安卓

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

![1681225142753](C:/Users/admin/AppData/Roaming/Typora/typora-user-images/1681225142753.png)





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

![1681236348469](C:/Users/admin/AppData/Roaming/Typora/typora-user-images/1681236348469.png)



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

![1681225576038](C:/Users/admin/AppData/Roaming/Typora/typora-user-images/1681225576038.png)

包名  就是上面的com.android.HelloH5

SHA1 

MD5





## 获取SHA1 

 ![在这里插入图片描述](https://img-blog.csdnimg.cn/f8a2192843d149e6946eac82c1fab8bd.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAQW1vZG9ybw==,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)



 ![在这里插入图片描述](https://img-blog.csdnimg.cn/7a06837a3a7e41a48728f918447ea450.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAQW1vZG9ybw==,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)



 ![在这里插入图片描述](https://img-blog.csdnimg.cn/488ac81d6d874c5ab828c423cb69b0c7.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAQW1vZG9ybw==,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)



## key.jks   目录下执行

 keytool -list -v -keystore key.jks    

输入123456

获取SHA1

 ![在这里插入图片描述](https://img-blog.csdnimg.cn/48159ede962b40b7afceca9b428203d5.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAQW1vZG9ybw==,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center) 





 ![在这里插入图片描述](https://img-blog.csdnimg.cn/29d4e945bc4e4b3ea3acecedf06c5574.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAQW1vZG9ybw==,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center) 