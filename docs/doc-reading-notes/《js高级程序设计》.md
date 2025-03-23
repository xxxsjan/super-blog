### 实例的typeof是object

```
const aa = new Number(1)
typeof aa // ===> object
const bb = Number(2)
typeof bb // ==> number
```

### 使用Math上的方法==> apply

```
Math.max.apply(Math,[1,2,3,4]) // 随便挂在一个对象上就行,Math、null什么的
```

### 随机生成一个范围的数字

```
Math.random()*总个数 + 第一个值
example:
Math.floor(Math.random()*10 + 1) ==> 1-10
Math.floor(Math.random()*9 + 2) ==> 2-10
```

### 对象字面量语法，这个术语就是

```
var obj = {
  a:1,b:2,fn:function(){}
}
```

### 原型链基础

#### 原型链查找规则

- `in` 操作符可以判断属性是否存在于对象或其原型链上
- `hasOwnProperty()` 方法只判断属性是否存在于对象实例本身

#### 原型对象的constructor属性

- prototype上默认有一个constructor属性，指向构造函数
- 示例：`people.prototype.constructor === Person`
- 通过对象字面量重写prototype会导致constructor指向Object
- 最佳实践：使用Object.defineProperty定义constructor，确保其不可枚举

```javascript
Object.defineProperty(People.prototype, 'constructor', {
  enumerable: false,
  value: People
});
```

### 原型继承模式

#### 寄生构造函数模式的限制

- 使用寄生模式时，instanceof操作符无法正确判断对象类型
- 这是因为返回的对象与构造函数的原型链断开了连接

```javascript
function Fn(name) {
  this.name = name;
}
function Fn2(name) {
  // 寄生模式
  var o = new Object();
  o.name = name;
  return o;
}
var fn = new Fn("tom");
var fn2 = new Fn2("tom");
console.log(fn instanceof Fn); // true
console.log(fn2 instanceof Fn2); // false
```

### ES6 Class中的原型链

#### 基本概念

- Class本质上是构造函数的语法糖
- 类的所有方法都定义在prototype属性上
- 实例的__proto__指向类的prototype

#### 继承实现

- 使用extends关键字实现继承
- super关键字用于调用父类构造函数和方法

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
}
```

### 原型链最佳实践

1. 优先使用ES6 Class语法
2. 避免直接修改原型对象
3. 使用Object.create()创建对象关联
4. 合理使用instanceof和Object.prototype.isPrototypeOf()
5. 注意处理constructor属性

```

## 初始化未声明的变量，会在全局声明该变量

### MutationObserver  监听

本身是个微任务
config如下属性
attributes: true 监听所有值的变化，回调的回参里不会记录旧值
attributeFilter: ['foo']   只监听 foo 属性的变化
attributeOldValue:true 回参会保存旧值

```

let observer = new MutationObserver(
 (mutationRecords) => console.log(mutationRecords.map((x) => x.oldValue)));
observer.observe(document.body, { attributeOldValue: true });
document.body.setAttribute('foo', 'bar');
document.body.setAttribute('foo', 'baz');
document.body.setAttribute('foo', 'qux');

```

