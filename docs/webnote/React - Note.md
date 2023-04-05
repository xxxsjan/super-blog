# React - Note

## 1.如何在子组件设置参数默认值

通过defaultProps

**function定义的组件：**

```js
Header.defaultProps = {
    name: 'React!',
    age:20
}
```

**类定义的组件：**

```js
static defaultProps = {
    name: 'React is nice!',
    age:666
}
```

**function定义的组件校验参数类型：**

```js
Header.propTypes = {
    name: ReactTypes.string,
    age: ReactTypes.number
}
```

**类定义的组件校验参数类型：**

```js
static propTypes = {
    name: ReactTypes.string,
    age: ReactTypes.number
}
```



## 2.如何在子组件中校验参数类型？

通过 propTypes

npm install prop-types

## 3.关于父组件传参子组件接收的 props 注意点

```js
// 因为 Component 中已经帮我们做了 this.props = props 的处理
// 所以将 props 放到 super 中, 这样它就会去找父级就是找到了 Component
class Person {
    constructor(props) {
        this.props = props;
    }
}

class Student extends Person{
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
    }
}
let stu = new Student({name:'zzj',age:23})
console.log(stu.props);
```

## 4.跨组件通信(爷爷爸爸儿子)之间的通信

利用函数传形参调用传参实现

## 5.兄弟组件通信

父组件通过函数方式传给任一一个兄弟，在由它把参数通过函数形参的方式回传到父组件，在由父组件通过 this.state = {xx} 中 ，通过 this.setState({xx:参数}) 接收，然后再传给另外一个兄弟，这样另外一个兄弟就可以再props中用到另外一个兄弟传来的参数

## 6.跨组件通讯-context

**第一种：**

1.1调用创建上下文的方法, 只要我们调用了创建上下文的方法, 这个方法就会给我们返回两个容器组件生产者容器组件(Provider) / 消费者容器组件(Consumer)

1.2 只要拿到了这两个容器组件, 那么我们就可以通过这两个容器组件从祖先传递数据给所有的后代了

1.3 首先在祖先组件中利用 '生产者容器组件' 包裹后代组件

1.4 然后再后代组件中利用 '消费者容器组件' 获取祖先组件传递过来的数据即可

 **1.创建一个上下文对象**

**const AppContext = createContext({});**

**const {Provider,Consumer} = AppContext**

**2.从上下文对象中获取容器组件**

**// Provider: 生产者容器组件, 专门用于负责生产数据**

**// Consumer: 消费者容器组件, 专门用于消费生成者容器组件生成的数据的**

**// 容器组件: 专门用于包裹其它组件的组件, 我们就称之为容器组件**

```js
父组件中：
class App extends React.Component {
    render() {
        return (
            // 这里用生产者容器包裹后代组件并且可以通过 value 来生产数据
            <Provider value={{name:'React Provider',isActive:true}}>
                <Father />
            </Provider>
        )
    }
}
class Son extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        // console.log(this.props);
        return (
            // 这里用消费者容器组件 去拿到生产者容器组件的数据并使用
            <Consumer>
                {
                    (value) => {
                        return (
                            <div>
                                <p>{value.isActive ? value.name : 'noTrue'}</p>
                                <p>{value.isActive + ''}</p>
                            </div>
                        )
                    }
                }
            </Consumer>
        )
    }
}
```

**第二种：**

不需要从上下文对象中解构 Provider,Consumer，可以直接在上下文对象中写入数据

```js
// 1.创建一个上下文对象
const AppContext = createContext({
    name: 'React context',
    isActive: true
});
```

**如果要用到上下文对象中的数据, 则需要给当前组件的 xx.contextType = 上下文对象**

```js
class Son extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
    }
    render() {
        // console.log(this.props);
        return (
            <div>
                <p>{this.context.isActive ? this.context.name : 'noTrue'}</p>
                <p>{this.context.isActive + ''}</p>
            </div>
        )
    }
}
// 如果要用到上下文对象中的数据, 则需要给当前组件的 xx.contextType = 上下文对象,不然 this.context 找不到对应的数据
Son.contextType = AppContext
```

**第三种：**

多个上下文对象的嵌套数据使用

```js
import React, { createContext } from 'react'

// 1.创建一个上下文对象
const AppContext1 = createContext({});
const AppContext2 = createContext({});
class Son extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
    }
    render() {
        // console.log(this.props);
        return (
            <AppContext1.Consumer>
                {
                    (value1) => {
                        return (
                            <AppContext2.Consumer>
                                {
                                    (value2) => {
                                        return (
                                            <div>
                                                <p>{value1.isActive ? value1.name : 'noTrue'}</p>
                                                <p>{value1.isActive + ''}</p>
                                                <p>{value2.gender}</p>
                                            </div>
                                        )
                                    }
                                }
                            </AppContext2.Consumer>
                        )
                    }
                }
            </AppContext1.Consumer>
        )
    }
}
// 这里不能用第二种方法实现多级的关系, 第二次赋值会覆盖掉第一次的值
// Son.contextType = AppContext1
// Son.contextType = AppContext2

class App extends React.Component {
    render() {
        return (
            // 固定是 value
            <AppContext1.Provider value={{ name: 'React context', isActive: true }}>
                <AppContext2.Provider value={{ gender: 'man' }}>
                    <Father />
                </AppContext2.Provider>
            </AppContext1.Provider>
        )
    }
}

export default App
```

## 7.跨组件通讯-events



![image-20210912150515332](/E:\就业班课程\React\react-脚手架\image-20210912150515332.png)



**兄弟组件之间的传递：**

```js
import React from 'react'
import ReactTypes from 'prop-types'
import { EventEmitter } from 'events'

// 在全局创建一个全局的事件管理器对象
const eventBus = new EventEmitter()
class A extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            age: ''
        }
    }
    // 当A组件创建好之后,React会自动调用componentDidMount这个生命周期方法
    // 这个方法不用我们手动调用, React会自动帮我们调用
    // 当组件被渲染到界面上的时候, React就会自动调用
    componentDidMount() {
        eventBus.addListener('say', this.aFn.bind(this))
    }
    render() {
        // console.log(this.props);
        return (
            <div>
                <p>A</p>
                <p>{this.state.name}</p>
                <p>{this.state.age}</p>
            </div>
        )
    }
    aFn(name, age) {
        console.log(name, age);
        this.setState({
            name: name,
            age: age
        })
    }
    // 子组件中校验参数类型
    static propTypes = {
        name: ReactTypes.string,
        age: ReactTypes.number
    }
}

class B extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
    }
    render() {
        console.log(this.props);
        return (
            <div>
                <p>B</p>
                <button onClick={() => { this.btnClick() }}>按钮</button>
            </div>
        )
    }
    btnClick() {
        eventBus.emit('say', 'React!!', 666)
    }
}
```

**爷爷与儿子之间的传递：**

```js
import React from 'react'
import { EventEmitter } from 'events'

// 在全局创建一个全局的事件管理器对象
const eventBus = new EventEmitter()
class Son extends React.Component {
    render() {
        // console.log(this.props);
        return (
            <div>
                <p>Son</p>
                <button onClick={()=>{this.btnClick()}}>按钮</button>
            </div>
        )
    }
    btnClick() {
        eventBus.emit('say','React!!!',666)
    }
}

class Father extends React.Component {
    render() {
        return (
            <div>
                <p>Father</p>
                <Son />
            </div>
        )
    }
}

class App extends React.Component {
    // 当App组件创建好之后,React会自动调用componentDidMount这个生命周期方法
    componentDidMount() {
        eventBus.addListener('say',this.appFn.bind(this))
    }
    // 💥注意点: 如果通过events来实现跨组件的通讯
    //           那么为了性能考虑, 应该在组件卸载的时候移除掉对应的事件
    // componentWillUnmount 也是 React 组件的一个生命周期方法
    // 这个方法不用我们手动调用, React会自动帮我们调用
    // 当组件被渲染到界面上的时候, React就会自动调用
    componentWillUnmount() {
        eventBus.removeListener('say',this.appFn.bind(this))
    }
    render() {
        return (
            <div>
                <Father />
            </div>
        )
    }
    appFn(name,age) {
        console.log('App组件');
        console.log(name,age);
    }
}

export default App
```

## 8.Props和State区别

**.props和state区别:** 

\- props和state都是用来存储数据的

  	\- props存储的都是父组件传递过来的数据
  	
  	 \- state存储的是自己的数据
  	
  	\- props只读的
  	
  	\- state可读可写的

## 9.State面试题

1.setState是同步的还是异步的？  默认情况下setState是异步的

2.为什么setState是异步的？ 主要是为了优化性能

3.如何拿到更新之后的数据？ setState方法其实可以接收两个参数，通过setState方法的第二个参数, 通过回调函数拿到

4.setState一定是异步的吗？ 不一定: 在定时器中, 在原生事件中都是同步的

```js
import React from 'react'

class App extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
        this.state = {
            age: 18
        }
    }
    render() {
        // console.log('更新页面');
        return (
            <div>
                <p>{this.state.age}</p>
                {/* <button onClick={()=>{this.btnClick()}}>按钮</button> */}
                <button id={'btn'}>按钮</button>
            </div>
        )
    }
    // 当组件创建好之后执行
    componentDidMount() {
        const oBtn = document.getElementById('btn')
        oBtn.onclick = () => {
            this.setState({
                age: 111
            })
            console.log(this.state.age);
        }
    }
    btnClick() {
        /*
        this.setState({
            age:111
        }, () => {
            console.log(this.state.age); // 111
        })
        * */
        /*
        this.setState({
            age:222
        })
        this.setState({
            age:333
        })
        console.log(this.state.age); // 18
        * */
        /*
        setTimeout(() => {
            this.setState({
                age:111
            })
            console.log(this.state.age);// 111
        },0)
        * */
    }
}

export default App
```

## 10.setState函数的原理

setState底层是用了浅拷贝去实现数据驱动页面更新	

```js
let oldObj = { name: 'React', age: 18 };
let newObj = { age: 666 }
let obj = Object.assign({}, oldObj, newObj)  // { name:'React', age: 666 }
```

**例子：**调用 3 次 this.setState({ age: this.state.age + 1 }) 为什么最终的一个值是 1，而不是 3 呢？因为 setState 默认是一个异步的方法，默认会收集一段时间内			所有的更新，然后再统一更新，所以就导致了最终的一个值是1，不是3

**问题的演示：**

```js
let oldObj = {age:0};
let stateList = [
    // {age: oldObj.age + 1},
    // {age: oldObj.age + 1},
    // {age: oldObj.age + 1},
    // {age: 0 + 1},
    // {age: 0 + 1},
    // {age: 0 + 1},
    {age: 1},
    {age: 1},
    {age: 1},
]
stateList.forEach((newObj)=>{
    // Object.assign({},{age: 0},{age: 1}); // {age: 1}
    // Object.assign({},{age: 0},{age: 1}); // {age: 1}
    // Object.assign({},{age: 0},{age: 1}); // {age: 1}
    oldObj = Object.assign({},oldObj,newObj);
})
console.log(oldObj); // {age: 1}
```

**解决的方案：**

```js
this.setState((preState,props)=>{ // preState 上一次的值
    return {age: preState.age + 1}
})
this.setState((preState,props)=>{
    return {age: preState.age + 1}
})
this.setState((preState,props)=>{
    return {age: preState.age + 1}
})
// 实现的原理
let oldObj = {age:0};
let stateList = [
    (preState)=>{return {age:preState.age + 1}},
    (preState)=>{return {age:preState.age + 1}},
    (preState)=>{return {age:preState.age + 1}},
]
stateList.forEach((fn)=>{
    // {age:1}
    // {age:2}
    // {age:3}
    let newObj = fn()
    // {age:0} {age:1} / {age:1}
    // {age:1} {age:2} / {age:2}
    // {age:2} {age:3} / {age:3}
    oldObj = Object.assign({},oldObj,newObj)
})
console.log(oldObj); // {age: 3}
```

## 11.生命周期组件执行时机图

![](/E:\Vue,React课程\React\react-脚手架\image-20210913103752015.png)

**常用生命周期组件各自的作用：**

**constructor：**

1.通过 props 接收父组件传递过来的数据，

2.通过 this.state 初始化内部的数据

3.通过 bind 为事件绑定实例（this） this.myClick = this.btnClick.bind(this);

**render：**

1.返回组件的网页结构

**componentDidMount：**

1.依赖于DOM的操作可以在这里进行

2.在此处发送网络请求就最好的地方 （官方建议）

3.可以在此处添加一些订阅（会在componentWillUnmount取消订阅）

**componentDidUpdate：**

1.可以在此对更新之后的组件进行操作

**componentWillUnmount：**

1.在此方法中执行必要的清理操作

2.例如，清除 timer，取消网络请求或清除

3.在 componentDidMount() 中创建的订阅等

## 12.组件 - diff算法

https://zh-hans.reactjs.org/docs/reconciliation.html#the-diffing-algorithm

![](/E:\Vue,React课程\React\react-脚手架\image-20210913115328927.png)

## 13.组件 - 列表渲染优化

1.由于 diff 算法在比较的时候默认情况下只会进行同层同位置的比较，所以在渲染列表时可能会存在性能问题

2.如何让 diff 算法递归比较同层所有元素？

**给列表元素添加 key ，告诉 React 除了和同层同位置比，还需要和同层其它位置比**

3.**💥注意点：添加的 key 必须保持它的唯一性**



## 14.组件的性能优化

