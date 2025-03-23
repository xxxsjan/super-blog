### 块级作用域

#### try catch

catch里是块级作用域

### 原型链

#### 基础概念

原型链是JavaScript实现继承的主要机制。每个对象都有一个内部链接指向另一个对象，这个对象就是它的原型。这个原型对象也有自己的原型，以此类推，形成了所谓的原型链。

#### 属性访问和修改

当我们通过赋值操作符(=)访问对象属性时：

- 如果原型链上的属性是可写的，在当前对象上创建新属性并赋值
- 如果原型链上的属性是只读的，则无法在当前对象上创建该属性
- 如果原型链上存在setter，则调用setter，但不会修改setter本身
- 使用Object.defineProperty()不受原型链属性特性的影响

#### constructor属性

```javascript
function Foo(){}
let fn = new Foo()

fn.constructor === Foo // true
// .constructor实际是从Foo.prototype上获取的
Foo.prototype.constructor === Foo // true

Foo.__proto__ === Function.prototype // true

// 如果重写了原型对象，constructor的指向会发生变化
Foo.prototype = {} // 创建新对象
fn.constructor === Foo // false，因为Foo.prototype上没有constructor属性
// 继续向上查找原型链
fn.constructor === Object // true，最终找到Object.prototype上的constructor
```

需要注意的是，constructor属性并不一定存在于对象自身，它是从原型链上继承而来的。

#### 创建原型关联

创建对象间的原型关联（继承关系）时，推荐使用以下方式：

```javascript
// 不推荐：直接赋值原型，会导致修改影响到父类
Bar.prototype = Foo.prototype; // ❌

// 不推荐：使用new实例化，可能会共享实例状态
Bar.prototype = new Foo(); // ❌

// 推荐：使用Object.create()
Bar.prototype = Object.create(Foo.prototype); // ✔️

// 推荐：使用ES6的Object.setPrototypeOf
Object.setPrototypeOf(Bar.prototype, Foo.prototype); // ✔️
```

#### Object.create的polyfill实现

```javascript
if(!Object.create){
  Object.create = function(o){
    function Fn(){}
    Fn.prototype = o;
    return new Fn()
  }
}
```

### 匿名函数

虽然使用匿名函数可以简化代码，但在需要函数自调用的场景下，建议使用具名函数：

```javascript
var obj = {
  fn: function fn(){} // 具名函数便于递归调用
}
```

也可以使用arguments.callee，但在严格模式下不推荐使用。
