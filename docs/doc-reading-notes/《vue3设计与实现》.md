### vue3核心
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

### 关闭vue2的兼容
__VUE_OPTIONS_API__
通过webpack的DefinePlugin
```typescript
new webpack.DefinePlugin({
 __VUE_OPTIONS_API__:JSON.stringify(true)
})
```
### watch是怎么在多次修改同一个值时，并取得最新的值返回的？

#### 场景
现在监听obj.a，他在短时间改了两次
watch的回调里包含请求，会把结果值赋给finalData
#### 具体
0ms时间点对obj.a触发watch，进入cb回调，发起请求a，a需要1000ms才返回结果
200ms时obj.a又改变了一次，再次触发cd回调，发起请求b，b请求100ms结果就回来了
按场景肯定是优先取的b请求的返回值，vue也是取得b请求
##### 代码示例
```javascript
// onInValidate是watch提供的回调
watch(()=>obj.a,(newVal,oldVal,onInValidate)=>{
  let expries = false
  onInValidate(()=>{
    expries=true
  })
  const res =await request()
  if(!expries){
    finalData = res
  }
})
```
#### 实现原理
定义一个闭包clean 存储onInValidate的回调，他的回调可以改第一次cb里的expries
再进行watch第二个回调时，把第一个watch的回调里的expries改为true，表示过期，
这样watch第一次回调返回了结果也会因为expries为true而无法给finalData赋值
```javascript
function watch(getter,cb,options){
  let oldVal,newVal
  // 新增的
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
  // 配置相关
  if(options.immediate){
    job()
  }else{
    olaValue = effectFn()
  }
}
```
·

### html attribute & DOM properties
大多数名字是一样的，这类叫做直接映射，例如 id value
不一样的有
dom有className，html叫class
dom.textContent设置文本内容
html attributies 可以通过 key in el的方式判断是否在el上
getAttribute存储的是初始值   
el点获取的是实际值
总结 html attribute 设置的是dom Property的初始值

#### disabled问题
setArrtibute('disabled',false)设置不了他
false会字符串化，即setArrtibute('disabled','false')
浏览器只是会根据标签上有没disabled来判断禁用与否
el.disabled = false 就可以解除禁用 

### invoker
伪造事件处理，优雅处理事件的监听增删
```javascript
let invakers = vm._vei || {}
let invoker = invakers['onClick']
!invoker&&invaker = e=>{
  invaker.value(e)
}
el.addEventLitsener('click',invaker)

// 更新 只需要修改invoker.value 成新的handler函数即可
// 移除
el.removeEventLitsener('click',invaker)
```

假如onClick是多个监听，那就维护成数组，遍历调用，p200页有说到 
### 简单diff算法
主要有新虚拟节点 、旧虚拟节点、真实dom节点
旧和真实dom的顺序一开始是一样的
新旧节点上会有一个el属性指向对应的真实dom
所以真实dom的获取可以通过 oldVnode.el获取

通过遍历短的虚拟节点，平行的进行patch，这样的话，假如是原本就相同，对dom的操作就会进行两次，一次卸载旧的，一次挂载新的
```javascript
// 挂载
patch(null,newChildren[i],container)
// 卸载
unmount(oldChildren[i])
```

这时候，key派上用场了，当type和key都相等，我们认为他们原本是一个dom，
就可以先patch再挂载
```javascript
if(newVnode.key === oldVnode.key){
 patch(oldChildren[i],newChildren[i],container) 
}
```
### setup原理
```javascript
// anchor 挂载锚点 基准
function mountComponent(vnode,container,anchor){
  const componentOptions = vnode.type // vnode.type是个对象
  let {render,data,setup,props:propsOptions,setup} = componentOptions
  
  const [props,attrs] = resolveProps(propsOptions,vnode.props)
  const slots = vnode.children || {} ;
  const instance = {
    state,
    props:shallowRective(props),
    subTree:null,
    slots,
    mounted:[]
  } 
  const setupContext = {attrs,emit,slots}
  
  const setupResult = setup(shallowReadonly(instance.props),setupContext)
  let setupState = null // 如果是返回对象，就接收
  if(typeof setupResult === 'function'){
    render = setupResult
  }else{
    setupState = setupResult
  }
  vnode.component = instance // patchComponent更新组件需要使用到
  
  // 设置代理上下文
  const renderContext = new Proxy(instance,{
    get(t,k,r){
      const {state,props} = t;
      if(k === '$slots'){
        return slots
      }
      if(state&& k in state){
        return state[k]
      }else if(props&&k in props){
        return props[k]
      }else if(setupState && k in setupState){
        return setupState[k]
      }else{
        console.error('不存在') 
      }
    }
  })
  }
  // effect
  effect(()=>{
    const subTree = render.call(renderContext,renderContext)
    instance.subTree = subTree
  },{
    // queueJob调度器，避免频繁更新
    scheduler:queueJob
  })
}

```
#### resolveProps
```javascript
function resolveProps (comProps , vnodeProps){
  const props = {}
  const attrs = {}
  for(const key in vnodeProps){
    if(key in comProps || key.startsWith('on')){
      props[key] = vnodeProps[key]
    }else{
      attrs[key] = vnodeProps[key]
    }
  }
  return [props,attrs]
}
```
#### queueJob
```javascript
const queue: any[] = [];

const p = Promise.resolve();
let isFlushPending = false;

export function nextTick(fn) {
  return fn ? p.then(fn) : p;
}

export function queueJob(job) {
  if (!queue.includes(job)) {
    queue.push(job);
    // 执行所有的 job
    queueFlush();
  }
}

function queueFlush() {
  // 如果同时触发了两个组件的更新的话
  // 这里就会触发两次 then （微任务逻辑）
  // 但是着是没有必要的
  // 我们只需要触发一次即可处理完所有的 job 调用
  // 所以需要判断一下 如果已经触发过 nextTick 了
  // 那么后面就不需要再次触发一次 nextTick 逻辑了
  if (isFlushPending) return;
  isFlushPending = true;
  nextTick(flushJobs);
}

function flushJobs() {
  isFlushPending = false;
  let job;
  while ((job = queue.shift())) {
    if (job) {
      job();
    }
  }
}
```

### 异步组件
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
defineAsyncComponent
```javascript
// 使用
export default {
  components:{
    AsyncCom:defineAsyncComponent(()=>import('ComB'))
  }
}
// 实现
function defineAsyncComponent(options){
  if(typeof options === 'function'){
   options ={
     loader:options
   }
  }
  cosnt {loader} = options
  let InnerComp = null
  return {
    name:'AsyncComponentWrapper',
    setup(){
      const loaded = ref(false)
      loader().then(c=>{
        InnerComp = c
        loaded.value =true
      })
    },
    return ()=>{
  return  loaded.value?{type:InnerComp}:{type:Text,children:''}
  }
}
}
```
### 模板解析
#### 基础版
模板str  解析成 token数组，token解析成AST
#### 递归下降算法 版
他是一个个标签的解析，不是str字符串一个个解析，当然底层是一个个字符串解析，
这里说的是他先看到的产出结果
但他的操作就是，获取标签，中间交给parseChildren，获取结束
中间的内容就递归向下执行就行
```javascript
function parseElement(){
  const element = parseTag();
  element.children = parseChildren();
  parseEndTag() 
  return element
}
```