一、（类组件） 在没有优化前，在用 setState 更新父组件的数据时，会触发父组件和子组件的 render 生命周期函数，这会降低了性能，在子组件没有更新数据也被触发了

https://zh-hans.reactjs.org/docs/react-component.html#shouldcomponentupdate

解决：

1.可以利用 shouldComponentUpdate 来解决

```js
shouldComponentUpdate(nextProps, nextState, nextContext) {
        // console.log(nextState);
        // 如果这一次的不等于上一次的则通过, 否则不通过
        if (this.state.message !== nextState.message) {
            return true
        }
        return false
    }
```

shouldComponentUpdate  存在的问题

所有需要优化子组件都需要实现这个方法，但是这个方法并没有技术含量

2.**💥（推荐）让组件继承于PureComponent，让 React 自动帮我们实现**

二、（函数式组件）优化

对于函数式组件来说：1.没有继承的关系，2.没有生命周期方法

**🔔我们可以通过 React.memo() 高阶函数，React.memo()会返回一个优化后的组件给我们**

3.state 注意点

永远不要直接修改 state 中的数据，如果要修改 state 中的数据，必须通过 setState 传递一个新的值

```js
import React from 'react'
/*
1.state注意点
永远不要直接修改state中的数据
如果要修改state中的数据, 必须通过setState传递一个新的值
 */

class App extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            age : 1
        }
    }
    /*
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // 用第一种将修改后的对象直接放到 setState 的结果是  1 1
        // 用第二种将新对象放到 setState 中的结果是 0 1
        console.log(this.state.age,nextState.age);
        // 如果这一次的不等于上一次的则通过, 否则不通过
        if (this.state.age !== nextState.age) {
            return true
        }
        return false
    }
    */
    render() {
        console.log('App - render被调用');
        return (
            <div>
                <p>{ this.state.age }</p>
                <button onClick={() => { this.btnClick() }}>App按钮</button>
            </div>
        )
    }
    btnClick() {
        // 以下两种写法区别:
        // 上面这种方式是设置了以前的对象
        // 下面一种方式是设置了一个新的对象

        // this.state.age = this.state.age + 1
        // this.setState(this.state)
        this.setState({
            age:this.state.age + 1
        })
    }
}

export default App
```

## 15.组件 - Ref

1.React 中获取元素的方式：字符串、对象、回调函数

https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#gatsby-focus-wrapper

```js
import React from 'react'
// import { createRef } from 'react';

/*
1.React中获取元素的方式
- 字符串
- 对象
- 回调函数
https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#gatsby-focus-wrapper
* */
class App extends React.PureComponent{
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
        // this.oPRef = createRef()
        this.oPRef = null
    }
    render() {
        console.log('App - render被调用');
        return (
            <div>
                {/*
                <p id={'box'}>我是段落</p>
                */}
                {/*
                <p ref={'box'}>我是段落</p>
                */}
                {/*
                <p ref={this.oPRef}>我是段落</p>
                */}
                <p ref={(arg)=>{this.oPRef = arg}}>我是段落</p>
                <button onClick={() => { this.btnClick() }}>App按钮</button>
            </div>
        )
    }
    btnClick() {
        // 第一种获取方式: 传统方式(在React中及其不推荐)
        // let oP = document.getElementById('box');
        // 第二种获取方式: 通过ref='字符串' / this.refs.字符串 (通过字符串的方式即将被废弃, 也不推荐)
        // let oP = this.refs.box;
        // 第三种获取方式: 通过createRef()创建一个对象, 然后将这个对象传递给ref (推荐)
        // let oP = this.oPRef.current
        // 第四种获取方式: 通过传递一个回调函数, 然后保存回调函数参数的方式(推荐)
        let oP = this.oPRef
        oP.innerText = 'React'
        console.log(oP);
    }
}

export default App
```

💥💥注意点：

​	**1.如果获取的是原生的元素, 那么拿到的就是元素本身**

​    **2.如果获取的是类组件元素, 那么拿到的就是类组件的实例对象**

​    **3.如果获取的是函数组件元素, 那么什么都拿不到**

虽然函数组件无法通过像获取原生元素和类组件元素那样获取，但是可以使用 **组件的高阶函数**  **React.forwardRef()** 去获取

```js
// 函数组件会接收两个参数，一个是父组件传递过来的数据props，一个是创建出来的Ref对象
const About = React.forwardRef((props,myRef) => {
    return (
        <div ref={myRef}>
            <p>我是p标签</p>
            <span>我是span标签</span>
        </div>
    )
})

class App extends React.PureComponent{
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
        this.myRef = createRef();
    }
    render() {
        console.log('App - render被调用');
        return (
            <div>
                <About ref={this.myRef} />
            </div>
        )
    }
```

## 16.受控组件

值受到 react 控制的表单元素

https://zh-hans.reactjs.org/docs/forms.html#controlled-components

```js
import React from 'react'

/*
1.受控组件:
值受到react控制的表单元素
https://zh-hans.reactjs.org/docs/forms.html#controlled-components
* */

class App extends React.PureComponent{
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
        this.state = {
            name: 'React',
            email: '894817389@qq.com',
            phone: 13149343162
        }
    }
    render() {
        return (
            <form>
                <input
                    type="text"
                    name={'name'}
                    value={this.state.name}
                    onChange={(e)=>{this.change(e)}}
                />
                <input
                    type="text"
                    name={'email'}
                    value={this.state.email}
                    onChange={(e)=>{this.change(e)}}
                />
                <input
                    type="text"
                    name={'phone'}
                    value={this.state.phone}
                    onChange={(e)=>{this.change(e)}}
                />
            </form>
        )
    }
    change(e) {
        console.log(e.target.name);
        this.setState({
            // name 作为key值
            [e.target.name]: e.target.value
        })
    }
}

export default App
```

## 17.非受控组件

值不受到react控制的表单元素

https://zh-hans.reactjs.org/docs/uncontrolled-components.html

```js
import React from 'react'

/*
1.非受控组件:
值不受到react控制的表单元素
https://zh-hans.reactjs.org/docs/uncontrolled-components.html
* */

class App extends React.PureComponent{
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
        this.myRef = React.createRef();
    }
    render() {
        return (
            <form onSubmit={(e)=>{this.submit(e)}}>
                <input type="text" ref={ this.myRef }/>
                <input type="submit" />
            </form>
        )
    }
    submit(e) {
        // 阻止表单默认提交事件
        e.preventDefault();
        console.log(this.myRef.current.value);
    }
}

export default App
```

## 18.高阶组件的简单使用

1.高阶组件(Higher-Order Components，简称为 HOC):

\- 参数为组件，返回值为新组件的函数

https://zh-hans.reactjs.org/docs/higher-order-components.html#gatsby-focus-wrapper

```js
class Home extends React.PureComponent{
    render() {
        return (
            <div>Home</div>
        )
    }
}
// 创建一个高阶函数（参数是一个组件）
function higherOrderComponent(WrappedComponent) {
    class AdvComponent extends React.PureComponent{
        render() {
            return (
                <div>
                    <WrappedComponent/>
                </div>
            )
        }
    }
    return AdvComponent
}
// 调用高阶函数传入 Home 组件作为参数
const AdvComponent = higherOrderComponent(Home)
class App extends React.PureComponent{
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <AdvComponent/>
            </div>
        )
    }
}

export default App
```

### 💥高阶组件应用场景：代码复用/增强Props/抽离State/生命周期拦截

```js
import React from 'react'
import {EventEmitter} from 'events'

/*
1.高阶组件应用场景1:
- 代码复用/增强Props/抽离State/生命周期拦截
https://zh-hans.reactjs.org/docs/higher-order-components.html#gatsby-focus-wrapper
* */

const AppContext = React.createContext({})
const { Provider, Consumer } = AppContext
const eventBus = new EventEmitter()
class Son1 extends React.PureComponent{
    render() {
        return (
            <div>
                <p>{this.props.name}</p>
                <p>{this.props.age}</p>
                <p>{this.props.country}</p>
                {
                    this.props.list.map(item => {
                        return (
                            <p key={item}>{ item }</p>
                        )
                    })
                }
            </div>
        )
    }
}

class Son2 extends React.PureComponent{
    render() {
        return (
            <ul>
                <li>{this.props.name}</li>
                <li>{this.props.age}</li>
                <li>{this.props.country}</li>
                {
                    this.props.list.map(item => {
                        return (
                            <li key={item}>{item}</li>
                        )
                    })
                }
            </ul>
        )
    }
}
// 创建一个高阶函数（参数是一个组件）
function EnhancedComponent(WrappedComponent) {
    class Father extends React.PureComponent{
        // 抽离了子组件中的 State 数据, 不用产生太多冗余代码, 不用每个子组件都写一遍
        constructor(props) {
            super(props)
            this.state = {
                list:[]
            }
        }
        // 生命周期的拦截, 不用产生太多冗余代码, 不用每个子组件都写一遍
        componentDidMount() {
            eventBus.addListener('update',this.update.bind(this))
        }
        componentWillUnmount() {
            eventBus.removeListener('update',this.update.bind(this))
        }
        render() {
            return (
                <Consumer>
                    {
                        (value) => {
                            return (
                                // 这里的 WrappedComponent 相当于是 Son1 Son2 给它们传递 name 和 age 字段 然后它们可以用props接收
                                // <WrappedComponent name={value.name} age={ value.age }/>
                                // 🔔简写 直接传全部的数据
                                <WrappedComponent {...value} {...this.props} {...this.state}/>
                            )
                        }
                    }
                </Consumer>
            )
        }
        update(list) {
            this.setState({
                list:list
            })
        }
    }
    return Father
}
// 调用高阶函数传入 Son1,Son2 组件作为参数
const Father1 = EnhancedComponent(Son1)
const Father2 = EnhancedComponent(Son2)
class App extends React.PureComponent{
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }
    render() {
        return (
            // 既可以给子组件传递相同数据, 也可以传递不同数据
            <Provider value={{ name: 'React is nice', age: 666 }}>
                {/* 这里传的值给到了 Father 中的 props */}
                <Father1 country={ '中国' }/>
                <Father2 country={'俄罗斯'} />
                <button onClick={()=>{this.btnClick()}}>按钮</button>
            </Provider>
        )
    }
    btnClick() {
        // 传参数给子组件
        eventBus.emit('update',['鲁班','虞姬','诸葛亮'])
    }
}

export default App
```

### 💥高阶组件权限控制：

这里只是简单的介绍了下大致实现逻辑，具体的请看下面的 Redux 和 Hooks

```js
import React from 'react'

/*
1.高阶组件:
- 权限控制
https://zh-hans.reactjs.org/docs/higher-order-components.html#gatsby-focus-wrapper
* */

class Login extends React.PureComponent{
    render() {
        return (
            <div>用户登录</div>
        )
    }
}
class Info extends React.PureComponent{
    render() {
        return (
            <div>用户信息</div>
        )
    }
}
// 创建一个高阶函数（参数是一个组件）
function higherOrderComponent(WrappedComponent) {
    class Authority extends React.PureComponent{
        render() {
            if (this.props.isLogin) {
                return <Info/>
            } else {
                return <Login/>
            }
        }
    }
    return Authority
}
// 调用高阶函数传入 Home 组件作为参数
const AuthorityInfo = higherOrderComponent(Info)
class App extends React.PureComponent{
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <AuthorityInfo isLogin={false}/>
            </div>
        )
    }
}

export default App
```

## 19.root中以外的内容 - 利用 Portal

Portals:

\- 默认情况下, 所以的组件都是渲染到root元素中的

 Portal提供了一种将组件渲染到其它元素中的能力

https://zh-hans.reactjs.org/docs/portals.html

🔔🔔**这里可以打开百度页面，然后点击右上角的登录会弹窗一个登录框，这个登录框组件就是单独的一个标签里面的，在删除主标签后不影响它的显示**

```js
import React from 'react'
import ReactDOM from 'react-dom'

class Model extends React.PureComponent {
    render() {
        /*
        this.props.children: 可以获取到当前组件所有的子元素或者子组件
        createPortal: 接收两个参数
        第一个参数: 需要渲染的内容
        第二个参数: 渲染到什么地方
        * */
        return ReactDOM.createPortal(this.props.children, document.getElementById('other'))
    }
}
class App extends React.PureComponent{
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div id="app">
                <Model>
                    <div id="model">Model</div>
                </Model>
            </div>
        )
    }
}

export default App
```

## 20.去除 React 中多余的 HTML 标签 - 利用 Fragment：（优化）

Fragment:

\- 由于React规定, 组件中只能有一个根元素

 所以每次编写组件的时候, 我们都需要在最外层包裹一个冗余的标签

\- 如果不想渲染这个冗余的标签, 那么就可以使用Fragment来代替

💥**注意点：如果需要给Fragment添加key, 那么就不能使用语法糖 <></>**

https://zh-hans.reactjs.org/docs/fragments.html

```js
import React from 'react'

class Home extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            heroList:['鲁班','虞姬','诸葛亮']
        }
    }
    render() {
        return (
            /*
            <React.Fragment>
                <p>{this.state.heroList[0]}</p>
                <p>{this.state.heroList[1]}</p>
                <p>{this.state.heroList[2]}</p>
            </React.Fragment>
            */
            // 如果需要给Fragment添加key, 那么就不能使用语法糖
            <>
                {
                    this.state.heroList.map(item => {
                        return (
                            // <p key={item}>{item}</p>
                            <React.Fragment key={item}>
                                <p>{item}</p>
                            </React.Fragment>
                        )
                    })
                }
            </>
        )
    }
}
class App extends React.PureComponent{
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }
    render() {
        return (
            // <React.Fragment id="app">
            //     <Home/>
            // </React.Fragment>
            // 下面的这种写法就是上面写法的语法糖
            <>
                <Home/>
            </>
        )
    }
}

export default App
```

