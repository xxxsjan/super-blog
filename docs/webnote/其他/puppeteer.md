# puppeteer

> 页面爬取、爬虫

puppeteer

### 文档

https://zhaoqize.github.io/puppeteer-api-zh_CN/

https://pptr.dev/

### 文章

https://juejin.cn/post/6844903997845962759

https://www.cnblogs.com/wuweiblogs/p/12910879.html

### 基础使用

headless为true 则不弹出浏览器

```javascript
(async () => {
  const browser = await puppeteer.launch({ // headless: true,}); //生成browser实例
  const page = await browser.newPage();     //解析一个新的页面。页面是在默认浏览器上下文创建的
  await page.goto("https://example.com/");  //跳转到 https://example.com/
  await browser.close();
})()
```



### 爬取单页面应用

```javascript
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://preview.pro.ant.design/#");
  const RANK = ".rankingList___11Ilg li";
  await page.waitForSelector(RANK);
  const res = await page.evaluate(() => {
    const getText = (v, selector) => {
      return v.querySelector(selector) && v.querySelector(selector).innerText;
    };
    const salesRank = Array.from(
      document.querySelectorAll(".rankingList___11Ilg li")
    );
    const data = [];
    salesRank.map(v => {
      const obj = {
        rank: getText(v, "span:nth-child(1)"),
        address: getText(v, "span:nth-child(2)"),
        sales: getText(v, "span:nth-child(3)")
      };
      data.push(obj);
    });
    return {
      data
    };
  });
  console.log(res);
  await browser.close();
})();
```

### api

- page.frames() 获取当前页面所有的 iframe，然后根据 iframe 的名字精确获取某个想要的 iframe
- iframe.$('.srchsongst') 获取 iframe 中的某个元素
- iframe.evaluate() 在浏览器中执行函数，相当于在控制台中执行函数，返回一个 Promise
- iframe.$eval() 相当于在 iframe 中运行 document.queryselector 获取指定元素，并将其作为第一个参数传递
- iframe.?eval 相当于在 iframe 中运行 document.querySelectorAll 获取指定元素数组，并将其作为第一个参数传递



### 获取输入框输入文字

page.keyboard.press("Shift"); //按下 Shift 键 

page.keyboard.sendCharacter('嗨'); // 输入一个字符 

page.keyboard.type('Hello'); // 一次输入完成 

page.keyboard.type('World', {delay: 100}); // 像用户一样慢慢输入

page.keyboard.press('Enter');

page.type(select,input content,{delay:100})  //选择输入框后　输入



延迟1秒：Page.waitForTimeout(1000) 

点击一个元素：page.click() 

获取单页面实例化之后的html：page.content()

#### 模拟手机

```javascript
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors'); // puppeteer内置的一些常见设备的模拟参数
const iPhone = devices['iPhone 6'];

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.emulate(iPhone);
  await page.goto('https://www.example.com');
  // other actions...
  await browser.close();
});
```

#### 操作dom：

这里拿不到单页面应用js生成后的dom

```javascript
const dimensions = await page.evaluate(() => {
    // 在这里可以进行DOM操作
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    };
});
```

#### 获取实例化后的dom

$eval会帮你选好

evaluate只是提供环境

```javascript
//获取具体的img 拿的时候包证已经渲染了，前面可以用watForTimeout 或者 先 waitForSelector
await page.waitForSelector('aa>img')
const imgSrc = await page.$eval('aa>img',(el) => el.src);
//获取所有的img标签
const allImg = await page.evaluate((select) => {
    return [...document.querySelectorAll(select)].map((el) => {
      return el.src;
    });
}, 'img');
```

#### 截图

```javascript
 page.screenshot({                   //生成图片
    path: 'example.png',
    fullPage :true
  })
```



await page.waitForNavigation({ waitUntil:'networkidle0'})// 等待页面导航结束

await page.reload() // 刷新页面





#### 本地用户数据路径

https://chromium.googlesource.com/chromium/src/+/master/docs/user_data_dir.md#Mac-OS-X

## got  cheerio

```javascript
const got = require('got');
const cheerio = require('cheerio');
```



# 选择浏览器

### 不打开浏览器

 headless:true 就是默认值，可以不设置

```javascript
const puppeteer = require("puppeteer");

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.goto("https://live.douyin.com/212606438033");
```

### 打开浏览器

```javascript
const puppeteer = require("puppeteer");
const browser = await puppeteer.launch({ headless: false});
const page = await browser.newPage();

await page.goto("https://live.douyin.com/212606438033");
```

### 使用本地浏览器

#### 参考教程

https://blog.csdn.net/qq_15601471/article/details/106587567

[https://www.bilibili.com/video/BV1P34y1W7Gg](https://www.bilibili.com/video/BV1P34y1W7Gg/?spm_id_from=333.788&vd_source=11e14f37a256537712e73b4b7f52411c)

https://medium.com/@jaredpotter1/connecting-puppeteer-to-existing-chrome-window-8a10828149e0

#### 命令行方法

敲之前先把谷歌浏览器关了

"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222

回车后他会打开浏览器，输入下面地址查看ws地址

http://127.0.0.1:9222/json/version

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305131205682.png)

#### 桌面快捷方式的方法

也就是把命令放快捷方式里

![开启调试](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304132009649.png)



puppeteer相关代码

```javascript
// const puppeteer = require("puppeteer");
// const puppeteer = require("puppeteer-core");
// 貌似都行

const wsUrl = 'ws地址';
const url = new URL(wsUrl);
url.searchParams.set("stealth", "true");
// url.searchParams.set("headLess", "false");
url.searchParams.set("timeout", "600000");
url.searchParams.set("--disable-notifications", "true");
url.searchParams.set("--disable-dev-shm-usage", "true");

const browser = await puppeteer.connect({
    browserWSEndpoint: url.toString()
});

const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 600, deviceScaleFactor: 1 });
await page.goto("https://live.douyin.com/212606438033");
```

## 例子

```javascript
await page.goto("https://bbs.mihoyo.com/");
await page.waitForSelector("#app");
const moreBtnHref = await page.$eval(moreSelect, (a) => a.href);
const page2 = await browser.newPage();
await page2.setViewport({ width: 1200, height: 600, deviceScaleFactor: 1 });
await page2.goto(moreBtnHref);
```

