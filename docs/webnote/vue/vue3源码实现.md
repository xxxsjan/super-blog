[点击查看【bilibili】](https://player.bilibili.com/player.html?bvid=BV1564y1s7s5&p=3&page=3)
### effect
```typescript
const effectStack = []
let activeEffect = null
fucntion effect(fn,options){
  const effectFn = ()=>{
    try{
      fn()
      activeEffect = effectFn
      effectStack.push(activeEffect)
    }finally{
      effectStack.pop()
      activeEffect = effectStack[effectStack.length-1]
    }
  }
  if(!options.lazy){
    effectFn()
  }
  if(options.scheduler){
    effectFn.scheduler=options.scheduler
  }
  return effectFn
}
const targetMap = new WeakMap()
function track(target,key){
  let depMap = targetMap.get(target)
  if(!depMap){
    targetMap.set(target,(depMap =new Map()))
  }
  let deps = depMap.get(key)
  if(!deps){
    deps.set(key,activeEffect)
  }else{
    deps.add(activeEffect)
  }
}

function trigger(target,key){
  const  depsMap  = targetMap.get(target)
   if(!depsMap){return}
  const deps = depsMap.get(key)
  if(!deps){return}
  deps.forEach(effectFn=>{
      if(effectFn.scheduler){
        effectFn.scheduler()
      }{
        effectFn()
      }
    })
}
```

### reactive

```typescript
function reactive(target){
  if(!isObject(target)){
    return 
  }
  const proxy = new Proxy(targer,{
    get(){},
    set(){}  
  })
}
```

### ref
```typescript
function ref(value){
  if(isRef(value)){
    retrun value
  }
  return new RefImpl(value)
}
class RefImpl {
  constructor(value){
    this._isRef = true
    this._value = convert(value)
  }
  get value(){
    track(this,'value')
    return this._value
  }
  set value(val){
    if(hadChanged(val,this._value)){
      this._value = this.convert(val)
      trigger(this,'value') 
    }
  }
}
function convert(){
  return isObject(value)?reactive(value):this._value
}
```
### computed
```typescript
function computed(getterOrOptions){
  let getter ,setter
  if(isFunction(getterOrOptions)){
    getter=getterOrOptions;
    setter=()=>{}
  }else{
    getter=getterOrOptions.get;
    setter=getterOrOptions.set;
  }
  return ComputedImpl(getter,setter)
}

class ComputedImpl{
  constructor(getter,setter){
    this._setter = setter
    this._value = undefined
    this._dirty = true
    this.effect = effect(getter,{
      lazy:true,
      scheduler(){
        if(!this._dirty){
          this._dirty = true
          trigger(this,'value')
        }
      }
    })
  }
  get(){
    if(this._dirty){
      this._value = this.effect()
      this._dirty = false
      track(this,'value')
    }
    return this._value
  }
  set(newVal){
    this._setter(newVal)
  }
}
```
### utils
### 位运算
提高是否同一类型节点的对比速度
![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1661011868628-f37fa462-f61e-4ed1-81ef-182e70035777.png#clientId=ubbeee8f2-0183-4&from=paste&height=629&id=u175bba17&originHeight=786&originWidth=712&originalType=binary&ratio=1&rotation=0&showTitle=false&size=174568&status=done&style=none&taskId=u2b9188ae-e9d0-4f97-bae8-c9ac21b0669&title=&width=569.6)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1661012007939-1381f14f-e8f4-4c03-81be-5d002dde072b.png#clientId=ubbeee8f2-0183-4&from=paste&height=334&id=ud2430457&originHeight=417&originWidth=620&originalType=binary&ratio=1&rotation=0&showTitle=false&size=108536&status=done&style=none&taskId=uae50c326-ed9e-4220-a2d1-670bd4ce6f3&title=&width=496)