## 21.React.StrictMode 开启严格模式（了解）

**1.什么是StrictMode?**

作用: 开启严格模式, 检查后代组件中是否存在潜在问题

注意点:

\- 和Fragment一样, 不会渲染出任何UI元素

\- 仅在'开发模式'下有效



**2.StrictMode检查什么?**

\- 检查过时或废弃的属性/方法/...

\- 检查意外的副作用

 \+ 这个组件的constructor会被调用两次

 \+ 检查这里写的一些逻辑代码被调用多次时，是否会产生一些副作用

https://zh-hans.reactjs.org/docs/strict-mode.html#gatsby-focus-wrapper

```js
// 在入口函数 index.js中
ReactDOM.render(
    // React.StrictMode 开启严格模式
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'))
```

## 22.内联样式

**1.React中的样式**

React并没有像Vue那样提供特定的区域给我们编写CSS代码

所以你会发现在React代码中, CSS样式的写法千奇百怪

**2.内联样式**

\- 内联样式的优点:

  \+ 内联样式, 样式之间不会有冲突

  \+ 可以动态获取当前state中的状态

\- 内联样式的缺点：

  \+ 写法上都需要使用驼峰标识

  \+ 某些样式没有提示

  \+ 大量的样式, 代码混乱

  \+ 某些样式无法编写(比如伪类/伪元素)

```js
import React from 'react'

class App extends React.PureComponent {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            color: 'red'
        }
    }
    render() {
        return (
            <>
                <p style={{fontSize:'50px',color:this.state.color}}>我是段落1</p>
                <p style={{fontSize:'50px',color:'green'}}>我是段落2</p>
                <button onClick={()=>{this.btnClick()}}>按钮</button>
            </>
        )
    }
    btnClick() {
        this.setState({
            color:'blue'
        })
    }
}

export default App
```

## 23.外联样式

**1.外链样式**

将CSS代码写到一个单独的CSS文件中, 在使用的时候导入进来

\- 外链样式的优点:

  \+ 编写简单, 有代码提示, 支持所有CSS语法

\- 外链样式的缺点：

  \+ 不可以动态获取当前state中的状态

  \+ 属于全局的css，样式之间会相互影响

##24.CSS模块化

**1.Css Module**

\- React的脚手架已经内置了css modules的配置：

  \+ .css/.less/.scss 等样式文件都修改成 .module.css/.module.less/.module.scss 等；

\- Css Modules优点

  \+ 编写简单, 有代码提示, 支持所有CSS语法

  \+ 解决了全局样式相互污染问题

\- Css Modules缺点

  \+ 不可以动态获取当前state中的状态

```js
// 子组件中的编写方式
import React from 'react'
import HomeStyle from '../Components/Home.module.css'

class Home extends React.PureComponent{
    render() {
        return (
            <div>
                <p className={HomeStyle.title}>我是Home段落</p>
                <a href="www.baidu.com" className={HomeStyle.link}>我是Home超链接</a>
            </div>
        )
    }
}

export default Home
```

## 25.TaggedTemplateLiterals  CSS-In-JS 前缀

在JS中除了可以通过()来调用函数以外，其实我们还可以通过模板字符串来调用函数

```js
function test(...args) {
    console.log(args);
}
// test(1, 3, 5); // [ 1, 3, 5 ]
// test`1, 3, 5`; // [ [ '1, 3, 5' ] ]
```

通过模板字符串调用函数规律

参数列表中的**第一个参数是一个数组**, 这个数组中保存了所有不是插入的值

参数列表的**第二个参数开始**, 保存的就是所有插入的值

总结结论：

**1.我们可以拿到模板字符串中所有的内容**

**2.我们可以拿到模板字符串中所有非插入的内容**

**3.我们可以拿到模板字符串中所有插入的内容**

**4.所以我们就可以对模板字符串中所有的内容进行单独的处理**

```js
test`1, 3, 5, ${name}, ${age}`; // [ [ '1, 3, 5, ', ', ', '' ], 'React', 666 ]
```

## 26.Css-In-JS

\- 在React中, React认为结构和逻辑是密不可分的,所以在React中结构代码也是通过JS来编写的

 正是受到React这种思想的影响, 所以就有很多人开发了用JS来编写CSS的库

  **\+ styled-components / emotion**

\- 利用JS来编写CSS, 可以让CSS具备样式嵌套、函数定义、逻辑复用、动态修改状态等特性

  \+ 也就是说, 从某种层面上, 提供了比过去Less/Scss更为强大的功能

  \+ 所以Css-in-JS, 在React中也是一种比较推荐的方式



2.styled-components使用

\- 1.安装styled-components

 **npm install styled-components --save**

\- 2.导入styled-components

 **import styled from 'styled-components';**

\- 3.利用styled-components创建组件并设置样式

\- 4.如果是用 webstorm 编译器的话就要翻墙下载 webstorm-styled-components 插件并添加进去里面，

​	  如果是用 vscode 编译器的话就要去插件库里面下载 vscode-styled-components 即可

```js
import React from 'react'
import styled from 'styled-components';

// 注意点:
// 默认情况下在vscode中编写styled-components的代码是没有任何的代码提示的
// 如果想有代码提示, 那么必须给vscode安装一个插件
const StyleDiv = styled.div`
    p{
        font-size:50px;
        color:red;
    }
    a{
        color: pink;
    }
`

class Home extends React.PureComponent{
    render() {
        return (
            <StyleDiv>
                <p>我是Home段落</p>
                <a href="www.baidu.com">我是Home超链接</a>
            </StyleDiv>
        )
    }
}

export default Home
```

### 🔔Css-In-JS的重要特性：

#### 特性一：props 和 attrs 的使用

**props**：在给组件传递了参数后，组件用 props 接收了参数，然后再字符模板中是用 ${} 去使用插入的内容的，那么要用到 props 中的数据该如何在字符模板中使用呢？**方法是：${ (props) => props.传递的参数名称 }**

**attrs**：是一个构造方法，可以给样式组件添加自身的额外属性（这个属性只允许html标签原生自有的属性），不支持自定义属性，要想要添加自定义属性，只能在 jsx 元素上进行添加

attrs可接收两种类型的参数：

- 参数可以接收一个对象，通过它添加的属性，会被合并到样式组件当中去
- 参数可以是一个函数，如果有 props 值，则可使用该模式

```js
import React from 'react'
import styled from 'styled-components';

/*
1.styled-components特性
- props
- attrs
* */

// 💥注意点: 
//  调用完 attrs 方法之后, 这个方法返回的还是一个函数
//  所以我们还可以继续通过字符串模板来调用
/*
为什么组件内的行内属性覆盖不了这里的属性
const Input = styled.input.attrs({
      placeholder: '请输入信息',
      type: 'text'
  })
*/
const StyleInput = styled.input.attrs(props => ({ // 参数是一个函数,可以通过props进行接收
    type:'password'
}))`
    width:${props => props.width};
    height: ${props => props.size === 'small'? '24px': '40px'};
    font-size: 14px;
    text-indent: 10px;
    border-radius: 3px;
    border: 1px solid palevioletred;
    display: block;
    margin: 0 0 1em;
  
    ::placeholder {
      color: palevioletred;
    }
`

const StyleDiv = styled.div`
    p{
        font-size:50px;
        color:${(props)=>props.color};
    }
    a{
        color: pink;
    }
`

class Home extends React.PureComponent{
    constructor(props) {
        super(props)
        this.state = {
            color:'red'
        }
    }
    render() {
        return (
            // StyleDiv 组件 props 接收参数
            <StyleDiv color={this.state.color}>
                <p>我是Home段落</p>
                <a href="www.baidu.com">我是Home超链接</a>
                <button onClick={() => { this.btnClick() }}>按钮</button>
                {/* <StyleInput type={'password'}></StyleInput> */}
                <StyleInput width="150px" size="small" />
                <StyleInput width="200px" size="large"/>
            </StyleDiv>
        )
    }
    btnClick() {
        this.setState({
            color:'blue'
        })
    }
}

export default Home
```

#### 特性二：设置主题

1.首页在父组件引入**共有生产者** ( **ThemeProvider** )

```js
// 1.在App.js中
import React from 'react'
import Home from './Components/Home'
import About from './Components/About'
import { ThemeProvider } from 'styled-components'

class App extends React.PureComponent {
    render() {
      return (
          // ThemeProvider 是设置生产者共有数据, 子组件用 props 接收
            <ThemeProvider theme={{size:'50px',color:'red'}}>
                <Home />
                <About />
            </ThemeProvider>
        )
    }
}

export default App

// 2.在子组件中 利用 props 接收传递过来的参数
import React from 'react'
import styled from 'styled-components';

const StyleDiv = styled.div`
    p{
        font-size:${(props)=>props.theme.size};
        color:${(props)=>props.theme.color};
    }
`

class Home extends React.PureComponent{
    render() {
        return (
            <StyleDiv>
                <p>我是Home段落</p>
            </StyleDiv>
        )
    }
}

export default Home
```

#### 特性三：继承

将公共的样式写在一个标签中，然后通过函数传参的方式实现继承

```js
import React from 'react'
import styled from 'styled-components'

/*
1.继承
* */
const BaseDiv = styled.div`
    font-size: 50px;
    background: blue;
`;
const StyleDiv1 = styled(BaseDiv)`
    color:red
`;
const StyleDiv2 = styled(BaseDiv)`
    color:green
`;

class App extends React.PureComponent {
    render() {
      return (
        <div>
          <StyleDiv1>我是div1</StyleDiv1>
          <StyleDiv2>我是div2</StyleDiv2>
        </div>
        )
    }
}

export default App
```

## 27.React中 - 动画

**1.React过渡动画**

在React中我们可以通过原生的CSS来实现过渡动画，
但是React社区为我们提供了react-transition-group帮助我们快速过渡动画

**2.动画组件：**

🔔**Transition**

+ 该组件是一个和平台无关的组件（不一定要结合CSS）；
+ 在前端开发中，我们一般是结合CSS来完成样式，所以比较常用的是CSSTransition；

🔔**CSSTransition**

+ 在前端开发中，通常使用CSSTransition来完成过渡动画效果

🔔**SwitchTransition**

+ 两个组件显示和隐藏切换时，使用该组件

🔔**TransitionGroup**

+ 将多个动画组件包裹在其中，一般用于列表中元素的动画；

### 1.原生动画

```js
import React from 'react'
import styled from 'styled-components'

/*
1.React过渡动画
- 在React中我们可以通过原生的CSS来实现过渡动画
* */

const StyleDiv = styled.div`
    width: ${(props)=>props.width};
    height: ${(props)=>props.height};
    background-color: skyblue;
    opacity: ${(props)=>props.opacity};
    transition: all 3s;
`
class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      width: '0',
      height: '0',
      opacity: '0'
    }
  }
    render() {
      return (
        <div>
          <StyleDiv {...this.state}></StyleDiv>
          <button onClick={()=>{this.btnClick()}}>按钮</button>
        </div>
        )
  }
  btnClick() {
    this.setState({
      width: '100px',
      height: '100px',
      opacity: '1'
    })
  }
}

export default App
```

### 2.CSSTransition

1.如何通过CSSTransition来实现过渡效果?

1.1安装react-transition-group

**npm install react-transition-group --save**

1.2从安装好的库中导入CSSTransition

**import {CSSTransition} from 'react-transition-group';**

🔔**1.3利用CSSTransition将需要执行过渡效果的组件或元素包裹起来**

1.4编写对应的CSS动画

**实现: .-enter / .-enter-active / .-enter-done**

1.5给CSSTransition添加一些属性

**in属性    :**

取值是一个布尔值, 如果取值为false表示触发退出动画, 如果取值是true表示触发进入动画

**classNames属性:**

指定动画类名的前缀

**timeout属性  :**

设置动画超时时间

**unmountOnExit :**
如果取值为true, 那么表示退出动画执行完毕之后删除对应的元素

2.CSSTransition状态

- CSSTransition有三个状态：
  + appear: 初始
  + enter : 进入
  + exit；: 退出
- 当组件第一次加载时候会自动查找
  -appear / -appear-active / -appear-done
- 当组件显示时会自动查找
  -enter / -enter-active / -enter-done
- 当组件退出时会自动查找
  -exit / -exit-active / -exit-done

