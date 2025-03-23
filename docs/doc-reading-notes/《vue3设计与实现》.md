# Vue3设计与实现笔记

## 响应式系统

### 响应式核心 - effect实现

```javascript
function effect(fn: () => any, scheduler?: (cb: any) => void) {
  const watcher = new Watcher(currentInstance, fn, noop, {
    sync: true
  })
  if (scheduler) {
    watcher.update = () => {
      scheduler(() => watcher.run())
    }
  }
}
```

### watch的实现原理

#### 多次修改值的处理机制

当监听的值在短时间内多次变化时，Vue3采用了巧妙的失效机制来确保只获取最新值：

```javascript
// onInValidate是watch提供的回调
watch(()=>obj.a,(newVal,oldVal,onInValidate)=>{
  let expries = false
  onInValidate(()=>{
    expries=true
  })
  const res = await request()
  if(!expries){
    finalData = res
  }
})
```

实现原理：

```javascript
function watch(getter,cb,options){
  let oldVal,newVal
  let clean 
  function onInValidate (fn){
    clean = fn
  }
  function job(){
    newVal = effectFn()
    if(clean){clean()}
    cb(newVal,oldVal,onInValidate)
    oldVal = newVal
  }
  const effectFn = effect(
    ()=>getter(),
    {
      scheduler:()=>{job()}
    }
  )
  if(options.immediate){
    job()
  }else{
    oldVal = effectFn()
  }
}
```

## 运行时系统

### DOM属性处理

#### HTML Attributes vs DOM Properties

- 大多数属性名称保持一致(如id、value)
- 特殊情况:
  - DOM使用className，HTML使用class
  - DOM使用textContent设置文本
- HTML attributes通过getAttribute获取初始值
- DOM properties获取实时值

#### disabled属性处理

- setAttribute('disabled',false)无效
- 浏览器根据disabled属性是否存在判断
- 正确方式：el.disabled = false

### 事件处理系统

#### invoker机制

优雅处理事件监听的添加、更新和删除：

```javascript
let invakers = vm._vei || {}
let invoker = invakers['onClick']
!invoker&&invaker = e=>{
  invaker.value(e)
}
el.addEventLitsener('click',invaker)

// 更新只需修改invoker.value
// 移除
el.removeEventLitsener('click',invaker)
```

### 虚拟DOM diff算法

#### 简单Diff实现

主要处理三个节点：

- 新虚拟节点
- 旧虚拟节点
- 真实DOM节点

优化策略：

```javascript
// 使用key优化更新
if(newVnode.key === oldVnode.key){
 patch(oldChildren[i],newChildren[i],container) 
}
```

## 组件系统

### Setup实现原理

```javascript
function mountComponent(vnode,container,anchor){
  const componentOptions = vnode.type
  let {render,data,setup,props:propsOptions} = componentOptions
  
  const [props,attrs] = resolveProps(propsOptions,vnode.props)
  const slots = vnode.children || {}
  const instance = {
    state,
    props:shallowRective(props),
    subTree:null,
    slots,
    mounted:[]
  } 
  
  const setupContext = {attrs,emit,slots}
  const setupResult = setup(shallowReadonly(instance.props),setupContext)
  let setupState = null
  
  if(typeof setupResult === 'function'){
    render = setupResult
  }else{
    setupState = setupResult
  }
  
  vnode.component = instance
  
  const renderContext = new Proxy(instance,{
    get(t,k,r){
      const {state,props} = t
      if(k === '$slots'){
        return slots
      }
      if(state && k in state){
        return state[k]
      }else if(props && k in props){
        return props[k]
      }else if(setupState && k in setupState){
        return setupState[k]
      }else{
        console.error('不存在')
      }
    }
  })
  
  effect(()=>{
    const subTree = render.call(renderContext,renderContext)
    instance.subTree = subTree
  },{
    scheduler:queueJob
  })
}
```

### 异步组件

基本使用：

```javascript
export default {
  setup(){
    const asyncCom = shallowRef(null)
    import('ComB.vue').then(comB=>{
      asyncCom.value = asyncCom
    })
    return {
      asyncCom
    }
  }
}
```

defineAsyncComponent实现：

```javascript
function defineAsyncComponent(options){
  if(typeof options === 'function'){
    options = {
      loader:options
    }
  }
  const {loader} = options
  let InnerComp = null
  
  return {
    name:'AsyncComponentWrapper',
    setup(){
      const loaded = ref(false)
      loader().then(c=>{
        InnerComp = c
        loaded.value = true
      })
      return ()=>{
        return loaded.value
          ? {type:InnerComp}
          : {type:Text,children:''}
      }
    }
  }
}
```

## 编译系统

### 模板解析

#### 基础解析流程

模板字符串 -> token数组 -> AST

#### 递归下降算法

标签解析策略：

```javascript
function parseElement(){
  const element = parseTag()
  element.children = parseChildren()
  parseEndTag()
  return element
}
```
