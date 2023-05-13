数组依赖的收集

首先响应式的创建是通过observe
```javascript
functions observe(value){
  const ob = new Observer(value)
  return ob
}
```
observe函数里就是通过new Observer(arrItemValue)的方式创建实例，并返回出去

new Observer(arrItemValue)创建实例的时候，也就是构造方法里
```javascript
class Observer{
  constructor(value){
    this.value = value
    this.dep = new Dep()
    def(value,'__ob__',this)
  }
}
```
会加一个dep属性，他是Dep的实例，用来收集数组的依赖 
同时也会给value添加一个__ob__指向this
def做的操作主要就是添加key值，且不可枚举改key

数组的依赖收集同样是在Object.defineProperty的getter里
let childOb = observe(val)----val就是数组子项的value值(arrItemValue)
childOb .dep.depend()----收集
触发：
比如arr.push进行操作时，内部数组增强的拦截处可以通过this.__ob__拿到对应Observer实例，从而也能拿到上面的dep，从而进行触发依赖---this.__ob__.dep.notify()