```js
import React from 'react'
import { CSSTransition } from 'react-transition-group';
import './App.css'

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isShow:true
    }
  }
  render() {
    return (
      <div>
        {/* 需要执行过渡效果的组件或元素包裹起来 */}
        {/* unmountOnExit: 如果取值为true, 那么表示退出动画执行完毕之后删除对应的元素 */}
        <CSSTransition in={this.state.isShow} classNames={'box'} timeout={3000} unmountOnExit={true} appear>
          <div></div>
        </CSSTransition>
        <button onClick={() => { this.btnClick() }}>{ this.state.isShow?'隐藏':'显示' }</button>
      </div>
    )
  }
  btnClick() {
    this.setState({
      isShow:!this.state.isShow
    })
  }
}

export default App

// App.css中代码
.box-enter{
    /*进入动画执行之前绑定的类名*/
    width: 0;
    height: 0;
    opacity: 0;
    background: skyblue;
}
.box-enter-active{
    /*进入动画执行过程中绑定的类名*/
    width: 100px;
    height: 100px;
    opacity: 1;
    transition: all 3s;
}
.box-enter-done{
    /*进入动画执行完毕之后绑定的类名*/
    width: 100px;
    height: 100px;
    opacity: 1;
    background: red;
}
.box-exit{
    /*退出动画执行之前绑定的类名*/
    width: 100px;
    height: 100px;
    opacity: 1;
    background: red;
}
.box-exit-active{
    /*退出动画执行过程中绑定的类名*/
    width: 0;
    height: 0;
    opacity: 0;
    transition: all 3s;
}
.box-exit-done{
    /*退出动画执行完毕之后绑定的类名*/
    width: 0;
    height: 0;
    opacity: 0;
    background: skyblue;
}
.box-appear{
    /*进入动画初始之前绑定的类名*/
    width: 0;
    height: 0;
    opacity: 0;
    background: skyblue;
}
.box-appear-active{
    /*进入动画初始过程中绑定的类名*/
    width: 100px;
    height: 100px;
    opacity: 1;
    transition: all 3s;
}
.box-appear-done{
    /*进入动画初始完毕之后绑定的类名*/
    width: 100px;
    height: 100px;
    opacity: 1;
    background: red;
}
```

#### 2.1 CSSTransition回调函数

1.onEnter( currentEl,isAppear )：进入动画开始之前

2.onEntering( currentEl,isAppear )：进入动画执行过程中

3.onEntered( currentEl,isAppear )：进入动画执行完毕

4.onExit( currentEl )：退出动画开始之前

5.onExiting( currentEl )：退出动画执行过程中

6.onExited( currentEl )：退出动画执行完毕

#### 2.2 SwitchTransition切换展示的内容

1.SwitchTransition可以完成组件切换的动画

- SwitchTransition 可以完成组件切换的动画
- SwitchTransition 组件里面要有 CSSTransition 或者 Transition 组件，不能直接包裹你想要切换的组件
- SwitchTransition 里面的 CSSTransition 或 Transition 组件不再像以前那样接收 in 属性来判断元素是何种状态，取而代之的是 key 属性

```js
import React from 'react'
import { CSSTransition,SwitchTransition } from 'react-transition-group';
import './App.css'

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isShow:true
    }
  }
  render() {
    return (
      <div>
        {/* mode={'out-in'} */}
        <SwitchTransition mode={'in-out'}>
        <CSSTransition key={this.state.isShow} classNames={'btn'} timeout={1000}>
            <button onClick={() => { this.btnClick() }}>{ this.state.isShow?'on':'off' }</button>
        </CSSTransition>
        </SwitchTransition>
      </div>
    )
  }
  btnClick() {
    this.setState({
      isShow:!this.state.isShow
    })
  }
}

export default App

// App.css
 .btn-enter{
     /*进入动画执行之前绑定的类名*/
    opacity: 0;
    transform: translateX(100%);
 }
 .btn-enter-active{
     /*进入动画执行过程中绑定的类名*/
     opacity: 1;
     transform: translateX(0);
     transition: all 1s;
 }
 .btn-enter-done{
     /*进入动画执行完毕之后绑定的类名*/
 }
 .btn-exit{
     /*退出动画执行之前绑定的类名*/
     opacity: 1;
     transform: translateX(0);
 }
 .btn-exit-active{
     /*退出动画执行过程中绑定的类名*/
     transform: translateX(-100%);
     opacity: 0;
     transition: all 1s;
 }
 .btn-exit-done{
     /*退出动画执行完毕之后绑定的类名*/
 }

 button{
     padding: 10px 20px;
     margin-left: 50%;
 }
```



#### 2.3 TransitionGroup列表的动画

TransitionGroup 的使用与 SwitchTransition 的使用是一样的

```js
import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css'

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      // heroList : ['鲁班', '鲁班', '鲁班']
      heroList: [
        { id: 1, name: '鲁班' },
        { id: 2, name: '虞姬' },
        { id: 3, name: '黄忠' }
      ]
    }
  }
  render() {
    return (
      <div>
        <ul>
          <TransitionGroup>
            {
              /*
              注意点:
              在企业开发中一定要保证CSSTransition key的唯一性
              * */
              this.state.heroList.map((item, index) => {
                return (
                  <CSSTransition key={item.id} classNames={'btn'} timeout={1000}>
                    <li onClick={() => { this.removeHero(index) }}>{item.name}</li>
                  </CSSTransition>
                )
              })
            }
            <button onClick={() => { this.addHero() }}>增加</button>
          </TransitionGroup>
        </ul>
      </div>
    )
  }
  // 点击移除英雄
  removeHero(index) {
    // console.log(index);
    const newList = this.state.heroList.filter((item, idx) => {
      return idx !== index
    })
    // console.log(newList);
    this.setState({
      heroList: newList
    })
  }
  addHero() {
    this.setState({
      // heroList: [...this.state.heroList, '阿珂']
      heroList: [...this.state.heroList, { id: this.state.heroList.length + 1, name: '阿珂' }]
    })
  }
}

export default App
```

## 28.React-Router路由

**1.如何在React中使用路由**

安装 react-router：**npm install react-router-dom**

从 react-router-dom 中解构出需要用到的属性 **import {BrowserRouter, HashRouter, Link, Route} from 'react-router-dom';**

\- 通过指定监听模式

​	+ BrowserRouter history模式  http://www.it666.com/home

​	+ HashRouter hash模式  http://www.it666.com/#/home

\- 通过Link修改路由URL地址

\- 通过Route匹配路由地址

官网文档地址: https://reactrouter.com/web/guides/quick-start

**🔔2.React路由注意点**一

\- react-router4之前, 所有路由代码都是统一放到react-router中管理的

\- react-router4开始, 拆分为了两个包react-router-dom和react-router-native

  \+ react-router-dom 在浏览器中使用路由

  \+ react-router-native 在原生应用中使用路由



\- BrowserRouter history模式使用的是H5的特性, 所以兼容性会比HashRouter hash模式差一些

\- 在企业开发中如果不需要兼容低级版本浏览器, 建议使用BrowserRouter

​      如果需要兼容低级版本浏览器, 那么只能使用HashRouter



**\- 无论是Link还是Route都只能放到BrowserRouter和HashRouter中才有效**

```js
import React from 'react';
import Home from './components/Home'
import About from './components/About'
import {BrowserRouter, HashRouter, Link, Route} from 'react-router-dom';

class App extends React.PureComponent{
    render(){
        return (
            <div>
                {/*设置监听模式*/}
                <BrowserRouter>
                    {/*修改路由地址*/}
                    <Link to={'/home'}>Home</Link>
                    <Link to={'/about'}>About</Link>
                    {/*维护URL和组件关系*/}
                    <Route path={'/home'} component={Home}/>
                    <Route path={'/about'} component={About}/>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;

```

**🔔3.React路由注意点二**

1.Router 注意点

\- 默认情况下 Router 在匹配资源地址时，是模糊匹配，如果必须和资源地址一模一样才匹配，那么需要添加 exact 属性，开启精准匹配

2.Link 注意点

\- 默认情况下 Link 会渲染成一个a标签，如果想渲染成其他元素，可以通过手动路由跳转来实现

3.NavLink 注意点

\- 默认情况下 NavLink 在匹配资源地址时，是模糊匹配，如果必须和资源地址一模一样才匹配，那么需要添加 exact 属性，开启精准匹配

```js
import React from 'react'
import './App.css'
import Home from './Components/Home'
import About from './Components/About'
import { BrowserRouter, HashRouter, Link, Route, NavLink } from 'react-router-dom'

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <BrowserRouter>
          {/*
          💥Link注意点: 
          默认情况下 Link 会渲染成一个a标签
          如果想渲染成其他的元素, 可以通过手动路由跳转来实现
           */}
          {/* <Link to={'/home'}>Home</Link>
          <Link to={'/home/about'}>About</Link> */}
          {/*
          💥NavLink注意点: 
          NavLink在匹配路由的时候, 是利用当前资源地址从左至右的和to中的地址进行匹配的
          只要当前资源地址从左至右完整的包含了to中的地址那么就认为匹配
          当前资源地址: /home/about
          to中的地址: /home
          to中的地址: /home/about
           */}
          <NavLink exact to={'/home'} activeStyle={{color:'red'}}>Home</NavLink>
          <NavLink exact to={'/home/about'} activeStyle={{color:'red'}}>About</NavLink>
          {/*
          💥3.Route注意点: 
          Route在匹配路由的时候, 是利用当前资源地址从左至右的和path中的地址进行匹配的
          只要当前资源地址从左至右完整的包含了path中的地址那么就认为匹配
          当前资源地址: /home/about
          path中的地址: /home
          path中的地址: /home/about
          */}
          <Route exact path={'/home'} component={Home} />
          <Route exact path={'/home/about'} component={About} />
        </BrowserRouter>
      </div>
    )
  }
}

export default App
```

### Router-Switch - 当匹配到了路由后续就不会在匹配

Switch:

默认情况下路由会从上至下匹配所有的Route, 只要匹配都会显示

但是在企业开发中大部分情况下, 我们希望的是一旦有一个匹配到了后续就不要在匹配了

此时我们就可以通过Switch来实现

```js
import React from 'react'
import './App.css'
import Home from './Components/Home'
import About from './Components/About'
import Other from './Components/Other'
import { BrowserRouter, HashRouter, Link, Route, NavLink, Switch } from 'react-router-dom'

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <BrowserRouter>
          <NavLink exact to={'/home'} activeStyle={{color:'red'}}>Home</NavLink>
          <NavLink exact to={'/home/about'} activeStyle={{ color: 'red' }}>About</NavLink>
          
          <Switch>
          <Route exact path={'/home'} component={Home} />
          <Route exact path={'/home/about'} component={About} />
          {/*如果Route没有指定path, 那么表示这个Route和所有的资源地址都匹配*/}
          <Route component={ Other }/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
```

###Router-Redirect- 资源重定向

可以在访问某个资源地址的时候重定向到另外一个资源地址

例如: 访问/user 重定向到 /login

```js
// App.js
import React from 'react'
import './App.css'
import Other from './Components/Other'
import { BrowserRouter, HashRouter, Link, Route, NavLink, Switch } from 'react-router-dom'
import User from './Components/User'
import Login from './Components/Login'

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <BrowserRouter>
          <NavLink exact to={'/user'} activeStyle={{ color: 'red' }}>User</NavLink>
          
          <Switch>
            <Route exact path={'/user'} component={User} />
            <Route exact path={'/login'} component={Login}/>
            {/*如果Route没有指定path, 那么表示这个Route和所有的资源地址都匹配*/}
            <Route component={ Other }/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App

// User.js
import React from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

const StyleDiv = styled.div`
    font-size: 20px;
    color: skyblue;
`

class User extends React.PureComponent{
    constructor(props) {
        super(props)
        this.state = {
            flag: true
        }
    }
    render() {
        let user = (
            <StyleDiv>
                <h1>用户界面</h1>
                <p>用户名: jonathan_lee</p>
                <p>密码: www.it666.com</p>
            </StyleDiv>
        )
        let login = <Redirect to={ '/login' }/>
        return this.state.flag ? user : login
    }
}

export default User
```

### Router-嵌套路由

1.嵌套路由(子路由):

路由里面又有路由, 我们就称之为嵌套路由

```js
import React from 'react'
import './App.css'
import Home from './Components/Home'
import About from './Components/About'
import Other from './Components/Other'
import { BrowserRouter, HashRouter, Link, Route, NavLink, Switch } from 'react-router-dom'
import User from './Components/User'
import Login from './Components/Login'
import Discover from './Components/Discover'

/*
1.嵌套路由(子路由):
路由里面又有路由, 我们就称之为嵌套路由
* */
class App extends React.PureComponent {
  render() {
    return (
      <div>
        <BrowserRouter>
          <NavLink exact to={'/home'} activeStyle={{ color: 'red' }}>Home|</NavLink>
          <NavLink exact to={'/home/about'} activeStyle={{ color: 'red' }}>About|</NavLink>
          <NavLink exact to={'/user'} activeStyle={{ color: 'red' }}>User|</NavLink>
          <NavLink exact to={'/discover'} activeStyle={{ color: 'red' }}>Discover</NavLink>

          <Switch>
            <Route exact path={'/home'} component={Home} />
            <Route exact path={'/home/about'} component={About} />
            <Route exact path={'/user'} component={User} />
            <Route exact path={'/login'} component={Login} />
            {/*
            注意点:如果要使用嵌套路由, 那么外层路由不能添加精准匹配exact
            /discover/toplist
            /discover
            */}
            <Route path={'/discover'} component={Discover} />
            <Route component={Other} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App

// Discover.js
import React from 'react'
import { Route, NavLink, Switch } from 'react-router-dom'

function Hot() {
    return (
        <div>推荐</div>
    )
}
function TopList() {
    return (
        <div>排行榜</div>
    )
}
function PlayList() {
    return (
        <div>歌单</div>
    )
}

class Discover extends React.PureComponent {
    render() {
        return (
            /*
            🔔注意点: 由于当前组件是在 BrowserRouter or HashRouter 中显示的
                      所以在当前组件中不用使用 BrowserRouter or HashRouter 来包裹NavLink/Switch/Route
            * */
            <div>
                <NavLink exact to={'/discover'} activeStyle={{ color: 'red' }}>推荐|</NavLink>
                <NavLink exact to={'/discover/toplist'} activeStyle={{ color: 'red' }}>排行榜|</NavLink>
                <NavLink exact to={'/discover/playlist'} activeStyle={{ color: 'red' }}>歌单</NavLink>

                <Switch>
                    <Route exact path={'/discover'} component={Hot} />
                    <Route exact path={'/discover/toplist'} component={TopList} />
                    <Route exact path={'/discover/playlist'} component={PlayList} />
                </Switch>
            </div>
        )
    }
}

export default Discover
```

