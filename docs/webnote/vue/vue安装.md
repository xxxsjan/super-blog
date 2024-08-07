# **vue**

## 搭建环境（脚手架）

React：`cnpm install -g create-react-app`（可覆盖安装）

Vue ：npm install --global vue-cli  /  cnpm install --global vue-cli

npm install --global vue-cli 命令 报错

### 解决办法

需要删除npmrc文件。
强调：不是nodejs安装目录npm模块下的那个npmrc文件
而是在C:\Users{账户}\下的.npmrc文件…



### 升级Vue Cli3 脚手架

先卸载 Vue-Cli  2：npm uninstall -g vue-cli / yarn global remove vue-cli

卸载不了，可能是环境变量问题 <https://www.jianshu.com/p/ba7c078837f3>

```javascript
#1.打开环境变量>在用户变量中找到path,这里的的路径必须和你电脑 npm 的全局安装路径对应，
原来我的之前路径写错了，所以就默认帮我装在C:\Users\Administrator\AppData\Roaming\npm中！ 
现在我决定指定这个路径在C:\Program Files\nodejs\node_global中
（这里的node_global文件夹是我自己新建的）
#2.接下来还有一点！系统变量中的NODE_PATH的路径必须和你是 npm 全局安装路径下的 node_modules,
所以我这里填写的是C:\Program Files\nodejs\node_global\node_modules
#3.设置 npm 的默认安装路:
npm config set prefix "C:\Program Files\nodejs\node_global" //这里的路径必须是上面path对应！
npm config set cache "C:\Program Files\nodejs\node_cache"  //---这里是我自定义的缓存路径，无关紧要
```

安装 Vue-Cli  3： npm install -g @vue/cli  / yarn global add @vue/cli

卸载 Vue-Cli  3：npm uninstall -g @vue/cli / yarn global remove @vue/cli



### Vue-Cli  3使用vue init



<https://www.jianshu.com/p/ca5cecd8d3ee>

如果我们还想使用cli2的脚手架，那么我们可以在安装一个包

`$ cnpm i @vue/cli-init -g`



## 创建项目

React：create-react-app reactdemo01

Vue2：vue init webpack vuedemo01

   如果已经是cli3，

​    安装`cnpm i -g @vue/cli-init`

​    执行`vue init webpack my-project`

Vue3 ： vue create vuedemo01

[vue中runtimecompiler和runtimeonly的区别](https://blog.csdn.net/a1345954104/article/details/104987494)

#### 自定义添加功能

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202308302339346.png)



#### 命令创建

React：`npx create-react-app reactdemo`

Vue： vue init webpack-simple vue-demo02 --结构简单



## 传值★★★★★



(1) props $emit解决父子组件层数较少的情况

(2) $attrs $listeners解决组件嵌套多层关系

(3)中央事件总线$bus newVue() $on() $emit挂载的同一个实例化对象解决兄弟组件传值

(4) vuex的流程图脑子要有这个概念

#### 标签传值（父-->子）

父引用的子标签里面直接写 :xxx="xxx" ，子props：['接收']

#### this.$emit传值（子-->父）

拓展知识：自定义事件:   vue  @xxx，小程序  bind:xxx

小程序里不能函数括号里直接传，要写data-xxx传

#####

```javascript
vue:
子里面的函数
<div @方法名子=fn2>
fn2(){ this.$emit("订阅事件名"，传值)  }

父里面fn1(arg) 直接拿到传值，不需要e.xx
<div @订阅事件名= fn1()>
fn1(arg) 

小程序需要e.detail获取:
父:<component-tag-name bind:click1="fn1" />

子：<bindtap="function2" data-index="{{index}}">

子:function2(){this.triggerEvent('click1', 传值) }

//父.js
fn1: function(e){ 
e.detail
}
```

#### $attrs传值 ---父 ==》子

关系：A-B-C：

A :a :b :c  （绑定数据）

B  v-bind="$attrs"

C  v-bind="$attrs"

$attrs[0].a



## main.js runtime  compiler

```javascript

// compiler模式（Cli 2.0+++旧版本）
new Vue({
    el: '#app',
    router,//引用router
    template: '',
    components: { App }
})

//runtime模式（CLi 3.0+++版本）
new Vue({
 router,
 store,
 render: h => h(App)
}).$mount("#app")
```

### 上线

npm install -g http-server

hs -o -p 8888

### vue.config.js

