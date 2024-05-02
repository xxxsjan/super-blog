# replace的用的和区别



### 参数2为字符串

#### 普通字符串

单替换

```
let str = "Hello World!";
let newStr = str.replace(/o/, "");
console.log(newStr); // Hell World!
```

全替换

```
let str = "Hello World!";
let newStr = str.replace(/o/g, "");
console.log(newStr); // Hell Wrld!
```



#### 参数2为$

非括号正则  $1为单纯字符串 ‘$1’

括号正则 $1为匹配结果

正则为全局，就全部执行替换

为为全局，就只替换匹配的第一个

```js
var text = "你的操作666，了解new哈哈old";
//非括号正则 全局 $1只为字符串，匹配所有
console.log(text.replace(/[a-zA-Z]+/g, " $1 "));// 你的操作666，了解 $1 哈哈 $1

//括号正则 全局 $1为结果，匹配所有
console.log(text.replace(/([a-zA-Z]+)/g, " $1 "));// 你的操作666，了解 new 哈哈 old 

//非括号正则  非全局   $1只为字符串，只匹配第一个
console.log(text.replace(/[a-zA-Z]+/, " $1 ")); // 你的操作666，了解 $1 哈哈old

//括号正则 非全局  $1为结果，只匹配第一个
console.log(text.replace(/([a-zA-Z]+)/, " $1 ")); // 你的操作666，了解 new 哈哈old
```



## 参数2为函数

- `\b`：匹配一个单词的边界。
- `\w`：匹配一个单词字符，包括字母、数字和下划线。
- `\b\w`：匹配一个单词的第一个字符。

```js
let str = "hello, world, ikun!"
// 全局
let newStr = str.replace(/\b\w/g, function (match, offset, original) {
    return match.toUpperCase()
})
console.log(newStr) // 输出：Hello, World, Ikun!

// 非全局
let newStr2 = str.replace(/\b\w/, function (match, offset, original) {
    console.log(match, offset, original);// h 0 hello, world, ikun!
    return match.toUpperCase()
})
console.log(newStr2) // 输出：Hello, World, ikun!
```





## 中文字符范围

`\u4e00-\u9fa5` 

是一个表示中文字符范围的 Unicode 编码区间。具体来说，`\u4e00` 表示中文字符的第一个字，也就是汉字“一”的 Unicode 编码，而 `\u9fa5` 则是中文字符的最后一个字，也就是汉字“龥”的 Unicode 编码。

转换网站

http://www.esjson.com/unicodeEncode.html



## 前瞻

### ?<=

要匹配的前面应该是

### ?=

要匹配的后面应该是