### Router-手动路由跳转

1.手动路由跳转: 

不通过Link/NavLink来设置资源地址, 而是通过JS来设置资源地址

🔔如果 Hash 模式, 那么只需要通过JS设置 Hash 值即可

**window.location.hash = '/discover/playlist'**



🔔如果 history 模式，一个组件是通过路由创建出来的, 那么系统会自动传递一个history给我们

我们只需要拿到这个history对象, 调用这个对象的 push 方法, 通过 push 方法修改资源地址即可

**this.props.history.push('路径')**

```js
import React from 'react'
import './App.css'
import Home from './Components/Home'
import About from './Components/About'
import Other from './Components/Other'
import { BrowserRouter, HashRouter, Link, Route, NavLink, Switch } from 'react-router-dom'
import User from './Components/User'
import Login from './Components/Login'
import Discover from './Components/Discover'

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <BrowserRouter>
          <NavLink exact to={'/home'} activeStyle={{ color: 'red' }}>Home|</NavLink>
          <NavLink exact to={'/home/about'} activeStyle={{ color: 'red' }}>About|</NavLink>
          <NavLink exact to={'/user'} activeStyle={{ color: 'red' }}>User|</NavLink>
          <NavLink exact to={'/discover'} activeStyle={{ color: 'red' }}>广场</NavLink>

          <Switch>
            <Route exact path={'/home'} component={Home} />
            <Route exact path={'/home/about'} component={About} />
            <Route exact path={'/user'} component={User} />
            <Route exact path={'/login'} component={Login} />
            {/*
            注意点:如果要使用嵌套路由, 那么外层路由不能添加精准匹配exact
            /discover/toplist
            /discover
            */}
            <Route path={'/discover'} component={Discover} />
            <Route component={Other} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App

// Discover.js
import React from 'react'
import { Route, NavLink, Switch } from 'react-router-dom'

function Hot() {
    return (
        <div>推荐</div>
    )
}
function TopList() {
    return (
        <div>排行榜</div>
    )
}
function PlayList() {
    return (
        <div>歌单</div>
    )
}

class Discover extends React.PureComponent {
    render() {
        return (
            /*
            🔔注意点: 由于当前组件是在 BrowserRouter or HashRouter 中显示的
                      所以在当前组件中不用使用 BrowserRouter or HashRouter 来包裹NavLink/Switch/Route
            * */
            <div>
                <NavLink exact to={'/discover'} activeStyle={{ color: 'red' }}>推荐|</NavLink>
                <NavLink exact to={'/discover/toplist'} activeStyle={{ color: 'red' }}>排行榜|</NavLink>
                <NavLink exact to={'/discover/playlist'} activeStyle={{ color: 'red' }}>歌单</NavLink>
                <button onClick={()=>{this.btnClick()}}>歌单</button>

                <Switch>
                    <Route exact path={'/discover'} component={Hot} />
                    <Route exact path={'/discover/toplist'} component={TopList} />
                    <Route exact path={'/discover/playlist'} component={PlayList} />
                </Switch>
            </div>
        )
    }
    btnClick() {
        // 这是 Hash 模式的
        // window.location.hash = '/discover/playlist'
        
        // 这是 BrowserRouter 模式，组件由路由创建出来
        this.props.history.push('/discover/playlist')
    }
}

export default Discover
```

### 🔔Router-手动路由跳转注意点：

\- 只有通过路由创建出来的组件才有 history 对象, 所以不能在根组件中使用手动路由跳转

\- 如果想在根组件中使用手动路由跳转, 那么需要借助一个 **withRouter 高阶组件**

1.只有是 **HashRouter** 模式采用这个手动跳转

 **window.location.hash = '/discover'**



  2.**如果一个组件是通过路由创建的**, 那么系统就会自动给这个组件传递一个 **history** 对象

  **但是如果一个组件不是通过路由创建的**, 那么系统就不会给这个组件传递一个 **history** 对象

  **报错: Cannot read property 'push' of undefined**



  如果现在**非路由创建出来的组件中使用 history 对象**, 那么可以借助 **withRouter 高阶组件**

  **只要把一个组件传递给 withRouter 方法**, 那么这个方法就会**通过路由将传入的组件创建出来**



  **💥注意点: 如果一个组件要使用路由创建, 那么这个组件必须包裹在BrowserRouter, HashRouter中**

​       				**但是如果这个组件是在 index.js 中渲染的话就要 BrowserRouter 包裹起来然后这个组件内就不需要再用 BrowserRouter 包裹了**

代码例子:

```js
import React from 'react'
import './App.css'
import Home from './Components/Home'
import About from './Components/About'
import Other from './Components/Other'
import { BrowserRouter, HashRouter, Link, Route, NavLink, Switch, withRouter } from 'react-router-dom'
import User from './Components/User'
import Login from './Components/Login'
import Discover from './Components/Discover'

class App extends React.PureComponent {
  render() {
    return (
      <div>
          <NavLink exact to={'/home'} activeStyle={{ color: 'red' }}>Home|</NavLink>
          <NavLink exact to={'/home/about'} activeStyle={{ color: 'red' }}>About|</NavLink>
          <NavLink exact to={'/user'} activeStyle={{ color: 'red' }}>User|</NavLink>
          <NavLink to={'/discover'} activeStyle={{ color: 'red' }}>广场</NavLink>
          <button onClick={()=>{this.btnClick()}}>广场</button>

          <Switch>
            <Route exact path={'/home'} component={Home} />
            <Route exact path={'/home/about'} component={About} />
            <Route exact path={'/user'} component={User} />
            <Route exact path={'/login'} component={Login} />
            {/*
            注意点:如果要使用嵌套路由, 那么外层路由不能添加精准匹配exact
            /discover/toplist
            /discover
            */}
            <Route path={'/discover'} component={Discover} />
            <Route component={Other} />
          </Switch>
      </div>
    )
  }
  btnClick() {
    // 只有是 HashRouter 模式
    // window.location.hash = '/discover'
      
    this.props.history.push('/discover');
  }
}

export default withRouter(App)

// index.js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
    {/* React.StrictMode 开启严格模式 */}
    <React.StrictMode>
        <App />
        </React.StrictMode>
    </BrowserRouter>,
    // <App />,
    document.getElementById('root'))
```

### Router-URL参数 (第一种传参方式)

1.路由参数传递

\- URL参数

?key=value&key=value

https://reactrouter.com/web/api/Link

```js
// 在链接后 ? 拼接上参数
<NavLink exact to={'/home?name=zzj&age=23'} activeStyle={{ color: 'red' }}>Home|</NavLink>

// Home.js
import React from 'react'
import styled from 'styled-components';

const StyleDiv = styled.div`
    p{
        font-size:20px;
        color:red;
    }
`

class Home extends React.PureComponent{
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
        // console.log(this.props.location.search);
        // 用substring截取掉 ? 
        let query = this.props.location.search.substring(1)
        query = query.split('&')
        let obj = {}
        query.forEach(item => {
            obj[item.split('=')[0]] = item.split('=')[1]
        })
        console.log(obj); // {name:'zzj',age:23}
    }
    render() {
        return (
            <StyleDiv>
                <p>我是Home组件</p>
            </StyleDiv>
        )
    }
}

export default Home
```

### Router-动态路由传参（第二种传参方式）

\- 路由参数(动态路由)

/path/:key

\- 对象

https://reactrouter.com/web/api/Link

```js
// 步骤1
<NavLink exact to={'/about/react/666'} activeStyle={{ color: 'red' }}>About|</NavLink>
// 步骤2
<Route exact path={'/about/:name/:age'} component={About} />
    
// About.js 
// 利用 this.props.match.params 获取动态路由传进来的参数
import React from 'react'
import styled from 'styled-components';

const StyleDiv = styled.div`
    p{
        font-size:20px;
        color:blue;
    }
`

class About extends React.PureComponent{
    constructor(props) {
        super(props)
        // console.log(this.props.match);
        console.log(this.props.match.params);
    }
    render() {
        return (
            <StyleDiv>
                <p>我是About组件</p>
            </StyleDiv>
        )
    }
}

export default About
```

### Router-动态路由传参（第三种传参方式）

第三种传参: 

利用 to 可以传入对象的形式, 如果参数笔记多可以都放在 state 中

https://reactrouter.com/web/api/Link

```js
// App.js
let obj = {
  name: 'react',
  age: 666,
  gender:'man'
}
 <NavLink exact to={ { pathname: "/user", search: "", hash: "", state: obj }} activeStyle={{ color: 'red' } }>User|</NavLink>

// User.js
// 用 this.props.location.state 去接收参数
console.log(this.props.location.state);
```

### Router-集中式管理

1.路由统一管理(路由集中管理)

现在虽然我们能通过路由实现组件切换, 但是现在我们的路由都比较分散, 不利于我们管理和维护

所以React也考虑到了这个问题, 也给我们提供了统一管理路由的方案

https://www.npmjs.com/package/react-router-config

```js
// 1.🔔 npm install --save react-router-config
// router/index.js
import Home from '../Components/Home'
import About from '../Components/About'
import User from '../Components/User'
import Login from '../Components/Login'
import Discover from '../Components/Discover'
import Other from '../Components/Other'
import { Hot, TopList, PlayList } from '../Components/Discover'

const routers = [
    {
        path: '/home',
        exact: true, // 精准匹配
        component: Home
    },
    {
        path: '/about/:name/:age',
        exact: true,
        component: About
    },
    {
        path: '/user',
        exact: true,
        component: User
    },
    {
        path: '/login',
        exact: true,
        component: Login
    },
    {
        // 如果是嵌套路由不需要加精准匹配
        path: '/discover',
        component: Discover,
        routers: [
            {
                path: '/discover',
                exact: true,
                component: Hot
            },
            {
                path: '/discover/toplist',
                exact: true,
                component: TopList
            },
            {
                path: '/discover/playlist',
                exact: true,
                component: PlayList
            }
        ]
    },
    {
        component: Other
    }
]

export default routers

// App.js中
import { renderRoutes } from 'react-router-config'
import routers from './router/index'
 
//<Switch>
//	<Route path={'home'},component={Home}></Route>
//</Switch>
// 中的代码变成如下：
{ renderRoutes(routers) }

// Discover.js中
import { renderRoutes } from 'react-router-config'
//<Switch>
//	<Route path={'/discover/toplist'},component={Home}></Route>
//</Switch>
// 中的代码变成如下：
{ renderRoutes(this.props.route.routes) }
```

### 🔔动态配置路由 react-router-dom 的API

利用 react-router-dom 的 **useRouteMatch** 去动态获取上一级路径，可以配合 **react-router-cache-route** 去做缓存

```js
/*
react-router-cache-route 中解构出 CacheSwitch，它的效果跟 Switch 相似，当匹配到路径是就不会在往下匹配
*/
import React from "react";
import { Route, Redirect, useRouteMatch } from "react-router-dom";
import CacheRoute, { CacheSwitch } from "react-router-cache-route";  // CacheRoute 的作用是缓存当前路径下的组件
import OrderList from "./mainOrderList";
import SubList from "./subOrderList";
import Detail from "./detail";

export default function MobileService() {
  const { path } = useRouteMatch(); // path 动态获取上一级的路径

  return (
    <CacheSwitch>
      <Route
        exact
        path={`${path}`}
        render={() => <Redirect to={`${path}/mainOrderList`}></Redirect>}
      >
      </Route>
      <CacheRoute path={`${path}/mainOrderList`}>
        <OrderList />
      </CacheRoute>
      <Route path={`${path}/subOrderList`}>
        <SubList />
      </Route>
      <Route path={`${path}/detail`}>
        <Detail />
      </Route>
    </CacheSwitch>
  );
}

```

### 使用 useHistory 进行路由跳转

```js
/* 
当进行路由跳转的时候，常用的是使用 useHistory 
*/
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function HomeButton() {
  const [state, setState] = useState({ name: 'dzy', age: '20'});
  let history = useHistory();

  function handleClick() {
    history.push("/home");
  }
    
  // 可以携带数据
  function handlePush() {
      history.push("/about", state);
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}

/*
当通过 history 跳转并传递数据后，可以使用 useLocation 去获取传递的数据
type PoorMansUnknown = {} | null | undefined;
export type LocationState = PoorMansUnknown;
    
export interface Location<S = LocationState> {
    pathname: Pathname; string
    search: Search; string
    state: S;
    hash: Hash; string
    key?: LocationKey; string
}
*/

import { useLocation } from "react-router-dom";

const location: Location = useLocation<any>();

// lacation 有上面5个参数，用 state 来获取 history 传递过来的数据

const state = location.state;
```

### 获取地址 query 参数的简易封装

```js
// useQuery
import 'url-search-params-polyfill';
import { useLocation } from 'react-router-dom';

export default function useQuery() {
    return new URLSearchParams(useLocation().search);
}

// 使用格式：
const query = useQuery();
const content = query.get('content'); // get去获取路径上对应 key 的 value 值

// 还可以配合 query-string
import 'url-search-params-polyfill';
import { useLocation } from 'react-router-dom';
import qs from 'query-string'

// 获取路由参数
export default function useSearch() {
    const location = useLocation();
    return qs.parse(location.search);
}

// 使用格式
const query = useSearch();
console.log(query); // { a: 1, b: 2 };
```

