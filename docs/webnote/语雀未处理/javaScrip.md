# javaScript

第一阶段（一个月）

html css div

第二阶段（一个月）

javascript ajax json

第三阶段（一个月）

js框架：JQuery Vue React

第四阶段（1-2个月）

Note js 全栈

项目实战（5-8个月）

```
window.onload = function(){}
```

### ajax 原理

```javascript
function getData(){
	if(window.XMLHttpRequest{
	var xhr = new XMLHttpRequest()
	}else{
	var xhr = new ActiveXObject("Microsoft.XMLHttp")
	}
}
// 打开ajax, 布尔值（fasle是同步，true是异步，因为ajax本身就是异步）
xhr.open("get","/student.do",true)
xhr.send()
xhr.onreadystatechange = function(){
	// 0=未初始化,1=读取中，2=已读取，3=交互中，4=完成
  if(xhr.readyState == 4 && xhr.status == 200){
  	var data = JSON.pasre(xhr.responseText)
  	
  }
}
// 删除数据
function delData(){
xhr.open("get","/delStu.do?stuId="+stuId,true)
xhr.send()
  //post请求头
xhr.setRequestHeader("content-type","application/x-www-form-urlencoded")
xhr.onreadystatechange = function(){
	if(window.XMLHttpRequest{
		var xhr = new XMLHttpRequest()
	}else{
		var xhr = new ActiveXObject("Microsoft.XMLHttp")
	}
  if(xhr.readyState == 4 && xhr.status == 200){
  	var data = JSON.pasre(xhr.responseText)
			//服务器sql语句 delete from t_student where s_id = ?
  }
}
}
```

### fetch

```javascript
fetch(url).then(response => response.json())
  .then(data => console.log(data))
  .catch(e => console.log("Oops, error", e))
fetch('https://...', {
    method: 'post',
    body: JSON.stringify(base),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function(data) {
 
})
## fetch封装
export default async(url='',data={},type='GET',method='fetch') => {
    type = type.toUpperCase();
    url = baseUrl + url;

    if (type == 'GET') {
        let dataStr = ''; //数据拼接字符串
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&';
        })

        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url = url + '?' + dataStr;
        }
    }

    if (window.fetch && method == 'fetch') {
        let requestConfig = {
            credentials: 'include',//为了在当前域名内自动发送 cookie ， 必须提供这个选项
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: "cors",//请求的模式
            cache: "force-cache"
        }

        if (type == 'POST') {
            Object.defineProperty(requestConfig, 'body', {
                value: JSON.stringify(data)
            })
        }
        
        try {
            const response = await fetch(url, requestConfig);
            const responseJson = await response.json();
            return responseJson
        } catch (error) {
            throw new Error(error)
        }
    } else {
        return new Promise((resolve, reject) => {
            let requestObj;
            if (window.XMLHttpRequest) {
                requestObj = new XMLHttpRequest();
            } else {
                requestObj = new ActiveXObject;
            }

            let sendData = '';
            if (type == 'POST') {
                sendData = JSON.stringify(data);
            }

            requestObj.open(type, url, true);
            requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            requestObj.send(sendData);

            requestObj.onreadystatechange = () => {
                if (requestObj.readyState == 4) {
                    if (requestObj.status == 200) {
                        let obj = requestObj.response
                        if (typeof obj !== 'object') {
                            obj = JSON.parse(obj);
                        }
                        resolve(obj)
                    } else {
                        reject(requestObj)
                    }
                }
            }
        })
    }
}
```

### fetch和ajax 的主要区别

1、fetch()返回的promise将不会拒绝http的错误状态，即使响应是一个HTTP 404或者500

2、在默认情况下 fetch不会接受或者发送cookies

### prompt

	相当于**可以输入文字**的alert

### do while循环（先执行后判断）

```
var a = 1;
do{
 document.write(i++ +"
")
}while(i <= 10);// true则继续执行do里面的内容
```

### 质数

	除以比他小的大于1的正整数，能整除则不是质数

	可以证明他不是质数：

	通过flag = true；改变flag布尔值判断是否为质数



```
flag = true;

for(var i = 2 ; i < num ; i++){
	找不是质数的，通过能否被整除
	if(num % i == 0){
		flag = false;
	}
}

if(flag){
	alert(num + "是质数");
}else{
	alert(num + "不是质数");
```

### break语句

	break 会终止离他最近的语句

	if 内不能使用break 和 continue

	里面语句想终止外面语句可以通过 break +label 进行终止

	例如：break outer;

	有时候可以赠加效率

### 根号

	Math.sqrt();

	var result = Math.sqrt(36); 结果为6

### 对象的分类

	1、内建对象

		Math String Number Boolean Function Object。。。

	2、宿主对象

		BOM DOM

	3、自定义对象

		有开发人员创建对象

### Math

```
Math.PI表示圆周率
	直接用
	方法:
	Math.abs(x);计算绝对值
	Math.random();
	for(var i=0;i < 100;i++){
		console.log(Math.round(Math.random()*10));乘10,获取0-10的数
		生成1-10:
		console.log(Math.round(Math.random()*9)+1);
		生成x-y:
		console.log(Math.round(Math.random()*(y-x)+x);
	}
	Math.pow(2,3);求2的3次方
```

### 正则表达式

```
var reg = new RegExp();
	检查是否是手机号
	var phoneReg = /^1[3-9][0-9]{9}$/;
	检查字符串中是否含有.
	var Reg = /\./;
	\w 	任意字母数字
	\W 	除了字母数字
	\d 	任意数字
	\D 	除了数字
	\s 	空格
	\S 	除了空格
	\b 	单词边界,单词与单词之间的空隙,找单词用
	\B  除了单词边界
	\\去除字符串中前后的空格----使用替换,全局g
	reg.replac(/^\s* | \s*$/g , "");
```



## 冒泡捕获

捕获(true)》目标》冒泡（false）

```
document.addEventListener('click',function(e){
e.stopPropagation()//阻止冒泡
e.preventDefault()//阻止捕获

},true)
```

## 数组转伪数组

```javascript
##数组转伪数组	
[].push.apply(obj,arr);
##伪数组转数组
[].slice.call(arr,obj);
```

### 

## for in / for of

**`for...in`语句**

以任意顺序遍历一个对象的除[Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)以外的**可枚举属性**

包括继承的可枚举属性

Map Set 用不了 ，推荐普通对象使用

---

**`for...of`语句**

在[可迭代对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)（Array，Map，Set，String，TypedArray，arguments 对象等）上创建迭代循环

调用自定义迭代钩子，并为每个不同属性的值执行语句

可迭代（ Symbol.iterator）对象可以用，Object不行

| `Symbol.iterator` 属性的属性特性： |  |
| :--- | --- |
| writable | false |
| enumerable | false |
| configurable | false |


## 生成器

自定义Object 为 可迭代对象

```
Object.prototype[Symbol.iterator] = iterator
function iterator () {
var index = 0;
var _this = this;
return {
 next(){
  return index<_this.length
  ?
  {value:_this[index++],done:false}
  :
  {value:undefined,done:true}
 }
}
}
const obj ={
0:1,1:2,2:3,length:3
}
for(let v of obj){
console.log(v)
}
```

#### 深拷贝

[https://mp.weixin.qq.com/s/dJDlxFve5KyCNN7EfkVo3A](https://mp.weixin.qq.com/s/dJDlxFve5KyCNN7EfkVo3A)
