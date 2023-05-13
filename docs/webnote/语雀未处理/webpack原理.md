### 流程
![](https://cdn.nlark.com/yuque/0/2022/jpeg/28823371/1671110327048-a9dc16b7-c81b-48fa-abf3-21d611f08796.jpeg?x-oss-process=image%2Fresize%2Cw_766%2Climit_0%2Finterlace%2C1#averageHue=%23fbf5f2&from=url&id=kdUun&originHeight=1165&originWidth=766&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 教程视频截图

#### 工作原理剖析
![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1671725268928-478e61b5-470b-481d-9bca-610cdc5347d8.png#averageHue=%23f1f1f1&clientId=u2f95711b-0bc7-4&from=paste&height=590&id=u669008db&originHeight=737&originWidth=975&originalType=binary&ratio=1&rotation=0&showTitle=false&size=226472&status=done&style=none&taskId=u1f3e2049-3b54-4812-8ed7-a118d113398&title=&width=780)
#### webpack cli
![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1671725284962-d721bd04-7216-44cc-bb27-f246a758309f.png#averageHue=%23f5f5f5&clientId=u2f95711b-0bc7-4&from=paste&height=326&id=uf763dc5f&originHeight=408&originWidth=937&originalType=binary&ratio=1&rotation=0&showTitle=false&size=89354&status=done&style=none&taskId=u8e6f0df4-2a2a-45d2-b881-11f79a34538&title=&width=749.6)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1671725301737-996646ea-e9b6-43e7-a8f5-400e70995593.png#averageHue=%23566c56&clientId=u2f95711b-0bc7-4&from=paste&height=680&id=ua3f736f7&originHeight=850&originWidth=1692&originalType=binary&ratio=1&rotation=0&showTitle=false&size=447667&status=done&style=none&taskId=ude2427ee-df4d-43e6-96b2-507369abaa0&title=&width=1353.6)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1671725312225-6af136aa-9e7a-4a5a-919d-50d3eca04b2b.png#averageHue=%23c9d3c6&clientId=u2f95711b-0bc7-4&from=paste&height=614&id=u636ab7a1&originHeight=767&originWidth=1711&originalType=binary&ratio=1&rotation=0&showTitle=false&size=220761&status=done&style=none&taskId=u9186e1c8-42ab-441d-85a3-40016aabb1e&title=&width=1368.8)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1671725326305-93b5da01-1b73-4912-907e-c02daa6011de.png#averageHue=%234b9394&clientId=u2f95711b-0bc7-4&from=paste&height=773&id=ud122376f&originHeight=966&originWidth=1697&originalType=binary&ratio=1&rotation=0&showTitle=false&size=570970&status=done&style=none&taskId=u646e2816-175f-42a4-ac89-39520005520&title=&width=1357.6)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1671725345193-d93e6046-8e4e-4557-8399-5dcf2d066bb7.png#averageHue=%23a4b19f&clientId=u2f95711b-0bc7-4&from=paste&height=676&id=ucfc1aeae&originHeight=845&originWidth=1692&originalType=binary&ratio=1&rotation=0&showTitle=false&size=275614&status=done&style=none&taskId=ued03bad2-fece-4c14-be99-9f4b3cf8a96&title=&width=1353.6)

#### 创建Compiler对象
根据option 创建compiler
![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1671725363861-f35f42d1-a647-4aaf-9351-2e8aa6ce707c.png#averageHue=%23596f59&clientId=u2f95711b-0bc7-4&from=paste&height=771&id=ueb646ccc&originHeight=964&originWidth=1699&originalType=binary&ratio=1&rotation=0&showTitle=false&size=393603&status=done&style=none&taskId=u03490ad1-9db3-4781-9408-ec091e42bdf&title=&width=1359.2)

具体代码
 
![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1671725384572-7dbe9887-047f-41fd-b755-1f05e6502b9a.png#averageHue=%23579c9d&clientId=u2f95711b-0bc7-4&from=paste&height=738&id=u8ffdaf03&originHeight=923&originWidth=1695&originalType=binary&ratio=1&rotation=0&showTitle=false&size=537477&status=done&style=none&taskId=ud0f75826-43f0-4665-a2d3-7a4e8be4de2&title=&width=1356)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1671725431167-050adb5b-6328-4fb2-9a61-d88da8392e19.png#averageHue=%23597055&clientId=u2f95711b-0bc7-4&from=paste&height=635&id=u4dde5c30&originHeight=794&originWidth=1670&originalType=binary&ratio=1&rotation=0&showTitle=false&size=418963&status=done&style=none&taskId=u6449a7a2-a81a-45ac-b476-537f66c7c92&title=&width=1336)
#### 开始构建
watch，监视模式
如果是监视模式就调用Compiler对象的watch方法，以监视模式启动构建但这不是主要关心的主线
如果不是监视模式就调用Compiler对象的run方法，开始构建整个应用.

![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1671726209360-3ed57bac-f561-4128-b804-9d7087df5220.png#averageHue=%23d9dcd8&clientId=u2f95711b-0bc7-4&from=paste&height=741&id=u6df3c5d9&originHeight=926&originWidth=1445&originalType=binary&ratio=1&rotation=0&showTitle=false&size=344955&status=done&style=none&taskId=uf20a69d3-8810-411e-9408-987234cb303&title=&width=1156)
调用compiler.run方法

![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1671726225046-485f4346-f063-40a2-8e89-ac60ed22cf32.png#averageHue=%23eff4f3&clientId=u2f95711b-0bc7-4&from=paste&height=739&id=u76b5e9cc&originHeight=924&originWidth=1430&originalType=binary&ratio=1&rotation=0&showTitle=false&size=315827&status=done&style=none&taskId=u6469205e-ced6-4bad-b3bb-42b6a8b8c61&title=&width=1144)
调用compile方法开始编译
![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1671726314900-45bb2715-8fe9-4ec6-a89a-1a416ddbd45a.png#averageHue=%234a999d&clientId=u2f95711b-0bc7-4&from=paste&height=660&id=u4af2e0f9&originHeight=973&originWidth=1453&originalType=binary&ratio=1&rotation=0&showTitle=false&size=354395&status=done&style=none&taskId=ue3264145-5b91-400f-8266-74890613b10&title=&width=985)
编译时生成compilation对象，给make每个钩子传进去
![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1671726333084-990cc6b3-a5c5-4a41-b88e-ce12155d6889.png#averageHue=%232a323d&clientId=u2f95711b-0bc7-4&from=paste&height=480&id=u85639982&originHeight=600&originWidth=1358&originalType=binary&ratio=1&rotation=0&showTitle=false&size=303956&status=done&style=none&taskId=u352e4fa0-1a32-4075-8e75-1803880132f&title=&width=1086.4)


![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1671726670442-bc095406-65ad-4151-a05c-66c92a50af3f.png#averageHue=%23dfdfde&clientId=u2f95711b-0bc7-4&from=paste&height=662&id=ue01fb532&originHeight=827&originWidth=1503&originalType=binary&ratio=1&rotation=0&showTitle=false&size=330975&status=done&style=none&taskId=uf486ed61-5fe2-4517-bd1e-70e37daf96b&title=&width=1202.4)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1671726726069-4c8dd947-b03a-4f51-92a6-f9343b5d8590.png#averageHue=%2391918f&clientId=u2f95711b-0bc7-4&from=paste&height=596&id=u54fa3ab3&originHeight=745&originWidth=1571&originalType=binary&ratio=1&rotation=0&showTitle=false&size=181152&status=done&style=none&taskId=ud4e80ace-c82e-4aa5-8d2c-f2646e65bcf&title=&width=1256.8)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1671726756702-a1a9013d-6f82-400b-958e-e3943f8be4df.png#averageHue=%233c3f3d&clientId=u2f95711b-0bc7-4&from=paste&height=694&id=u571752bf&originHeight=868&originWidth=1440&originalType=binary&ratio=1&rotation=0&showTitle=false&size=577238&status=done&style=none&taskId=u72886adf-b953-4c74-bae4-ea52af1dd34&title=&width=1152)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1671726856174-02fb4187-1221-4da8-b421-a4257302908c.png#averageHue=%235c7557&clientId=u2f95711b-0bc7-4&from=paste&height=668&id=u604d6caf&originHeight=835&originWidth=1491&originalType=binary&ratio=1&rotation=0&showTitle=false&size=299577&status=done&style=none&taskId=uc52bd581-2f6f-4fed-b929-6da59019dc9&title=&width=1192.8)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1671726931643-aedee0a3-de52-4a0b-9fab-2c89831386b5.png#averageHue=%23efeeed&clientId=u2f95711b-0bc7-4&from=paste&height=635&id=u4b802ad7&originHeight=794&originWidth=1482&originalType=binary&ratio=1&rotation=0&showTitle=false&size=430118&status=done&style=none&taskId=u5df94fb9-1f8f-4b8c-a565-7f9f9806730&title=&width=1185.6)