### 获取动态参数 useParams 

```js
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";

// const { 动态参数的名称 } = useParams();

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/blog/:slug">
        <BlogPost />
      </Route>
    </Switch>
  </Router>
);

// 例如这里的动态参数是 slug

function BlogParams() {
    const { slug } = useParams();
    return (
        <>
        	<p>Now showing params{ slug }</p>
        </>
    )
}
```



## 29.React-Redux

**1.什么是Redux？**

Redux是一个管理状态（数据）的容器，提供了可预测的状态管理

**2.什么是可预测的状态管理？**

数据 在什么时候， 因为什么， 发生了什么改变，都是可以控制和追踪的， 我们就称之为预测的状态管理

**3.为什么要使用Redux？**

\- React是通过数据驱动界面更新的，React负责更新界面， 而我们负责管理数据

\- 默认情况下我们可以在每个组件中管理自己的状态， 但是现在前端应用程序已经变得越来越复杂

 状态之间可能存在依赖关系（父子、共享等），一个状态的变化会引起另一个状态的变化

\- 所以当应用程序复杂的时候， 状态在什么时候改变，因为什么改变，发生了什么改变，就会变得非常难以控制和追踪

\- 所以当应用程序复杂的时候，我们想很好的管理、维护、追踪、控制状态时， 我们就需要使用Redux

**4.Redux核心理念**

\- 通过store来保存数据

\- 通过action来修改数据

\- 通过reducer将store和action串联起来

官方文档： https://www.redux.org.cn/docs/introduction/CoreConcepts.html

```js
                    -------------
        --------->  | Component |  ---------
       |            -------------           |
       |                                    ↓
-------------       -------------       -------------
|   Store   | <---- |  Reducer  | <---- |  Action   |
-------------       -------------       -------------


const initialState = {
   heroes:[
     {name:'鲁班'， age:18},
     {name:'虞姬'， age:22},
   ]
}

const action = {type:'CHANGE_NAME', playload:{index:0, newName:'黄忠'}}
const action = {type:'CHANGE_AGE', playload:{index:1, newAge:66}}

function reducer(state = initialState, action){
    switch(action.type){
        case: 'CHANGE_NAME':
            // 修改姓名
            return newState;
        case: 'CHANGE_AGE':
             // 修改年龄
            return newState;
    }
}
```

### Redux的三大原则

官方文档： https://www.redux.org.cn/docs/introduction/ThreePrinciples.html

**1.Redux三大原则**

**\- 单一数据源**

  \+ 整个应用程序的state只存储在一个 store 中

  \+ Redux并没有强制让我们不能创建多个Store，但是那样做并不利于数据的维护

  \+ 单一的数据源可以让整个应用程序的state变得方便维护、追踪、修改

**\- State是只读的**

  \+ 唯一修改State的方法一定是触发action，不要试图在其他地方通过任何的方式来修改State

  \+ 这样就确保了View或网络请求都不能直接修改state，它们只能通过action来描述自己想要如何修改state；

  \+ 这样可以保证所有的修改都被集中化处理，并且按照严格的顺序来执行，所以不需要担心race condition（竟态）的问题；

**\- 使用纯函数来执行修改**

  \+ 通过reducer将 旧state和 action联系在一起，并且返回一个新的State：

  \+ 随着应用程序的复杂度增加，我们可以将reducer拆分成多个小的reducers，分别操作不同state tree的一部分

  \+ 但是所有的reducer都应该是纯函数，不能产生任何的副作用

**2.什么是纯函数？**

\- 返回结果只依赖于它的参数，并且在执行过程里面没有副作用

```js
// 纯函数
function sum(num1, num2){
    return num1 + num2;
}

// 非纯函数
let num1 = 10;
function sum(num2){
    return num1 + num2;
}

// 纯函数
const num1 = 10;
function sum(num2){
    return num1 + num2;
}
```

### Redux的基本使用

安装 **npm install --save redux**

```js
const redux = require('redux')

// 定义一个状态
let initialState = {
    count: 0
}

// 利用store来保存状态（state）
// store创建的时候接收的是 reducer
let stroe = redux.createStore(reducer)

// 利用action来修改状态
let addAction = { type: 'ADD_COUNT', num: 1 }
let subAction = { type: 'SUB_COUNT', num: 1 }

// 利用reducer将store和action串联起来
function reducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_COUNT':
            return { count: state.count + action.num }
        case 'SUB_COUNT':
            return { count: state.count - action.num }
        default:
            return state
    }
}

// 在组件中如何监听状态的改变？
stroe.subscribe(() => {
    console.log(stroe.getState());
})

// 在组件中如何从Store中获取存储的状态？
console.log(stroe.getState());

// 在组件中如何修改Store中存储的状态？
stroe.dispatch(addAction);
```

#### Redux-优化

💥当前代码存在的问题：

1.store、action、reducer代码都写在一个文件中， 不利于维护

2.action和reducer中都是使用字符串来指定和判断操作类型， 写错不报错

**解决: (定义常量, 将字符串赋值给常量, 然后用常量来代替字符串, 这样写错了会提示报错)**

3.action中的操作写死了， 不够灵活

**解决: (定义函数, 利用形参来决定参数的改变)**

```js
const redux = require('redux')
// 定义一个状态
let initialState = {
    count: 0
}

const ADD_COUNT = 'ADD_COUNT'
const SUB_COUNT = 'SUB_COUNT'

// 利用store来保存状态（state）
// store创建的时候接收的是 reducer
let stroe = redux.createStore(reducer)

// 利用action来修改状态
// let addAction = { type: ADD_COUNT, num: 1 }
// let subAction = { type: SUB_COUNT, num: 1 }

const addAction = (num) => {
    return { type: ADD_COUNT, num: num }
}
const subAction = (num) => {
    return { type: SUB_COUNT, num: num }
}

// 利用reducer将store和action串联起来
function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_COUNT:
            return { count: state.count + action.num }
        case SUB_COUNT:
            return { count: state.count - action.num }
        default:
            return state
    }
}

// 在组件中如何监听状态的改变？
stroe.subscribe(() => {
    console.log(stroe.getState(),'1111');
})

// 在组件中如何从Store中获取存储的状态？
console.log(stroe.getState());

// 在组件中如何修改Store中存储的状态？
stroe.dispatch(addAction(5));
```

#### Redux在React脚手架项目中的使用

**1.首先在 scr 目录下创建 store.js / reducer.js / constants.js / action.js**

```js
// store.js
import { createStore } from 'redux'
import reducer from './reducer'

let store = createStore(reducer);

export default store;
```

```js
// reducer.js
import { ADD_COUNT, SUB_COUNT } from "./constants";

const initialState = {
    count: 0
}

// 利用reducer将store和action串联起来
const reducer = (state = initialState, action){
    swite(action.type){
        case ADD_COUNT:
        return { count: state.count + action.num };
        case SUB_COUNT:
        return { count: state.count - action.num };
        default:
        return state;
    }
}

export default reducer;
```

```js
// constants.js
export const ADD_COUNT = 'ADD_COUNT'
export const SUB_COUNT = 'SUB_COUNT'
```

```js
// action.js
import { ADD_COUNT, SUB_COUNT } from "./constants";
// 利用action来修改状态

export const addAction = (num) => {
    return {type:ADD_COUNT,num:num}
}
export const subAction = (num) => {
    return {type:SUB_COUNT,num:num}
}
```

```js
// App.js
import React from 'react'
import store from './store/store';
import {addAction, subAction} from './store/action';

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      // 获取Stroe的值
      count:store.getState().count
    }
  }
  componentDidMount() {
    // 添加变化监听器, 监听Stroe中状态的改变
    store.subscribe(() => {
      this.setState({
        // 获取Stroe的值
        count:store.getState().count
      })
    })
  }
  componentWillUnmount() {
    // 卸载掉监听器
    store.unsubscribe()
  }
  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={()=>{this.btnClick()}}>按钮</button>
      </div>
    )
  }
  btnClick() {
    // 修改Store中存储的状态
    store.dispatch(addAction(5))
  }
}

export default App
```

### 🔔当前使用Redux存在的问题

**1.\- 冗余代码太多, 每次使用都需要在构造函数中获取，每次使用都需要监听和取消监听，操作store的代码过于分散**

**2.如何解决冗余代码太多问题?**

使用React-Redux

**3.什么是React-Redux**

React-Redux是Redux官方的绑定库,能够让我们在组件中更好的读取和操作Redux保存的状态

https://react-redux.js.org/introduction/quick-start

**安装Redux依赖包 npm install react-redux**

```js
// index.js
// 从react-redux中解构出 Provider 生产者，包裹着根组件并将Redux中的store传给后代组件中的 props 里
import { Provider } from 'react-redux'
import store from './store/store'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    // <App />,
    document.getElementById('root'))    
```

```js
// Home.js
import React from 'react'
import { addAction, subAction } from '../store/action';
import { connect } from 'react-redux';

class Home extends React.PureComponent {
    render() {
        return (
            <div>
                {/*通过props来使用redux中保存的数据*/}
                <p>{this.props.count}</p>
                <button onClick={() => { this.props.increment() }}>递增</button>
            </div>
        )
    }
}
// 在mapStateToProps方法中告诉React-Redux, 需要将store中保存的哪些数据映射到当前组件的props上
const mapStateToProps = (state) => {
    return {
        count: state.count
    }
};
// 在mapDispatchToProps方法中告诉React-Redux, 需要将哪些派发的任务映射到当前组件的props上
const mapDispatchToProps = (dispatch) => {
    return {
        increment() {
            dispatch(addAction(1))
        }
    }
}
// 利用react-redux中的 connect 建立 mapStateToProps、mapDispatchToProps 和 Home 组件的关系，
// 这样它就会将 mapStateToProps 中的 count 映射到 Home 组件的 props 上，
// 这样它就会将 mapDispatchToProps 中的 increment 方法映射到 Home 组件的 props 上
export default connect(mapStateToProps,mapDispatchToProps)(Home)

// 还可以使用装饰器的写法: 
// 装饰器只能用在类组件中，不能使用在函数组件中，因为存在函数提升
@connect(mapStateToprops, mapDispatchToProps)
class Home extends React.PureComponent {
    render() {
        return (
            <div>
                {/*通过props来使用redux中保存的数据*/}
                <p>{this.props.count}</p>
                <button onClick={() => { this.props.increment() }}>递增</button>
            </div>
        )
    }
}
export default Home;

// ❗️开启装饰器的写法需要执行 npm run eject 将 package.json 的 babel 修改如下：
"babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ]
    ]
  }
// 如果使用的是 vscode, 可以在项目根目录下添加 (js|ts)config.json 文件来消除代码警告
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}

// 消除eslint冲突
"eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ],
    "parserOptions": {
      "babelOptions": {
        "presets": [
          [
            "babel-preset-react-app",
            false
          ],
          [
            "babel-preset-react-app/prod"
          ]
        ]
      }
    }
  },
```

#### Redux-实现原理（connect）

```js
// connect.js
import React from "react"
import store from "../store/store"

const connect = (mapStateToProps, mapDispatchToProps) => {
    // 内部返回一个高阶函数
    return function higherOrderComponent(WrappedComponent) {
        class AdvComponent extends React.PureComponent{
            constructor(props) {
                super(props)
                this.state = {
                    storeState: {...mapStateToProps(store.getState())} // 获取到映射到当前组件上的 props 数据
                }
            }
            componentDidMount() {
                // 添加变化监听器, 监听Stroe中状态的改变
                store.subscribe(() => {
                    this.setState({
                        storeState: {...mapStateToProps(store.getState())}
                    })
                })
            }
            componentWillUnmount() {
                // 卸载监听器
                store.unsubscribe()
            }
            render() {
                // 将数据传到组件的 props 上
                return (<WrappedComponent {...this.props}
                                          {...mapStateToProps(store.getState())}
                                          {...mapDispatchToProps(store.dispatch)}/>)
            }
        }
        return AdvComponent
    }
}

export default connect
```

**还有一个种方案但是已经被 PureComponent 弃用的了（了解）**

```js
// connect/context.js
import React, { createContext } from "react";
const StoreContext = createContext({});
export default StoreContext;
```

```js
// index.js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
// import { Provider } from 'react-redux'
import StoreContext from './connect/context'
import store from './store/store'

ReactDOM.render(
    // StoreContext 自己的上下文
    <StoreContext.Provider value={store}>
    <BrowserRouter>
    {/* React.StrictMode 开启严格模式 */}
    <React.StrictMode>
        <App />
    </React.StrictMode>
    </BrowserRouter>
    </StoreContext.Provider>,
    // <Provider store={store}>
    // </Provider>,
    // <App />,
    document.getElementById('root'))
```

```js
// connect.js
import React from "react"
// import store from "../store/store"
import StoreContext from './context'

const connect = (mapStateToProps, mapDispatchToProps) => {
    // 内部返回一个高阶函数
    return function higherOrderComponent(WrappedComponent) {
        class AdvComponent extends React.PureComponent{
            // a.2 等于我们创建的上下文后会接收一个 context 参数,这个 context 就是生产者传进来的数据
            constructor(props,context) {
                super(props,context)
                this.state = {
                    storeState: {...mapStateToProps(this.context.getState())} // 获取到映射到当前组件上的 props 数据
                }
            }
            componentDidMount() {
                // 添加变化监听器, 监听Stroe中状态的改变
                this.context.subscribe(() => {
                    this.setState({
                        storeState: {...mapStateToProps(this.context.getState())}
                    })
                })
            }
            componentWillUnmount() {
                // 卸载监听器
                this.context.unsubscribe()
            }
            render() {
                // 将数据传到组件的 props 上
                return (<WrappedComponent {...this.props}
                                          {...mapStateToProps(this.context.getState())}
                                          {...mapDispatchToProps(this.context.dispatch)}/>)
            }
        }
        // a.1 让 AdvComponent 组件的 contextType 属性等于我们创建出来的上下文 StoreContext
        AdvComponent.contextType = StoreContext;
        return AdvComponent
    }
}

export default connect
```

