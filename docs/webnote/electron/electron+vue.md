# 文章

## 原生创建项目

[https://www.electronjs.org/zh/docs/latest/tutorial/quick-start](https://www.electronjs.org/zh/docs/latest/tutorial/quick-start)
创建文件夹
npm init

### vue + electron

#### 1 创建vue项目

--vue create  super-demo
注意：路由使用哈希模式吧，history模式的话，打包后根目录“/”首次没显示，要点击home才是首页

#### 2 安装vue-cli-plugin-electron-builder插件

--npm i vue-cli-plugin-electron-builder -D

#### 3 执行 vue add electron-builder

他会改变我们的目录结构，他会加一些东西进来
--选择13.0.0

#### 4 package.json要加上，不然打包会报错

```javascript
"author":"xxx",
"description":"xxx",
```

#### 5 打包时可能会出错

把node_modulees删了，还有那些dist开头文件夹也删了
重新安装就行，可能之前脚手架的electron包出问题了

打包他会现在dist_elctron下先生成bunlded，然后是win-unpacked
有时dist_electron\win-unpacked\resources\app.asar这个会因为删不掉而报错，说他有线程占用，这时关闭编辑器在删除即可

build他不会自动删了dist_electron里的内容，其实可以优化下，
比如原本打包32 64的，在目录里
改成只打64的话，执行打包，目录里还会留着32相关的包，
这样有好有不好，看自己需求判断是否需要做清理文件夹处理

#### 6 vue文件引入electron报错 require is not defined

解决：
1、require前加window，即：
let { remote } = window.require("electron");
2、项目根目录新增vue.config.js文件，配置如下：

```javascript
module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true
        }
    }
}
```

BrowserWindow的webPreferences属性也要配置正确：

```javascript
webPreferences: {
  nodeIntegration: true,
    contextIsolation: false,
    enableRemoteModule: true
}
```

#### 7 打包配置

由于使用vue-cli-plugin-electron-builder
是vue在做配置 ，在vue.config.js里

```javascript
module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "com.test.app",
        productName: "Lang", //项目名，也是生成的安装文件名，即aDemo.exe
        copyright: "Copyright © 2021", //版权信息
        directories: {
          output: "./dist" //输出文件路径
        },
        win: {
          //win相关配置
          icon: "./build/icons/icon.ico", //图标，当前图标在根目录下，注意这里有两个坑
          target: [
            {
              target: "nsis", //利用nsis制作安装程序,打包文件的后缀为exe
              arch: [
                "x64", //64位
                "ia32" //32位
              ]
            }
          ]
        },
        nsis: {
          oneClick: false, //一键安装
          language: "2052", //安装语言
          perMachine: true, //应用所有用户
          allowToChangeInstallationDirectory: true //用户可以选择路径
        }
      }
    }
  }
};

```

### electron配置

#### 控制台位置

```typescript
win.webContents.openDevTools({ mode: 'undocked', activate: true })
// mode  left, right, bottom, undocked（集成）, detach（分离）
```

- options Object (可选)
  - mode string - 使用指定的 dock state 打开开发者工具, 可以是 left, right, bottom, undocked, detach。 默认使用上一次的 dock state。 在 undocked 模式下，可以恢复停靠。 在 detach 模式下则不能。
  - activate boolean (可选) - 是否将打开的开发者工具窗口置于前台。 默认值为 true。

打开开发者工具。
当contents是webview标签时，mode将默认detach，显式传递空的mode，可以强制使用上次的 dock state.
On Windows, if Windows Control Overlay is enabled, Devtools will be opened with mode: 'detach'.

### 一些插件

#### 打包--@electron-forge/cli

[Electron教程（三）如何打包 electron 程序：electron-forge 的使用教程_十月ooOO的博客-CSDN博客_electron 打包](https://blog.csdn.net/kimbing/article/details/119080158)
npm i -D @electron-forge/cli
npx electron-forge import

#### 打包--electron-packager

[https://blog.csdn.net/qq_46664185/article/details/122437700](https://blog.csdn.net/qq_46664185/article/details/122437700)
npm i electron-packager -D

不生效应该是缓存问题，out路径改其他路径即可，例如out/new-icon什么的，out2也是可以的，但gitignore麻烦

#### electron-icon-builder 图片转icon

cnpm i electron-icon-builder -D
中间有个文件较大，没下载好会报错（PhantomJS not found on PATH）

```javascript
 "scripts": {
    "build-icon": "electron-icon-builder --input=./build/longzhu.jpg --output=build --flatten"
  },
```
