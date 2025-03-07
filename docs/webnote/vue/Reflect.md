# vue响应式为什么使用Reflect

Reflect可以直接调用对象的基本方法

## 不使用Reflect

```
const obj = {
    a:1,
    b:2,
    get c(){
        return this.a +this.b
    }
}

const proxy = new Proxy(obj,{
    get(target,key){
  console.log('proxy get',key)
  return target[key]
    }
})

console.log(proxy.c) // proxy get c
```

上面例子读取c的时候只打印 proxy get c

原因

proxy.c 读取返回的是obj上的getter，此时this默认是指向obj的

而不是代理对象，所以this.a this. b 的读取没有经过代理对象，所以无法打印

## 使用Reflect

```
const obj = {
    a:1,
    b:2,
    get c(){
        return this.a +this.b
    }
}

const proxy = new Proxy(obj,{
    get(target,key){
  console.log('proxy get',key)
  return Reflect.get(target,key,proxy)
    }
})

console.log(proxy.c)
// 打印
//proxy get c
//proxy get a
//proxy get b
```

使用Reflect后，执行get时的this会执行proxy

这时读取a b就是过proxy的，就能达到监听的目的

## Reflect的方法

<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect>

```
Reflect.apply(target, thisArgument, argumentsList)
Reflect.construct(target, argumentsList[, newTarget]) // 相当于new
Reflect.defineProperty(target, propertyKey, attributes)
Reflect.deleteProperty(target, propertyKey)
Reflect.get(target, propertyKey[, receiver])
Reflect.getOwnPropertyDescriptor(target, propertyKey)
Reflect.getPrototypeOf(target)
Reflect.has(target, propertyKey)
Reflect.isExtensible(target)
Reflect.ownKeys(target)
Reflect.preventExtensions(target)
Reflect.set(target, propertyKey, value[, receiver])
Reflect.setPrototypeOf(target, prototype)
```

## Reflect.get和直接获取属性的区别

```
const obj = {
    a:1,
    b:2,
    get c(){
        return this.a +this.b
    },
}

obj.a // 调用[[GET]]
Reflect.get(obj, 'a')// 调用[[GET]] // 两者目前没区别


// 但是当读取的是函数，就会有一点区别
obj.c // 先把this指向obj，再调用[[GET]]
Reflect.get(obj, 'c')// 直接调用[[GET]] 第三个参数receiver默认是当前obj

// 上面例子这两个其实也没区别
// 唯一一点区别只有Reflect.get可以干涉[[GET]]时this的设置

```

## 拓展问题

### 和apply bind call改this有什么区别

```
const obj = {
    a:1,
    b:2,
    get c(){
        return this.a +this.b
    },
    d:function d(){
     console.log(this)
     return this.a +this.b
    }
}
Reflect.get(obj,'d',{a:2,b:3}) // 只是获取属性
Reflect.get(obj,'d',{a:2,b:3})() // 会执行d，打印的this是window
```

所以区别在于apply call bind是改的调用时的this

Reflect的receiver的设置会影响getter setter时的this，而不是调用时的this
