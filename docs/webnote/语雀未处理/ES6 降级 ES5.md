# 区别

|  | Es6 | ES5 |
| --- | --- | --- |
| new | 只能通过new调用 | 都行 |
| 暂时性死区 | 不能在声明前调用 | 函数会提升 |
| 属性 | this和prototype上都有一份数据
不可枚举 |  |
| 方法 | 不可以new |  |

# 判断函数是否是通过new调用
## ES6
new.target   true | false
## Es5
函数内 
```vue
 this.__proto__ === Fn.prototype
   __proto__是不建议直接调用的
   所以
Object.getPrototypeOf(this) ===  Fn.prototype
```
```typescript
var Product = (function(){
  function Product(){
    if(Object.getPrototypeOf(this) ===  Fn5.prototype){
      throw new TypeError("class 必须通过new调用")
    }
  }
  return Product
})()

// bug
var p = Product()
Product.call(p)
```

# 暂时性死区的处理
es5的function会提升
es6的class并不会提升

可以通过自执行进行约束
```vue
var Product = (function(){
  function Product(){
    
  }
  return Product
})()
```
#  访问器转换
也就是class上的get
可以通过defineProperties
```typescript
var Product = (function(){
  function Product(){
    // ..
    // 属性this和原型都要一份
    Object.defineProperties(this,'xxx',{
      get(){
        return 'new xxx'
      },
      enumerable:false
    })

    Object.defineProperties(Product.prototype,'xxx',{
      get(){
        return 'new xxx'
      }
    })
    // 方法 不可枚举  不可通过new调用
    // new p.add()  和 p.add()  区别在于this指向
    // 前者this指向原型上的add方法的prototype
    Object.defineProperties(Product.prototype,'add',{
      enumerable:false,
      value:function(){
        if(Object.getInstanceOf(this) === Product.prototype.add.prototype){
          throw new TypeError("add is not a constructor")
        }
        this.num++
      }
    })
  }
  return Product
})()
```