```javascript
const port = process.env.port || 9999
module.exports = {
  //部署应用包时的基本 URL
  //baseUrl 从 Vue CLI 3.3 起已弃用，请使用publicPath
  publicPath: process.env.NODE_ENV === 'production' ? '/online/' : './',
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",

  //当运行 vue-cli-service build 时生成的生产环境构建文件的目录
  outputDir: 'dist',

  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'assets',

  // eslint-loader 是否在保存的时候检查 安装@vue/cli-plugin-eslint有效
  lintOnSave: true,

  //是否使用包含运行时编译器的 Vue 构建版本。设置true后你就可以在使用template
  runtimeCompiler: true,

  //指定生成的 index.html 的输出路径 (打包之后，改变系统默认的index.html的文件名)
  // indexPath: "myIndex.html",
  //默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变)
  filenameHashing: false,

  //是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。(默认false)
  // runtimeCompiler: false,
  /**
  * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  * 打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
  * map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
  * 有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
  * */
  productionSourceMap: false,

  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin 生产环境下是true,开发环境下是false
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },

  // 它支持webPack-dev-server的所有选项
  devServer: {
    hot: true, //热加载
    host: "localhost",// ip地址
    port: 1111, // 端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    // 配置多个代理
    proxy: {
      "/api": {
        target: "<url>",// 要访问的接口域名
        ws: true,// 是否启用websockets
        //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据
        //这样服务端和服务端进行数据的交互就不会有跨域问题
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
        }
      },
      "/foo": {
        target: "<other_url>"
      }
    }
  },
  pluginOptions: { // 第三方插件配置
    // ...
  }
}
```

### config/index.js||cli2

比如本地开发服务下是 `http://localhost:8080` 这样的访问页面，

但是我们的接口地址是  `http://xxxx.com/save/index` 这样的接口地址， config/index.js 配置：

```javascript
dev: {
    // 静态资源文件夹
    assetsSubDirectory: 'static',
    // 发布路径
    assetsPublicPath: '/',
    // 代理配置表，在这里可以配置特定的请求代理到对应的API接口
    // 例如将'localhost:8080/api/xxx'代理到'www.example.com/api/xxx'
    // 使用方法：https://vuejs-templates.github.io/webpack/proxy.html
    proxyTable: {
      '/api': {
        target: 'http://xxxxxx.com', // 接口的域名
        // secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        // 要是实际请求里面有api这个路径，可以不重定向
        pathRewrite: {
          '^/api': '' //访问localhost:8080/api/user就会转向 127.0.0.1:8000/user
        }
      }
    },
    // 本地访问 `http://localhost:8080`
    host: 'localhost', // can be overwritten by process.env.HOST
}
```

接口地址原本是 /save/index，但是为了匹配代理地址，在前面加一个 /api,  因此接口地址需要写成这样的即可生效 /api/save/index。

注意： '/api' 为匹配项，target 为被请求的地址，因为在 ajax 的 url 中加了前缀 '/api'，而原本的接口是没有这个前缀的，所以需要通过 pathRewrite 来重写地址，将前缀 '/api' 转为 '/'。如果本身的接口地址就有 '/api' 这种通用前缀，就可以把 pathRewrite 删掉。

### 配置路径 build->webpack.base.config.js

```plain
resolve:{
  extensions:['.js','.vue','.json'],
  alias:{
    'vue$':'vue/dist/vue.esm.js',
    '@':resolve('src')
  }
}
```



### slot插槽的使用

<http://caibaojian.com/vue-slot.html>

# mpvue

```bash
$ npm install --global vue-cli@2.9
$ vue init mpvue/mpvue-quickstart my-project
$ npm run dev
安装 stylus，stylus-loader 插件
cnpm install stylus stylus-loader --save-dev
npm run dev
```

#### 安装 wxParse(解析Html)

```javascript
cnpm install mpvue-wxparse  --save
#引入
import wxParse from "mpvue-wxparse"
#注册组件
components：{ wxParse }
#使用
<wxParse   :content="article" @preview="preview" @navigata="navigate"/>
#引入wxParse
<style>
    @import url("~mpvue-wxparse/src/wxParse.css")
</style>
```

#### 出现wx.navigateTo页面不跳转问题的解决方法

1.检查你要跳转的位置是否在app.js中注册过。

2.检查你要跳转的地址是否有误。经常都是因为少写或者多写使得跳转无效。

3.检查你要跳转的位置是否位于TabBar中，如果是的话，要使用wx.switchTab 来跳转界面

父给子传值，列表跳详情

通过给点击函数传值

```plain
父：
<div class="bookItem" 
@click="toDetail(item)" 
v-for="(item,index) in booksArr" 
:key="index" 
>
methods:{
//bookItem随意命名
    toDetail(bookItem){
      wx.navigateTo({
        url:'/pages/detail/main?bookItem=' + JSON.stringify(bookItem)
      })
    }
  }
  