#### Redux-处理网络数据

1.首先我用 Egg 搭建了一个简单的服务器去写一个简单的数据接口 http://127.0.0.1:7001/api/v1/info  返回的数据是 { name:'React!',age:666 }

2.接下来在 reducer.js 中新加一个 info 属性

```js
// reducer.js
import { ADD_COUNT, SUB_COUNT,CHANGE_INFO } from "./constants";

// 定义一个状态
let initialState = {
    count: 0,
    info:{}
}

// 利用reducer将store和action串联起来
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COUNT:
            return { ...state, count: state.count + action.num }
        case SUB_COUNT:
            return { ...state, count: state.count - action.num }
        case CHANGE_INFO:
            return { ...state, info: action.info }
        default:
            return state
    }
}

export default reducer

// constants.js
export const CHANGE_INFO = 'CHANGE_INFO'

// action.js
import { ADD_COUNT, SUB_COUNT,CHANGE_INFO } from "./constants";

export const changeAction = (info) => {
    return {type:CHANGE_INFO,info:info}
}
```

```js
// About.js
import React from 'react'
import { connect } from 'react-redux';
import { addAction, changeAction, subAction } from '../store/action';

class About extends React.PureComponent {
  componentDidMount() {
    // 处理网络请求 这里就不用axios了 因为还要下载配置比较麻烦，直接用fetch去做简单的处理
    fetch('http://127.0.0.1:7001/api/v1/info')
      .then((response) => {
        // 转成json格式返回
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        this.props.changeInfo(data)
      })
      .catch((error) => {
      console.log(error);
    })
  }
  render() {
    return (
      <div>
        <p>{this.props.count}</p>
        <button onClick={() => { this.props.increment() }}>递减</button>
        <p>{this.props.info.name}</p>
        <p>{this.props.info.age}</p>
      </div>
    )
  }
}
// 在mapStateToProps方法中告诉React-Redux, 需要将store中保存的哪些数据映射到当前组件的props上
const mapStateToProps = (store) => {
  return {
    count: store.count,
    info: store.info
  }
}
// 在mapDispatchToProps方法中告诉React-Redux, 需要将哪些派发的任务映射到当前组件的props上
const mapDispatchToProps = (dispatch) => {
  return {
    increment() {
      dispatch(subAction(1))
    },
    changeInfo(info) {
      dispatch(changeAction(info))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(About)
```

#### Redux-thunk中间件

**1.当前保存异步数据存在的问题**

异步数据既然要保存到Redux中, 所以获取异步数据也应该是Redux的一部分

所以获取异步数据的代码应该放到Redux中, 而不是放到组件生命周期方法中

**2.如何在Redux中获取网络数据?**

使用redux-thunk中间件

**3.redux-thunk作用?**

默认情况下dispatch只能接收一个对象,

使用redux-thunk可以让dispatch除了可以接收一个对象以外, 还可以接收一个函数

是的通过dispatch派发一个函数的时候能够去执行这个函数, 而不是执行reducer函数

**4.redux-thunk如何使用?**

\- 安装redux-thunk

**🔔npm install redux-thunk**

**\- 在创建store时应用redux-thunk中间件**

```js
// store.js
import { createStore,applyMiddleware } from 'redux'
import reducer from './reducer'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger';
// 创建store之前, 通过 applyMiddleware 方法, 告诉Redux需要应用哪些中间件
const storeEnhancer = applyMiddleware(logger,thunkMiddleware);
// 利用store来保存状态（state）
const store = createStore(reducer, storeEnhancer);

export default store;
```

\- 在action中获取网络数据

\- 在组件中派发action

官方文档地址: https://www.redux.org.cn/docs/advanced/AsyncActions.html

```js
import React from 'react'
import { connect } from 'react-redux';
import { addAction, changeAction, subAction,getUserInfo } from '../store/action';

class About extends React.PureComponent {
  componentDidMount() {
    this.props.changeInfo();
  }
  render() {
    return (
      <div>
        <p>{this.props.count}</p>
        <button onClick={() => { this.props.increment() }}>递减</button>
        <p>{this.props.info.name}</p>
        <p>{this.props.info.age}</p>
      </div>
    )
  }
}
// 在mapStateToProps方法中告诉React-Redux, 需要将store中保存的哪些数据映射到当前组件的props上
const mapStateToProps = (store) => {
  return {
    count: store.count,
    info: store.info
  }
}
// 在mapDispatchToProps方法中告诉React-Redux, 需要将哪些派发的任务映射到当前组件的props上
const mapDispatchToProps = (dispatch) => {
  return {
    increment() {
      dispatch(subAction(1))
    },
    changeInfo(info) {
      // 🔔注意点:  默认情况下 dispatch 方法只能接收一个对象
      //           如果想让 dispatch 方法除了可以接收一个对象以外, 还可以接收一个方法
      //           那么我们可以使用 redux-thunk中间件
      // redux-thunk中间件作用:
      // 可以让 dispatch 方法可以接收一个函数, 可以让我们在通过 dispatch 派发任务的时候去执行我们传入的方法
      // dispatch(changeAction(info))
      dispatch(getUserInfo)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(About)
```

```js
// action.js
export const changeAction = (info) => {
    return {type:CHANGE_INFO,info:info}
}
// 💥注意点: 只要这个函数是通过 redux-thunk 和 dispatch 执行的, 就会接收到两个参数 dispatch, getState
//           dispatch 用来派发任务, getState 拿到当前redux中存储的数据
export const getUserInfo = (dispatch,getState) => {
    // 处理网络请求
    fetch('http://127.0.0.1:7001/api/v1/info')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log('在action中获取到的网络数据',data);
          dispatch(changeAction(data));
      })
      .catch((error) => {
      console.log(error);
    })
}
```

```js
使用redux-thunk之前:
                 --------------------
        ------>  | Component 异步请求 |  -----
       |         --------------------       |
       |                                    ↓
-------------       -------------       -------------
|   Store   | <---- |  Reducer  | <---- |  Action   |
-------------       -------------       -------------

使用redux-thunk之后:
                    -------------
        --------->  | Component |  ---------------------------------
       |            -------------                                   |
       |                                                            ↓
-------------       -------------       -------------       -------------
|   Store   | <---- |  Reducer  | <---- |  异步请求   | <---- |  Action   |
-------------       -------------       -------------       -------------
```

#### Redux-thunk实现原理

原理是在 Reducer 执行之前去将官方的 dispatch 函数修改为我们自定义的 dispatch 函数，然后再调用的时候就是调用我们自定义的 dispatch 函数了

```js
const redux = require('redux')

// 定义一个状态
let initialState = {
    count: 0
}
const ADD_COUNT = 'ADD_COUNT'
const SUB_COUNT = 'SUB_COUNT'

// 利用store来保存状态（state）
// store创建的时候接收的是 reducer
const store = redux.createStore(reducer)

const addAction = (num) => {
    return { type: ADD_COUNT, num: num }
}
const subAction = (num) => {
    return { type: SUB_COUNT, num: num }
}
const getUserInfo = (dispatch, getState)=>{
    setTimeout(()=>{
        console.log('获取到了异步数据');
        dispatch(addAction(5));
    }, 3000);
};

// 利用reducer将store和action串联起来
function reducer(state = initialState, action) {
    console.log('reducer被执行了');
    switch (action.type) {
        case ADD_COUNT:
            return { count: state.count + action.num }
        case SUB_COUNT:
            return { count: state.count - action.num }
        default:
            return state
    }
}

/*
在redux-thunk中, 如果通过dispatch派发的任务是一个对象, 那么就立即执行reducer
                 如果通过dispatch派发的任务是一个函数, 那么久执行这个函数
* */
function thunkDispatch(store) {
    const storeDispatch = store.dispatch;
    const storeGetState = store.getState;

    function myDispatch(action) {
        if (typeof action === 'function') {
            action(storeDispatch,storeGetState)
        } else {
            storeDispatch(action)
        }
    }
    // 将官方的dispatch函数修改为我们自定义的dispatch函数
    store.dispatch = myDispatch
}
thunkDispatch(store);

// 调用的实际是我们自定义的dispatch函数
// store.dispatch(addAction(5))
store.dispatch(getUserInfo)
```

## 30.Hooks

### 1.useState

```js
import React from 'react';
/*
1.什么是Hook?
- Hook 是 React 16.8 的新增特性，
  它可以让函数式组件拥有类组件特性

2.为什么需要Hook?
- 在Hook出现之前, 如果我们想在组件中保存自己的状态,
  如果我们想在组件的某个生命周期中做一些事情, 那么我们必须使用类组件
    + 但是类组件的学习成本是比较高的, 你必须懂得ES6的class, 你必须懂得箭头函数
    + 但是在类组件的同一个生命周期方法中, 我们可能会编写很多不同的业务逻辑代码
      这样就导致了大量不同的业务逻辑代码混杂到一个方法中, 导致代码变得很难以维护
      (诸如: 在组件被挂载的生命周期中, 可能主要注册监听, 可能需要发送网络请求等)
    + 但是在类组件中共享数据是非常繁琐的, 需要借助Context或者Redux等
- 所以当应用程序变得复杂时, 类组件就会变得非常复杂, 非常难以维护
- 所以Hook就是为了解决以上问题而生的

3.如何使用Hook?
- Hook的使用我们无需额外安装任何第三方库, 因为它就是React的一部分
- Hook只能在函数组件中使用, 不能在类组件，或者函数组件之外的地方使用
- Hook只能在函数最外层调用, 不要在循环、条件判断或者子函数中调用

官方文档地址: https://react.docschina.org/docs/hooks-intro.html
* */
function Home() {
    // 只能在函数体的最外层使用
    // 只能在这个地方使用Hook
    // if(){
        // 不能使用Hook
    // }
    // while (){
        // 不能使用Hook
    // }
    // for(){
        // 不能使用Hook
    // }
    // switch () {
        // 不能使用Hook
    // }
    function demo() {
        // 不能使用Hook
    }
}
class App extends React.PureComponent{
    render(){
        return (
            <div>APP</div>
        )
    }
}
export default App;

```

```js
import React, {useState} from 'react';

function App() {
    /*
    useState注意点:
    和类组件中的setState一样
    
    参数：保证状态的初始值
    返回值：是一个数组，这个数组中有两个元素
    	  第一个元素：保存的状态
    	  第二个元素：修改保存状态的方法
    * */
    const [ageState, setAgeState] = useState(18);
    const [nameState, setNameState] = useState('dzy');
    const [studentState, setStudentState] = useState({ name: 'zs', age: 23 });
    const [heroState, setHeroState] = useState([
        {id: 1, name:'鲁班'},
        {id: 2, name:'虞姬'},
        {id: 3, name:'黄忠'},
    ]);

    function incrementAge() {
        // 参数是上一次的值
        setAgeState((preAgeState) => preAgeState + 10);
        setAgeState((preAgeState) => preAgeState + 10);
        setAgeState((preAgeState) => preAgeState + 10);
    }

    function changeName() {
        // studentState.name = 'it666'; 不能修改引用类型的值
        setStudentState({ ...studentState, name: 'it666' });
    }

    return (
        <div>
            <p>{ageState}</p>
            <button onClick={() => { incrementAge() }}>增加</button>
            <button onClick={() => { setAgeState(ageState - 1) }}>减少</button>
            <hr />
            <p>{nameState}</p>
            <button onClick={() => { setNameState('邓子茵') }}>修改</button>
            <hr />
            <p>{studentState.name}</p>
            <p>{studentState.age}</p>
            <button onClick={() => { changeName() }}>修改</button>
            <hr />
            <ul>
                {
                    heroState.map((hero) => {
                        return <li>{hero.name}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default App;
```

### 2.useEffect (更多的场景看官网例子)

```js
import React, { useState, useEffect } from "react";

/*
1.useEffect Hook对比类组件生命周期方法优势
易于拆分
2.可以把useEffect Hook看做
componentDidMount componentDidUpdate 和 componentWil'lUnmount
这三个生命周期函数的组合
* */
function Home() {
  const [nameState, setNameState] = useState("zzj");
  const [ageState, setAgeState] = useState(0);

    useEffect(() => {
    // 组件被挂载
    console.log("修改DOM");
  });

    useEffect(() => {
    // 💥注意点：默认情况下只要数据发生改变就会调用
    // 组件被挂载
    console.log("注册监听");
    return () => {
      console.log("移除监听");
    };
  });

  useEffect(() => {
    // 当nameState发生变化时, 才发送网络请求
    console.log("发送网络请求");
  }, [nameState]);

  return (
    <div>
      <p>{nameState}</p>
      <button
        onClick={() => {
          setNameState("dzy");
        }}
      >
        修改
      </button>
      <p>{ageState}</p>
      <button
        onClick={() => {
          setAgeState(ageState + 1);
        }}
      >
        增加
      </button>
      <button
        onClick={() => {
          setAgeState(ageState - 1);
        }}
      >
        减少
      </button>
      <hr />
    </div>
  );
}
function App() {
    const [isShowState, setIsShowState] = useState(true);

    return (
        <div>
            {isShowState && <Home />}
            <button onClick={() => {setIsShowState(!isShowState)}}>切换</button>
        </div>
    )
}

export default App;

```

