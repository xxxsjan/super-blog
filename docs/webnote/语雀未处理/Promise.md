
## 手写Promise

需要定义Promise本身和本身的函数和原型上的函数

#### 包括resolve和reject方法

```javascript
function resolve(value) {
  if (self.status !== PENDING) {
    return
  }
  self.status = RESOLVED
  self.data = value
  if (self.callbacks.length > 0) {
    setTimeout(() => {
      // foreach对callbacks里的每个单个元素进行操作
      self.callbacks.forEach(callbacksObj => {
        // 加一个回调方法
        callbacksObj.onResolved(value)
      });
    });
  }
}
function reject(reason) {
  if (self.status !== PENDING) {
    return
  }
  self.status = REJECTED
  self.data = reason
  if (self.callbacks.length > 0) {
    setTimeout(() => {
      self.callbacks.forEach(callbacksObj => {
        callbacksObj.onRejected(reason)
      });
    });
  }
}
```

#### Promise.resolve

```javascript
return new Promise((resolve, reject) => {
 if (value instanceof Promise) { //是promise
 value.then(resolve, reject)
 } else { //不是promise
 resolve(value)
 }
 })
```

#### Promise.reject

```javascript
static reject = function (reason) {
      return new Promise((reject) => {       //返回一个失败的promise
        reject(reason)
      })
    }
```

#### Promise.all

```javascript
static all = function (promises) { //接收promises数组

      const values = new Array(promises.length); //保存所有成功的数组
      let success_count = 0;
      return new Promise((resolve, reject) => {
        promises.forEach((p, index) => {
          Promise.resolve(p).then(
            value => {
              success_count++
              values[index] = value
              if (success_count === promises.length) {
                resolve(values)
              }
            }
            , reason => {
              reject(reason)
            }
          )
        })
      })
    }
```

#### Promise.race

```javascript
static race = function (promises) { //接收promises数组
      return new Promise((resolve, reject) => {
        promises.forEach((p, index) => {
          Promise.resolve(p).then(
            value => {
              resolve(value)
            }
            , reason => {
              reject(reason)
            }
          )
        })
      })
    }
```

#### resolveDelay

```javascript
static resolveDelay = function (value, time) {
      return new Promise = ((resolve, reject) => {
        setTimeout(() => {
          if (value instanceof Promise) { //是promise
            value.then(resolve, reject)
          } else {                          //不是promise
            resolve(value)
          }
        }, time);
      })
    }
```

#### rejectDelay

```javascript
static rejectDelay = function (reason, time) {
      return new Promise = ((reject) => {
        setTimeout(() => {
          reject(reason)
        }, time);
      })
    }
```

### 原型上的函数

#### .then

```javascript
then = function (onResolved, onRejected) {
onResolved = typeof onResolved === 'function' ? onResolved : value => value;
// 指定默认的失败的回调，
onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

const self = this;//this是Promise.prototype.then中的Promise

//返回新的promise
return new Promise((resolve, reject) => {

// 封装 处理函数，因为用到resolve和reject，所以不能写外面，但也可以，慢一丢丢  
// 调用指定函数处理，根据执行结果改变Promise的状态

function handle(callback) {
// 捕获
try {
const result = callback(self.data);
// 2.1：上一级返回promise，把他结果拿出来返回就行，也就是通过then拿出来返回
if (result instanceof Promise) {
// 写法一
// result.then(
//   value => resolve(value),
//   reason => reject(reason)
// )
result.then(resolve, reject)//写法二
} else {
// 2.2：上一级状态为resolved，直接传出value
resolve(result)
}
}
catch (error) {
// 2.3：throw抛出了异常
reject(error)
}
}
if (self.status === RESOLVED) {       //1、当前promise的状态为resolved,下一步就是改变Promise的状态
// 状态为resolved有两种情况：--抛出异常--返回新的promise
setTimeout(() => {
handle(onResolved)
})
} else if (self.status === REJECTED) { //2、当前promise的状态为rejected,异步执行onRejected并改变Promise的状态
// 状态为rejected
setTimeout(() => {
handle(onRejected)
})
} else {                               //3、当前promise的状态为pending  (self.status === PENDING)  
self.callbacks.push({
onResolved(value) {
handle(onResolved)
},
onRejected(reason) {
handle(onRejected)
}
})
}
})

}
```

#### .catch

```javascript
catch = function (onRejected) {
return this.then(undefined, onRejected)
}
```

## async await

async后面加函数，返回是个Promise

await 后面是promise就直接返回结果，不需要通过then

await后面是个 非Promise，就返回他本身

await无法接受返回promise的失败结果，只能返回成功的，要获取失败结果需要通过

await一定要写在async函数里面，async函数里面不一定要有await

```javascript
tyr{
 const value = await fn()
}catch(error){
 console.log(error)
}
```