子：生命周期函数接受
export default {
  data(){
    return{
      bookItem:{}
    }
  },
  mounted(){
    this.bookItem = JSON.parse(this.$mp.query.bookItem)
  }
}
```

#### **1. 开启/关闭页面收录功能**

打开`project.config.json`，在`setting`中设置`checkSiteMap`的值为false，表示关闭该功能。

安装nodemon

```plain
cnpm install -g  nodemon
```

安装koa

```plain
cnpm install koa --save
cnpm install koa-router --save
```

#### mpvue传值--路由传值

按钮传值，通过在标签里写 @click="func(value)“ 把value传进去，

func里通过wx.navigateTo和JSON的路由方式传值

```plain
func (value) {  
wx.navigateTo({    
url: '/pages/booksList/main?随便起一个和value一样也行=' + JSON.stringify(value)  
})}
```

在子组件生命周期mounted里面接收，this就是传进来的，通过JSON再解析回去

```plain
mounted () {   
if (this.$mp) {    
this.booksArr = JSON.parse(this.$mp.query.booksArr)  
}}
```

#### mvpue传值--标签传值

通过在标签里写   :xxx=”xxx“，xxx是data(){return{xxx:[]}}里面的xxx数据

```plain
<BooksList :booksArr="booksArr"/>
```

子组件通过props接收

```plain
props: ['booksArr'],
```

#### open-type

```plain
<button open-type=“getUserInfo”></button>
```

这样 **button按钮** 点击后直接就有弹窗了

<https://developers.weixin.qq.com/miniprogram/dev/component/button.html>

### 让Vue-Cli 3兼容2的“vue init”命令

<https://www.jianshu.com/p/ca5cecd8d3ee>

#### 让Vue-Cli 3兼容2的“vue init”命令的办法

Vue-Cli 2和3是不能并存的，至少不能同时安装，只能保留一个，在保留3的前提下还想用`vue init`怎么办？

1. 卸载你的Vue-Cli 2：`npm uninstall vue-cli -g`或`yarn global remove vue-cli`

1. 安装Vue-Cli 3：`npm install -g @vue/cli`或`yarn global add @vue/cli`

1. 安装一个包：`npm install -g @vue/cli-init`或`yarn global add @vue/cli-init`

1. //安装完后 就还可以使用 vue init 命令
   vue init webpack vue_project

#### 执行vue init永远downloading的解决办法

由于大中国墙的关系，国内访问github.com的访问速度很慢，由此导致`vue init`也很慢，甚至永远downloading，怎么办？

其实官方已经给出了解决办法，就是访问github.com，从项目页面上面把repo下载下来。如果你发现几百KB的zip都下载困难，你可能需要让网友帮你下载，甚至真的需要翻一翻了。

当你下载完成之后，解压缩，放到英文路径里，然后从资源管理器拷贝目录的路径，然后在命令行输入：

```kotlin
vue init E:\xxx-master ooo
```

其中`E:\xxx-master`是项目所在路径，ooo是你的项目名。对比正常的命令`vue init`其实大同小异。

##### 使用less less-loader

1.下载`less`到项目中

```plain
npm install less less-loader --save
```

2.配置`webpack.base.conf.js`    modules--> rules

```css
{ test: /.less$/, loader: "style-loader!css-loader!less-loader", }
```

#### mpvue开发微信小程序，在vue中能用，但在mpvue中不支持的地方

可以直接使用 小程序的生命周期 标签,

传值按vue的方法来

（1）不支持v-html。因为小程序没有dom的概念。

（2）不支持部分javascript渲染表达式，如：

```plain
<!--方法的调用-->
<p>{{getDesc(song)}}</p>
<!--过滤器-->
<p>{{ createTime | format}}</p>
<!-- v-if指令中调用函数  -->
<div v-if="getErrorNum() > 0  && code == 10001" class="error">{{ errorMsg }}</div>
<!--运算-->
<div>{{ msg.trim().split(',').join('#') }}</div>
```

（3）不支持直接绑定一个对象到style或class属性上

```plain
<template>
  <div :class="classObject" :style="styleObject"></div>
</template>
<script>
export default {
  data() {
    return {
      classObject: {
        active: true
      },
      styleObject: {
        'width': '100px'
    }
  }
}
</script>
```

（4）img标签中，不能设置宽度高度，例如：width="200"  height="200"

（5）css中background-image里的url只能是服务器上的地址，不能是本地图片地址。

（6）在跳转之后进入的页面，或者pages目录下的vue文件，不要使用created()。会获取不到mapGetters数据。用async onLoad()代替。

（7）不支持的插件：jsonp / vue-lazyload / better-scroll / vue-awesome-swiper 等等

（8）不支持v-show（可用v-if代替）transitionkeep-alive

（9）组件命名与小程序的冲突，例如：

产生的bug就是，title的值取不到

```plain
<template>
  <div class="loading">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入…'
      }
    }
  }
