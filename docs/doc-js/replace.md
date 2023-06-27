# replace

加括号才能使用$1替换，不然就是单纯的变成$1

```
const text = "具备简单的后端开发能力，了解Linux、Nginx环境new哈哈";
console.log(text.replace(/([a-zA-Z]+)/g, " $1 "));
console.log(text.replace(/[a-zA-Z]+/g, " $1 "));
console.log(text.replace(/[a-zA-Z]+/, " $1 ")); // 匹配一个
console.log(text.replace(/([a-zA-Z]+)/, " $1 ")); // 匹配一个
```



### `\u4e00-\u9fa5` 

是一个表示中文字符范围的 Unicode 编码区间。具体来说，`\u4e00` 表示中文字符的第一个字，也就是汉字“一”的 Unicode 编码，而 `\u9fa5` 则是中文字符的最后一个字，也就是汉字“龥”的 Unicode 编码。

转换网站

http://www.esjson.com/unicodeEncode.html



## ?<=

要匹配的前面应该是

## ?=

要匹配的后面应该是