### 3.useContext

```js
import React, { createContext, useContext } from "react";
/*
1.什么是useContext Hook?
useContext相当于 类组件中的 static contextType = Context
* */
const UserContext = createContext({});
const ColorContext = createContext({});
// const { Provider, Consumer } = UseContenxt;

function Home() {
  const user = useContext(UserContext);
  const color = useContext(ColorContext);
  return (
    // <Consumer>
    //   {(value) => {
    //     return (
    //       <div>
    //         <p>{value.name}</p>
    //         <p>{value.age}</p>
    //       </div>
    //     );
    //   }}
    // </Consumer>
    <div>
      <p>{user.name}</p>
      <p>{user.age}</p>
      <p>{color.color}</p>
    </div>
  );
}

// 类组件赋值
// Home.contextType = UseContenxt;

function App() {
  return (
    <UserContext.Provider value={{ name: "ZZJ&DZY", age: 22 }}>
      <ColorContext.Provider value={{ color: "red" }}>
        <Home />
      </ColorContext.Provider>
    </UserContext.Provider>
  );
}

export default App;

```

### 4.useReducer

```js
import React, { useReducer, useState } from "react";
/*
1.什么是useReducer Hook?
从名称来看, 很多人会误以为useReducer是用来替代Redux的, 但是其实不是
useReducer是useState的一种替代方案, 可以让我们很好的复用操作数据的逻辑代码
* */
function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return { ...state, num: state.num + 1 };
    case "SUB":
      return { ...state, num: state.num - 1 };
    default:
      return state;
  }
}

/*
useReducer接收的参数:
第一个参数: 处理数据的函数
第二个参数: 保存的默认值
useReducer返回值: 
会返回一个数组, 这个数组中有两个元素
第一个元素: 保存的数据
第二个元素: dispatch函数
* */

function Home({ empCode }) {
  // 💥注意点: 不同组件中的useState保存的状态是相互独立的, 是互相不影响的
  // const [numState, setNumState] = useState(0);

  const [state, dispatch] = useReducer(reducer, { num: 0 });

  return (
    <div>
      <p>{empCode}</p>
      <p>{state.num}</p>
      <button
        onClick={() => {
          dispatch({ type: "ADD" });
        }}
      >
        增加
      </button>
      <button
        onClick={() => {
          dispatch({ type: "SUB" });
        }}
      >
        减少
      </button>
      {/* <p>{numState}</p>
            <button onClick={() => {setNumState(numState + 1)}}>增加</button>
            <button onClick={() => {setNumState(numState - 1)}}>减少</button> */}
    </div>
  );
}

function About({ empCode }) {
  const [state, dispatch] = useReducer(reducer, { num: 5 });

  return (
    <div>
      <p>{empCode}</p>
      <p>{state.num}</p>
      <button
        onClick={() => {
          dispatch({ type: "ADD" });
        }}
      >
        增加
      </button>
      <button
        onClick={() => {
          dispatch({ type: "SUB" });
        }}
      >
        减少
      </button>
      {/* <p>{numState}</p>
            <button onClick={() => {setNumState(numState + 1)}}>增加</button>
            <button onClick={() => {setNumState(numState - 1)}}>减少</button> */}
    </div>
  );
}

function App() {
  return (
    <>
      <Home empCode={"这是Home的empCode"} />
      <hr />
      <About empCode={"这是About的empCode"} />
    </>
  );
}

export default App;

```

### 5.useCallback

```js
import React, { useState, memo, useCallback } from "react";
/*
1.什么是useCallback Hook?
useCallback用于优化代码, 可以让对应的函数只有在依赖发生变化时才重新定义
* */

/*
当前Home和About重新渲染的原因是因为: 
当子组件调用父组件传递过来的方法改变了父组件的数据时, 父组件会重新渲染,
重新渲染父组件, 就会重新执行父组件函数
重新执行父组件函数, 就会重新定义incereate/decereate
既然incereate/decereate是重新定义的, 所以就和上一次的不是同一个函数了
既然不是同一个函数, 所以Home和About接收到的内容也和上一次的不一样了
既然接收的内容和上一次不一样了, 所以就会重新渲染
* */
function Home({ handler }) {
    console.log('Home执行');
    return (
        <div>
            <p>Home</p>
            <button onClick={() => {handler()}}>增加</button>
        </div>
    )
}

function About({ handler }) {
    console.log('About执行');
    return (
        <div>
            <p>About</p>
            <button onClick={() => {handler()}}>减少</button>
        </div>
    )
}

// memo能优化渲染的性能问题,父组件中重新执行，子组件中数据没发生改变就不会重新执行
const MemoHome = memo(Home);
const MemoAbout = memo(About);

function App() {
    console.log('App执行');
    const [numState, setNumState] = useState(0);
    const [countState, setCountState] = useState(0);

  function incereate() {
    setNumState(numState + 1);
  }
  //  function decereate() {
  //    setCountState(countState - 1);
  //  }
    
    // 只要依赖的数据countState不发生变化, useCallback返回的都是同一个函数
    const decereate = useCallback(() => {
        setCountState(countState - 1);
    },[countState])

  return (
      <div>
          <p>numState = {numState}</p>
          <p>countState = {countState}</p>
          {/* <button onClick={()=>{incereate()}}>增加</button>
          <button onClick={() => { decereate() }}>减少</button> */}
          {/* <Home />
          <About /> */}
          <MemoHome handler={incereate} />
          <MemoAbout handler={decereate} />
      </div>
  );
}

export default App;

```

### 6.useMemo

useCallback与useMemo的关系

```js
import React, { useState, memo, useCallback, useMemo } from "react";
/*
1.什么是useMemo Hook?
useMemo用于优化代码, 可以让对应的函数只有在依赖发生变化时才返回新的值
* */
function Home({ handler }) {
    console.log('Home执行');
    return (
        <div>
            <p>Home</p>
            <button onClick={() => {handler()}}>增加</button>
        </div>
    )
}

function About({ handler }) {
    console.log('About执行');
    return (
        <div>
            <p>About</p>
            <button onClick={() => {handler()}}>减少</button>
        </div>
    )
}

// memo能优化渲染的性能问题,父组件中重新执行，子组件中数据没发生改变就不会重新执行
const MemoHome = memo(Home);
const MemoAbout = memo(About);

function App() {
    console.log('App执行');
    const [numState, setNumState] = useState(0);
    const [countState, setCountState] = useState(0);

  function incereate() {
    setNumState(numState + 1);
  }
    
    // 只要依赖的数据countState不发生变化, useCallback返回的都是同一个函数
    /*
    useCallback的底层是用useMemo来实现
    function useCallback(fn, arr) {
        return useMemo(() => {
            return fn;
        }, arr);
    }
    * */
    
    // const decereate = useCallback(() => {
    //     setCountState(countState - 1);
    // },[countState])

    // 以下代码的作用: 只要countState没有发生变化, 那么useMemo返回的永远都是同一个值
    const decereate = useMemo(() => {
        return () => {
            setCountState(countState - 1);
        }
    }, [countState]);

  return (
      <div>
          <p>numState = {numState}</p>
          <p>countState = {countState}</p>
          {/* <button onClick={()=>{incereate()}}>增加</button>
          <button onClick={() => { decereate() }}>减少</button> */}
          {/* <Home />
          <About /> */}
          <MemoHome handler={incereate} />
          <MemoAbout handler={decereate} />
      </div>
  );
}

export default App;

```

useCallback与useMemo的区别：

**1.useCallback返回的永远是一个函数**

**2.useMemo返回的是return返回的内容**

```js
import React, { useState, memo, useMemo } from "react";
/*
1.什么是useMemo Hook?
useMemo用于优化代码, 可以让对应的函数只有在依赖发生变化时才返回新的值
* */
/*
useCallback和useMemo区别: 
useCallback返回的永远是一个函数
useMemo返回的是return返回的内容
 */
function Home({ handler }) {
    console.log('Home执行');
    return (
        <div>
            <p>Home</p>
            <button onClick={() => {handler()}}>增加</button>
        </div>
    )
}

function About({ user }) {
    console.log('About执行');
    return (
        <div>
            <p>About</p>
            <p>{user.name}</p>
            <p>{user.job}</p>
        </div>
    )
}

// memo能优化渲染的性能问题,父组件中重新执行，子组件中数据没发生改变就不会重新执行
const MemoHome = memo(Home);
const MemoAbout = memo(About);

function App() {
    console.log('App执行');
    const [numState, setNumState] = useState(0);
    const [countState, setCountState] = useState(0);

  function incereate() {
    setNumState(numState + 1);
  }

    // 以下代码的作用: 只要countState没有发生变化, 那么useMemo返回的永远都是同一个值
    // const decereate = useMemo(() => {
    //     return () => {
    //         setCountState(countState - 1);
    //     }
    // }, [countState]);

    const user = useMemo(() => {
        return {name: '诸葛-时雨天司', job: '法师'}
    }, [])

  return (
      <div>
          <p>numState = {numState}</p>
          {/* <p>countState = {countState}</p> */}
          {/* <button onClick={()=>{incereate()}}>增加</button>
          <button onClick={() => { decereate() }}>减少</button> */}
          {/* <Home />
          <About /> */}
          <MemoHome handler={incereate} />
          <MemoAbout user={user} />
      </div>
  );
}

export default App;

```

useMemo的性能优化：

```js
import React, { useState, memo, useMemo } from "react";

// 定义一个函数, 模拟耗时耗性能操作
function calculate() {
    console.log('calculate被执行');
    let total = 0;
    for (let i = 0; i < 999; i++) {
        total += i;
    }
    return total;
}

function App() { 
    console.log('APP执行');
    const [numState, setNumState] = useState(0);
    /*
    如果直接将函数返回值赋给total, 在App组件中如果数据变化了重新执行App函数,
    重新执行里面的所以内容, calculate函数也会重新执行, 而calculate函数是一个比较耗性能的函数,
    每次都执行一遍不是好的结果, 所以可以使用useMemo来优化一下 使得其只会执行一次
    const total = calculate();
    * */
    const total = useMemo(() => {
        return calculate();
    }, [])
    return (
        <div>
            <p>{numState}</p>
            <p>{total}</p>
            <button onClick={() => {setNumState(numState + 1)}}>增加</button>
        </div>
    )
}

export default App
```

### 7.useRef

createRef和useRef区别:

 🧐**useRef除了可以用来获取元素以外, 还可以用来保存数据**  useRef(0)

useState和useRef区别:

 **🧐useRef中保存的数据, 除非手动修改, 否则永远都不会发生变化**

```js
import React, { createRef, useState, useEffect, useRef } from "react";

class Home extends React.PureComponent {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>Home</div>
        )
    }
}

function About() {
    return (
        <div>
            <p>About标签</p>
        </div>
    )
}

function App() {
    /*
    createRef和useRef区别:
    useRef除了可以用来获取元素以外, 还可以用来保存数据
    /*
    useState和useRef区别:
    useRef中保存的数据, 除非手动修改, 否则永远都不会发生变化
    * */
    const [numState, setNumState] = useState(0);

    // const age = useRef(18); // {current: 18}
    const age = useRef(numState); // {current: 0}

    useEffect(() => {
        age.current = numState;
    }, [numState]);

    // const pRef = createRef();
    // const HomeRef = useRef();

    // function btnClick() {
    //     console.log(pRef, 'pRef'); // {current: p}
    //     console.log(HomeRef, 'HomeRef'); // {current: Home}
    // }

    return (
        <>
            {/* <p ref={pRef}>我是段落</p>
            <Home ref={HomeRef}/>
            <About /> */}
            <p>上一次的值: {age.current}</p>
            <p>当前的值: {numState}</p>
            <button onClick={() => {setNumState(numState + 1)}}>增加</button>
        </>
    )
}

export default App
```

### 8.useImperativeHandle（权限控制）

作用：父组件通过 **ref** 获取子组件的某一个元素的时候能够做一些什么操作，由 **useImperativeHandle** 返回的对象决定

```js
import React, { forwardRef, useImperativeHandle, useRef } from "react";

function Home(props, appRef) {
    const inputRef = useRef();
    useImperativeHandle(appRef, () => {
        return {
            myFocus() {
                console.log('myFocus执行');
                inputRef.current.focus();
                inputRef.current.style = `outline: none; color: ${props.color}`;
            },
            inputValue() {
                // inputRef.current.value = 'www.dzyit666.com';
                inputRef.current.value = `${props.color}  www.dzyit666.com`;
            }
        }
    })
    return (
        <div>
            <p>Home</p>
            {/* <input ref={appRef} type="text" placeholder="请输入"/> */}
            <input ref={inputRef} type="text" placeholder="请输入"/>
        </div>
    )
}

// 高阶函数 forwardRef 转发
const ForwardHome = forwardRef(Home);

function App() { 
    const homeRef = useRef();
    function btnClick() {
        console.log(homeRef);
        console.log(homeRef.current);
        // homeRef.current.focus(); // 激活
        // homeRef.current.style = 'outline:none' // 取消激活边框高亮 
        // homeRef.current.value = 'www.baidu.com' // 赋值
        
        // useImperativeHandle 返回的对象中通过 current 去执行
        homeRef.current.myFocus();
        homeRef.current.inputValue();
    }
    return (
        <div>
            <ForwardHome ref={homeRef} color={'#ccc'}/>
            <button onClick={() => {btnClick()}}>获取</button>
        </div>
    )
}

export default App
```