</script>
```

（10）不能使用vue-router，可以用a标签、wx.navigateTo、wx.redirectTo等等来代替

（11）vuex的使用，需要补充一点：将store对象通过![img](https://g.yuque.com/gr/latex?store%E5%B1%9E%E6%80%A7%E6%B7%BB%E5%8A%A0%E5%88%B0vue%E5%8E%9F%E5%9E%8B%E4%B8%8A%EF%BC%8C%E5%8D%B3%EF%BC%9AVue.prototype.)store = store
————————————————

### 搭配vant 开发

git直接使用（有问题）

```javascript
# 在static目录下
git clone https://github.com/youzan/vant-weapp.git
# 进入vant-weapp文件夹 并将dist或lib目录拷贝static/vant目录下
//引入
// 以下方法使用于git下载安装的方法
// 全局引入 app.json
"window": {。。。},
"usingComponents": {
    "van-steps": "/static/vant/steps/index"
}
// 页面引入 main.json
{
  "usingComponents": {
    "van-steps": "/static/vant/steps/index"
  },
}
# 注意
引入组件后，我们需要重新将项目打包一下（npm run build）
微信小程序开发工具中的打开es6转es5(不然会报错的)
全局引入"usingComponents"与window同级（报错：无效的 appJSON["window"]["usingComponents"]）
```

##### npm使用

<https://youzan.github.io/vant/#/zh-CN/quickstart>

```javascript
npm i vant -S
#按需引入
npm i babel-plugin-import -D
#安装完成之后，在项目 .babelrc 文件修改配置 plugins
"plugins": [
    ["import", {
        "libraryName": "vant",
        "libraryDirectory": "es",
        "style": true
    }]
]
```

### 页面丢失 小程序 mpvue page "xxx" has not been registered yet

build直接dev可以解决

```plain
npm run build
rm -rf dist/* 
npm run dev
```

# uni-app

<https://www.jianshu.com/p/74c06e649e71>

uni-app 代码块：

<https://github.com/zhetengbiji/uniapp-snippets-vscode>

src下就是hbuilderx工程的目录

uni-app 项目下的 manifest.json、pages.json 等文件可以包含注释。vscode 里需要改用 jsonc 编辑器打开。

```plain
创建项目my-project
vue create -p dcloudio/uni-preset-vue my-project
安装组件语法提示
npm i @dcloudio/uni-helper-json
从 github 下载 uni-app 代码块，放到项目目录下的 .vscode 目录即可拥有和 HBuilderX 一样的代码块。

运行项目
npm run dev:%PLATFORM%
发布项目
npm run build:%PLATFORM%
%PLATFORM% 为 h5 | mp-alipay | mp-baidu| mp-weixin| mp-toutiao | mp-qq
```

![img](https://upload-images.jianshu.io/upload_images/2355329-bc1ea29960c4f928.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1200/format/webp)

###

## webSocket

#### 后端

```plain
#单独放一个js文件里，模块化使用
const WebSocket = require('ws')
// 创建实例 建立服务器端口
const ws = new WebSocket.Sever({port:9998})
// 监听
module.exports.listen = ()={
  ws.on('connect',(client)=>{
    // 接受数据
    client.on  = ()=>{}
    // 发送数据
    client.send = ()=>{}
  })
}
#app.js引用
const webSocketSever = require('/xxx')
webSocketSever.liste
```

#### 后端-模块

```plain
const path = require('path')
const fileUtils = require('../utils/file_utils')
const WebSocket = require('ws')
// 创建WebSocket服务端的对象, 绑定的端口号是9998
const wss = new WebSocket.Server({
  port: 9998
})
// 服务端开启了监听
module.exports.listen = () => {
  // 对客户端的连接事件进行监听
  // client:代表的是客户端的连接socket对象
  wss.on('connection', client => {
    console.log('有客户端连接成功了...')
    // 对客户端的连接对象进行message事件的监听
    // msg: 由客户端发给服务端的数据
    client.on('message',async msg => {
      console.log('客户端发送数据给服务端了: ' + msg)
      let payload = JSON.parse(msg)
      const action = payload.action
      if (action === 'getData') {
        let filePath = '../data/' + payload.chartName + '.json'
        // payload.chartName // trend seller map rank hot stock
        filePath = path.join(__dirname, filePath)
        const ret = await fileUtils.getFileJsonData(filePath)
        // 需要在服务端获取到数据的基础之上, 增加一个data的字段
        // data所对应的值,就是某个json文件的内容
        payload.data = ret
        client.send(JSON.stringify(payload))
      } else {
        // 原封不动的将所接收到的数据转发给每一个处于连接状态的客户端
        // wss.clients // 所有客户端的连接
        wss.clients.forEach(client => {
          client.send(msg)
        })
      }
      // 由服务端往客户端发送数据
      // client.send('hello socket from backend')
    })
  })
}
```

#### 前端

```plain
let ws = nell
ws = new WebSocket(ws://....9998)
//连接成功
ws.onopen = ()=>{}
// 关闭连接
ws.onclose = ()=>{}
// 接受数据
ws.onmessage =()={}
// 发送数据
ws.send('xxxx')
```

#### 前端-模块化

```javascript
export default class SocketService {
  /**
   * 单例
   */
  static instance = null
  static get Instance() {
    if (!this.instance) {
      this.instance = new SocketService()
    }
    return this.instance
  }

  // 和服务端连接的socket对象
  ws = null

  // 存储回调函数
  callBackMapping = {}

  // 标识是否连接成功
  connected = false

  // 记录重试的次数
  sendRetryCount = 0

  // 重新连接尝试的次数
  connectRetryCount = 0

  //  定义连接服务器的方法
  connect() {
    // 连接服务器
    if (!window.WebSocket) {
      return console.log('您的浏览器不支持WebSocket')
    }
    this.ws = new WebSocket('ws://localhost:9998')

    // 连接成功的事件
    this.ws.onopen = () => {
      console.log('连接服务端成功了')
      this.connected = true
      // 重置重新连接的次数
      this.connectRetryCount = 0
    }
    // 1.连接服务端失败
    // 2.当连接成功之后, 服务器关闭的情况
    this.ws.onclose = () => {
      console.log('连接服务端失败')
      this.connected = false
      this.connectRetryCount++
      setTimeout(() => {
        this.connect()
      }, 500 * this.connectRetryCount)
    }
    // 得到服务端发送过来的数据
    this.ws.onmessage = msg => {
      console.log('从服务端获取到了数据')
      // 真正服务端发送过来的原始数据时在msg中的data字段
      // console.log(msg.data)
      const recvData = JSON.parse(msg.data)
      const socketType = recvData.socketType
      // 判断回调函数是否存在
      if (this.callBackMapping[socketType]) {
        const action = recvData.action
        if (action === 'getData') {
          const realData = JSON.parse(recvData.data)
          this.callBackMapping[socketType].call(this, realData)
        } else if (action === 'fullScreen') {
          this.callBackMapping[socketType].call(this, recvData)
        } else if (action === 'themeChange') {
          this.callBackMapping[socketType].call(this, recvData)
        }
      }
    }
  }

  // 回调函数的注册
  registerCallBack (socketType, callBack) {
    this.callBackMapping[socketType] = callBack
  }

  // 取消某一个回调函数
  unRegisterCallBack (socketType) {
    this.callBackMapping[socketType] = null
  }

  // 发送数据的方法
  send (data) {
    // 判断此时此刻有没有连接成功
    if (this.connected) {
      this.sendRetryCount = 0
      this.ws.send(JSON.stringify(data))
    } else {
      this.sendRetryCount++
      setTimeout(() => {
        this.send(data)
      }, this.sendRetryCount * 500)
    }
  }
}
```



## scroll-view flex不生效问题

使用white-space加上inline-block

```plain
解决：
scroll-view{
  width: 100%;
  height: 300rpx;
  white-space: nowrap;
 }
 .item1,.item2,.item3{
  display: inline-block;
  width: 100%;
  height: 100%;
 }
 .item1{
  background-color: #007AFF;
 }
 .item2{
  background-color: #333333;
 }
 .item3{
  background-color: #4CD964;
 }
```



## rem适配

<https://youzan.github.io/vant/#/zh-CN/advanced-usage#liu-lan-qi-gua-pei>

npm安装两个插件

- [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 是一款 postcss 插件，用于将单位转化为 rem

- [lib-flexible](https://github.com/amfe/lib-flexible) 用于设置 rem 基准值

postcss.js

配置rootValue的字体大小，1rem=10px，那么rootValue就配置成10，因为它的换算规则是a/10(px)=b/1(rem)。

```plain
module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 8'],
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
    },
  },
};
```

main.js

```plain
import 'lib-flexible/flexible'
```
