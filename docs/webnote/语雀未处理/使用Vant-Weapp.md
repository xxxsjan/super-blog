### npm i @vant/weapp -S --production
### 新建
首先小程序新建一个基础模板
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151242542.png)

### 前置知识
project.config.json的miniprogramRoot属性可以配置小程序目录
```javascript
{
 "miniprogramRoot": "miniprogram/",
}
```

project.config.json同级目录下打开命令行工具，
也就是根目录，不是小程序目录（miniprogramRoot）

### 初始化npm
npm init -y 
初始化npm，会生成package.json文件

next，告诉小程序编辑器npm从哪找

编辑project.config.json，新增
```javascript
"packNpmManually": true,
    "packNpmRelationList": [
      {
        "packageJsonPath": "./package.json",
        "miniprogramNpmDistDir": "./miniprogram/"
      }
],
```

这时
编辑器就知道npm的来源（packageJsonPath）
和知道构建npm后生成的目录（miniprogramNpmDistDir）

他会在小程序目录下（miniprogramRoot）生成miniprogram_npm文件夹
这个文件夹里就是vant ui的组件

具体操作
编辑器左上角-工具-构建npm
最后结构长这样
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151242258.png)
app.json
移除v2
```typescript
//  "style": "v2",
```
### 
### 使用组件
```typescript
"usingComponents": {
  "van-button": "@vant/weapp/button/index"
}
```