拦截水印修改
而MutationObserver主要是监听子元素的改动，因此我们的监听对象为   document.body, 一旦监听到我们的水印元素被删除，或者属性修改，我们就重新生成一个。通过以上示例，加上我们的思路，很快我们就写一个监听删除元素的示例。（监听属性修改也是类似就不一一展示了）
[https://juejin.cn/post/6900713052270755847](https://juejin.cn/post/6900713052270755847)

```

.watermark {
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    pointer-events: none;
    background-repeat: repeat;
}

function createWaterMark() {
  const angle = -20;
  const txt = '秋风的笔记'
  const canvas = document.createElement('canvas');
  canvas.width = 180;
  canvas.height = 100;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 180, 100);
  ctx.fillStyle = '#000';
  ctx.globalAlpha = 0.1;
  ctx.font = `16px serif`
  ctx.rotate(Math.PI / 180 * angle);
  ctx.fillText(txt, 0, 50);
  return canvas.toDataURL();
}
const watermakr = document.createElement('div');
watermakr.className = 'watermark';
watermakr.style.backgroundImage = `url(${createWaterMark()})`
document.body.appendChild(watermakr);
// =============上面是生成水印相关代码

// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, subtree: true };
// 当观察到变动时执行的回调函数
const callback = function (mutationsList, observer) {
// Use traditional 'for loops' for IE 11
  for (let mutation of mutationsList) {
    mutation.removedNodes.forEach(function (item) {
      if (item === watermakr) {
       document.body.appendChild(watermakr);
      }
    });
  }
};
// 监听元素
const targetNode = document.body;
// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback);
// 以上述配置开始观察目标节点
observer.observe(targetNode, config);

```

### html5的classList

原本是className上显示所有的类名以空格拼接那种，增删需要拿出来切割操作
现在只需要classList.add   .remove   .toggle   .contains
添加了 classList 属性之后，除非是完全删除或完全重写元素的 class 属性，否则 className
属性就用不到了。IE10 及以上版本（部分）和其他主流浏览器（完全）实现了 classList 属性。

### requestAnimationFrame

滚动实现节流效果，结合timeout提升性能

```

let enabled = true;
function handleScroll() {
 console.log('Invoked at', Date.now());
}
window.addEventListener('scroll', () => {
 if (enabled) {
 enabled = false;
 window.requestAnimationFrame(handleScroll);
 window.setTimeout(() => enabled = true, 50);
 }
});

```

### input的size 和 maxlength

size是设置显示的长度，可用css width代替
maxlength是限制输入长度的

### try catch

finally会忽略try 和 catch里的return，finally的优先
如果写了finally，catch就成了可选，他们两只有一个是必需的

### JSON.stringifty参数

第二个参数：Array，自定义显示哪个，且按顺序

```

let book = {
 title: "Professional JavaScript",
 authors: [
 "Nicholas C. Zakas",
 "Matt Frisbie"
 ],
 edition: 4,
 year: 2017
};
let jsonText = JSON.stringify(book, ["title", "edition"]); // '{"title":"Professional JavaScript","edition":4}'

```

第三个参数
JSON.stringify()方法的第三个参数控制缩进和空格。在这个参数是数值时，表示每一级缩进的
空格数。例如，每级缩进 4 个空格，可以这样：

```

let book = {
 title: "Professional JavaScript",
 authors: [
 "Nicholas C. Zakas",
 "Matt Frisbie"
 ],
 edition: 4,
 year: 2017
};
let jsonText = JSON.stringify(book, null, 4);
这样得到的 jsonText 格式如下：
{
 "title": "Professional JavaScript",
 "authors": [
 "Nicholas C. Zakas",
 "Matt Frisbie"
 ],
 "edition": 4,
 "year": 2017
}

```

### 页面销毁前的请求怎么实现  Beacon API

// 发送 POST 请求
// URL: '[https://example.com/analytics-reporting-url](https://example.com/analytics-reporting-url)'
// 请求负载：'{foo: "bar"}'
navigator.sendBeacon('[https://example.com/analytics-reporting-url](https://example.com/analytics-reporting-url)', '{foo: "bar"}');
这个方法虽然看起来只不过是 POST 请求的一个语法糖，但它有几个重要的特性。
 sendBeacon()并不是只能在页面生命周期末尾使用，而是任何时候都可以使用。
 调用 sendBeacon()后，浏览器会把请求添加到一个内部的请求队列。浏览器会主动地发送队
列中的请求。
 浏览器保证在原始页面已经关闭的情况下也会发送请求。
 状态码、超时和其他网络原因造成的失败完全是不透明的，不能通过编程方式处理。
 信标（beacon）请求会携带调用 sendBeacon()时所有相关的 cookie。

### 预防csrf攻击

cookie samesite 属性设置
request-header origin referer判断
验证码确认
token

### cookie

值最好encodeURIComponent转化一下

```

class CookieUtil {
 static get(name) {
 let cookieName = `${encodeURIComponent(name)}=`,
 cookieStart = document.cookie.indexOf(cookieName),
 cookieValue = null;
 if (cookieStart > -1){
 let cookieEnd = document.cookie.indexOf(";", cookieStart);
 if (cookieEnd == -1){
 cookieEnd = document.cookie.length;
 }
 cookieValue = decodeURIComponent(document.cookie.substring(cookieStart

- cookieName.length, cookieEnd));
 }
 return cookieValue;
 }
 static set(name, value, expires, path, domain, secure) {
 let cookieText =
 `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
 if (expires instanceof Date) {
 cookieText += `; expires=${expires.toGMTString()}`;
 }
 if (path) {
 cookieText += `; path=${path}`;
 }
 if (domain) {
 cookieText += `; domain=${domain}`;
 }
 if (secure) {
 cookieText += "; secure";
 }
 document.cookie = cookieText;
 }
 static unset(name, path, domain, secure) {
 CookieUtil.set(name, "", new Date(0), path, domain, secure);
 }
};

```

http-only设置true，js'无法document.cookie读取，只能服务器读取

### Worker的使用

- 自我终止可以使用 self.close()  这个只会阻止任务的新增，同步不会阻止，异步添加的就会阻止
- 外部终止使用worker.terminate() 这个就是立马终止

```

// worker.js -------------------------------------------
self.onmessage = async (e) => {
  // e.data里是传进来的数据
  // ...复杂耗时的运算
  const res = 'worker后的结果'
  self.postMessage(res); // 输出结果
};

// main.js ---------------------------------------
const worker = new Worker('./worker.js')
let data = []
worker.postMessage(data)

worker.onmessage = (e) => {
  worker.terminate();
  console.log("接收", e.data);
};
// 错误的监听只能在onerror中捕获，try/catch捕获不了
worker.onerror = function (e) {
  console.log("error at " + e.filename + ":" + e.lineno + e.message);
};

```

importScripts的使用

```

// main.js
const worker = new Worker('./worker.js');
// importing scripts
// scriptA executes
// scriptB executes
// scripts imported

// ./scriptA.js
console.log('scriptA executes');

// ./scriptB.js
console.log('scriptB executes');

// ./worker.js
console.log('importing scripts');
importScripts('./scriptA.js');
importScripts('./scriptB.js');
// importScripts('./scriptA.js', './scriptB.js');
console.log('scripts imported');

```

### 命名规范

匈牙利表示法
o 表示对象，s 表示字符串，i 表示整数，f 表示浮点数，b 表示布尔值。
示例如下：
let bFound; // 布尔值
let iCount; // 整数
let sName; // 字符串
let oPerson; // 对象
