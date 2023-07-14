### 块级作用域
#### try catch
catch里是块级作用域

### 原型
=赋值时
如果获取的属性在原型上，原型上这个属性是可写的，则在原对象新建属性并赋值
如果原型上该属性不可读，则创建不了属性，源对象和原型对象都不会进行赋值
如果原型该属性是setter，则会调用setter，但不会修改setter
Object.defineProperty不受影响
所以创建属性会因为原型有同名属性（只读）而创建不了

```javascript
function Foo (){}
let fn = new Foo()

fn.constructor === Foo // true
// 其实是.constructor是在Foo.prototype上读取出来的
Foo.prototype.constructor === Foo // true

Foo.__proto__ === Function.prototype // true

// 由于fn.construtor是Foo.prototype上的,一旦修改成新的对象，就会出现
Foo.protoType= {} // 创建新对象
fn.constructor === Foo // false ， 因为Foo.prototype上没有了constructor这个属性
// 所以查询又会向上再查找
fn.constructor === Object // true , 最终找到Object.prototype上


```
所以.constructor属性是不在本身的，得看情况判断

#### 创建prototype关联---修改原型对象
最好使用Object.create
```javascript
Bar.prototype = Foo.prototype;// ❌ 修改原型属性会影响到Foo
Bar.prototype = new Foo(); // ❌ 后代实例状态会共享

Bar.prototype = Object.create(Foo.prototype); // ✔️ 唯一缺点是要创建新对象，不能基于原来对象进行更改

// 另一种靠谱的方法
// Es6 Object.setPrototypeOf(obj,prototype) 
Object.setPrototypeOf(Bar.prototype,Foo.prototype); 
```
Object.create的polyfill
```javascript
if(!Object.create){
  Object.create = function(o){
    function Fn (){}
    Fn.prototype = o;
    return new Fn()
  }
}
```

### 匿名函数的使用
由于可以简写，所以会产生匿名函数
```javascript
        
```
假如fn里需要调用自己，最好使用具名函数
使用arguments.callee也许
```javascript
var obj = {
  fn：function fn(){}
}
```
