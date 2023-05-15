### new做了什么

新我们也可以试着来自己实现一个 new

```javascript
function create() {     
  // 创建一个空的对象     
  let obj = new Object()     
  // 获得构造函数     
  let Con = [].shift.call(arguments)     
  // 链接到原型     
  obj.__proto__ = Con.prototype     
  // 绑定 this，执行构造函数     
  let result = Con.apply(obj, arguments)     
  // 确保 new 出来的是个对象     
  return typeof result === 'object' ? result : obj
}
```

### 获取元素几何信息

getBoundingClientRect
**----**返回一个 [DOMRect](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMRect) 对象，其提供了元素的大小及其相对于[视口](https://developer.mozilla.org/zh-CN/docs/Glossary/Viewport)的位置。
clientTop
getComputedStyle
----Window.getComputedStyle()方法返回一个对象，该对象在应用活动样式·表并解析这些值可能包含的任何基本计算后报告元素的所有 CSS 属性的值。 私有的 CSS 属性值可以通过对象提供的 API 或通过简单地使用 CSS 属性名称进行索引来访问。
scrollTop
offsetTop 当前元素相对于其 [offsetParent](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetParent) 元素的顶部内边距的距离。

#### 元素宽度信息

offsetWidth  ==> 500
getComputedStyle(HTMLElement, null).getPropertyValue('width') ==> 500px

### 迭代器

```javascript
const obj = {
   // 定义数据
   a: 1,
   b: 2,
   c: 3,
   // 定义迭代器函数
   [Symbol.iterator]: function() {
     // 初始化遍历次数
     let index = 0
     // 获取对象值
     let data = Object.keys(this)
 
     return {
       // 返回遍历函数，每次判断是否已经遍历完成（index是否大于等于长度）
       next(value) {
           return {
             done: index >= data.length,
             value: data[index++]
           }
       }
     }
   }
 }
 
```

### 获取对象的key

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151246326.png)
