### 各种工具 对应文档地址

 animat.css 动画效果
validator.js 登录验证
mescroll.js 滚动效果
vant 开源组件库
view UI 基于vue的UI组件库
echarts 可视化图表
vue-lazyload 懒加载
day.js 时间和日期
vue-qr 生成二维码
 
[https://animate.style/](https://www.bilibili.com/video/BV1r94y127qS)

[https://github.com/validatorjs/validator.js](https://github.com/validatorjs/validator.js)
移动端滚动





二维码生成
[https://www.npmjs.com/package/vue-qr](https://www.npmjs.com/package/vue-qr)
### 
### clipboard 
粘贴板
### screenfull 
控制全屏
### xlsx 
解析excel表格
```javascript
private readerData(rawFile: File) {
  this.loading = true
  const reader = new FileReader()
  reader.onload = e => {
    const data = (e.target as FileReader).result
    const workbook = XLSX.read(data, { type: 'array' })
    const firstSheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[firstSheetName]
    const header = this.getHeaderRow(worksheet)
    const results = XLSX.utils.sheet_to_json(worksheet)
    this.loading = false
  }
  reader.readAsArrayBuffer(rawFile)
}
```

```javascript
// create a new Workbook
var workbook = XLSX.utils.book_new();
// create sheet
var worksheet = XLSX.utils.aoa_to_sheet(aoa, opts);
var worksheet = XLSX.utils.aoa_to_sheet([
  ["A1", "B1", "C1"],
  ["A2", "B2", "C2"],
  ["A3", "B3", "C3"]
]);
var worksheet = XLSX.utils.json_to_sheet(jsa, opts);
var worksheet = XLSX.utils.table_to_sheet(dom_element, opts);

//  workbook append sheet
XLSX.utils.book_append_sheet(workbook, worksheet, sheet_name);
```

### 
### 引导小提示
driver.js
```javascript
import Driver from 'driver.js'
const steps = [
  {
    // dom节点
    element: '#hamburger-container',
    popover: {
      title: 'Hamburger',
      description: 'Open && Close sidebar',
      position: 'bottom'
    }
  },
  {
    element: '#breadcrumb-container',
    popover: {
      title: 'Breadcrumb',
      description: 'Indicate the current page location',
      position: 'bottom'
    }
  },
  {
    element: '#header-search',
    popover: {
      title: 'Page Search',
      description: 'Page search, quick navigation',
      position: 'left'
    }
  },
  {
    element: '#screenfull',
    popover: {
      title: 'Screenfull',
      description: 'Set the page into fullscreen',
      position: 'left'
    }
  },
  {
    element: '#size-select',
    popover: {
      title: 'Switch Size',
      description: 'Switch the system size',
      position: 'left'
    }
  },
  {
    element: '#tags-view-container',
    popover: {
      title: 'Tags view',
      description: 'The history of the page you visited',
      position: 'bottom'
    },
    padding: 0
  }
]

if (this.driver) {
  this.driver.defineSteps(steps)
  this.driver.start()
}
```
### js计算库decimal.js
> npm install --save decimal.js  // 安装 
> import Decimal from "decimal.js"  // 具体文件中引入
> 可以带 new 也不可以不带 new

```javascript
//加
let a = 1
let b = 6 
// a 与 b 可以是 任何类型，Decimal 内部会自己处理兼容
// 下面两种都可以 可以带 new 也不可以不带 new
let res = new Decimal(a).add(new Decimal(b)) 
let res = Decimal(a).add(Decimal(b)) 

//减
let a = "4"
let b = "8"
// a 与 b 可以是 任何类型，Decimal 内部会自己处理兼容
// 下面两种都可以 可以带 new 也不可以不带 new
let res = new Decimal(a).sub(new Decimal(b)) 
let res = Decimal(a).sub(Decimal(b)) 

// 乘
let a = 1
let b = 6 
// a 与 b 可以是 任何类型，Decimal 内部会自己处理兼容
// 下面两种都可以 可以带 new 也不可以不带 new
let res = new Decimal(a).mul(new Decimal(b)) 
let res = Decimal(a).mul(Decimal(b)) 

//除
let a = 1
let b = 6 
// a 与 b 可以是 任何类型，Decimal 内部会自己处理兼容
// 下面两种都可以 可以带 new 也不可以不带 new
let res = new Decimal(a).div(new Decimal(b)) 
let res = Decimal(a).div(Decimal(b)) 

#关于保存几位小数相关

//查看有几位小数 (注意不计算 小数点 最后 末尾 的 0)
y = new Decimal(987000.000)
y.sd()                                   // '3' 有效位数
y.sd(true)                               // '6' 总共位数

// 保留 多少个位数 （小数位 会补0）
x = 45.6
x.toPrecision(5)                         // '45.600'

// 保留 多少位有效位数（小数位 不会补0，是计算的有效位数）
x = new Decimal(9876.5)
x.toSignificantDigits(6)                 // '9876.5' 不会补0 只是针对有效位数

// 保留几位小数 , 跟 js 中的 number 一样
toFixed
x = 3.456
// 向下取整
x.toFixed(2, Decimal.ROUND_DOWN)  // '3.45' (舍入模式 向上0 向下1 四舍五入 4，7)
// 向上取整
Decimal.ROUND_UP 

//四舍五入
ROUND_HALF_UP

作者：fangtang0101
链接：https://www.jianshu.com/p/429637a1c80e
来源：简书
```


### npkill--清理node_modules
#### 安装
npm i  npmkill -g
#### 执行
npkill -d ./
即可搜索当前目录下的node_modules文件夹
#### 删除
然后上下选择
空格键确认进行删除
#### 退出
ctrl c进行退出操作
或者关闭命令窗口

### normalize.css   css reset库

### fast-glob
返回目录下的文件名[]

### concurrently
执行多个npm命令 单个命令双引号引起来，记得使用\转义
```typescript
"postinstall": "concurrently \"pnpm gen:version\" \"pnpm run -C internal/metadata dev\""
```
