## 基本使用
首先看koa2的基本使用
```javascript
const app = new Koa()
app.use(middleware1)
app.use(middleware2)
app.listen(3000)

```

## 原理

app.use一次就数组新增一个

```javascript
{
  this.middlewares = []
  use(fn){
    this.middlewares.push(fn)
  }
}
```
新增之后不执行吗？当然不是，执行不在这里
在这里
```javascript
listen(...args){
    const server = http.createServer(this.callback())
    return server.listen(...args)
  }
callback() {
    const fn = compose(this.middleware);
    
    // 省略一些错误处理代码
    const handleRequest = (req, res) => {
      // ctx上下文对象构建代码，对理解响应机制不重要
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn);
    };
    
    return handleRequest;
  }
  
  
```
启动服务器会执行callback
callback会返回一个handle函数（handleRequest）
```javascript
handleRequest(ctx, fnMiddleware) {
    const res = ctx.res;
    // 错误处理
    res.statusCode = 404;
    const onerror = err => ctx.onerror(err);
    const handleResponse = () => respond(ctx);
    onFinished(res, onerror);
    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
}
```
看到callback里有个compose 生成fn，这就是洋葱模型的关键
```javascript
function compose (middleware) {
  // 校验
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }
  
  return function (context, next) {
    // last called middleware #
    let index = -1
    
    function dispatch (i) {
      if (i <= index) {
        return Promise.reject(new Error('next() called multiple times'))
      }
      index = i
      let fn = middleware[i]
      if (i === middleware.length) {
        fn = next
      }
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
    
    return dispatch(0)
    
  }
}

```
### dispatch解析
首先收集了middleware数组干嘛
当然是要一个个执行，从第一个到最后一个
koa的实现是：
dispatch(i)，i指middleware的索引
一开始index设为-1，这里index作用是判断每个中间件不能执行多次，只能执行一次
所以在函数没调用前，设为-1很合适，这样第一次使用时传0，后面+1就行，
同时index也得刷新成i的值

首次执行参数为0，0是能拿中间数组里的第一个的
起始是0，拿到要执行的中间件，即第一个，fn=middleware[0]
拿到了怎么说，当然要执行，执行就需要参数，参数是什么
第一个是上下文ctx，第二个是他洋葱模型的下一层（next）
他的下一层其实就是fn=middleware[1] ，即第二个，i为1是
所以next指的是下一层洋葱皮函数，有下一步的意思，所以起名next
所以
```javascript
const next = dispatch.bind(null, i + 1);
const fnResult = fn(context, next);
```
返回Promise
```javascript
 return Promise.resolve(fnResult); 
```

```javascript
function dispatch (i) {
  if (i <= index) {
    return Promise.reject(new Error('next() called multiple times'))
  }
  index = i
  let fn = middleware[i]
  if (i === middleware.length) {
    fn = next
  }
  if (!fn) return Promise.resolve()
  try {
    // 原代码是一行，为了方便理解被我拆成了三行
    const next = dispatch.bind(null, i + 1);
    const fnResult = fn(context, next);
    return Promise.resolve(fnResult); 
    //链接：https://juejin.cn/post/6844903790185807885 
  } catch (err) {
    return Promise.reject(err)
  }
}
return dispatch(0)
}
```
### 第二个参数中间件

```javascript
router
    .get('/users', loginChecker, async ctx => {
    	const users = await db.getUsers()
        ctx.body = users
	})
    .delete('/users/:id', adminChecker, async ctx => {
    	const { id } = ctx.params
        await db.deleteUserById(id)
    	ctx.body = { error: false }
	})
链接：https://juejin.cn/post/6844903790731067406
来源：稀土掘金
```
实现原理
```javascript
async function exec(middlewares, ctx) {
    let index = 0
    
    const next = async () => {
        const current = middlewares[index++]
        if (current) {
            await current(ctx, next)
        }
    }
    await next()
}

const ware1 = async (ctx, next) => {
    ctx.body = 'This is ware 1'
    await next()
    console.log("ware1 is back")
}

// 不调用 next，则不会进入下个中间件
const ware2 = async (next) => {
    ctx.body = 'Hello, world'
}

```

