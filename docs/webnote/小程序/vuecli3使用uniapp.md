# vuecli3使用uniapp



https://uniapp.dcloud.io/quickstart-cli


vue create -p dcloudio/uni-preset-vue my-project


选择默认就行，hello是个展示功能的模板，有时间也可以下来看看


![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305131319476.png)


运行


```
npm run dev:%PLATFORM% 
npm run build:%PLATFORM%
```


`%PLATFORM%` 可取值如下：


| 值                      | 平台                                                         |
| ----------------------- | ------------------------------------------------------------ |
| app-plus                | app平台生成打包资源（支持npm run build:app-plus，可用于持续集成。不支持run，运行调试仍需在HBuilderX中操作） |
| h5                      | H5                                                           |
| mp-alipay               | 支付宝小程序                                                 |
| mp-baidu                | 百度小程序                                                   |
| mp-weixin               | 微信小程序                                                   |
| mp-toutiao              | 字节跳动小程序                                               |
| mp-qq                   | qq 小程序                                                    |
| mp-360                  | 360 小程序                                                   |
| quickapp-webview        | 快应用(webview)                                              |
| quickapp-webview-union  | 快应用联盟                                                   |
| quickapp-webview-huawei | 快应用华为                                                   |