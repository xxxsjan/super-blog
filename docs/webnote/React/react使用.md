# react使用

### vite创建

```tsx
# npm 6.x
npm init vite@latest my-vue-app --template vue

# npm 7+, 需要额外的双横线：
npm init vite@latest my-vue-app -- --template vue

# yarn
yarn create vite my-vue-app --template vue
相当于 yarn global add vite

# pnpm
pnpm create vite my-vue-app -- --template vue
```

### 响应式布局

#### rem clientWidth/3.75

```tsx
// /modules/rem.js
// ===================1
document.documentElement.style.fontSize = 
  document.documentElement.clientWidth /3.75 +'px';

// 横竖屏切换
window.onresize = function() {
  document.documentElement.style.fontSize = 
    document.documentElement.clientWidth /3.75 +'px'
}
// ============2
var init = function () {
  var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
  if (clientWidth >= 640) {
    clientWidth = 640;
  }
  var fontSize = 16 / 375 * clientWidth;
  document.documentElement.style.fontSize = fontSize + "px";
}

init();

window.addEventListener("resize", init);

// main.js引入
import "./modules/rem"; // 自适应
```

#### sass函数生成vw单位

vite 只需要安装sass

webpack需要安装 sass sass-loader

```css
@function vw($px) {
  @return ($px / 375) * 100vw;
}

.box {
  width: 100vw;
  height: 100vh;
  background-color: #bfa;
  font-size: vw(10);
}
// 两种引入方式
// 方式一
import styles from "./App.scss";
<div className={styles.box}>
  <div>233</div>
</div>
// 方式二
import "./App.scss";
<div className="box">
  <div>233</div>
</div>
```

### 路由配置

```tsx
// App.tsx
function App() {
  return (
    <div className="App">
      <Header />
      <Suspense fallback={<div>loading...</div>}>
        <RoutesConfig />
      </Suspense>
      <Footer />
    </div>
  );
}
// routes.tsx
export default function RoutesConfig() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/order" element={<Order />}>
          <Route path="/order/ing" element={<Conduct />}/>
          <Route path="/order/history" element={<History />}/>
          <Route path="/order/back" element={<Back />}/>
        </Route>
        <Route path="/food" element={<Food />}>
          <Route path="/food/nearby" element={<Nearby />} />
          <Route path="/food/often" element={<Often />} />
        </Route>
        <Route path="/mine" element={<Mine />} />
        <Route path="/orderdetail/:id" element={<OrderDetail />}/>
      </Routes>
    </>
  );
}
```

## 组建通信

<https://www.jb51.net/article/226671.htm>

### props通信

#### 传递

子组件里this.props可以拿到父组件传过来的值

#### 改值

react是通过props传一个回调，子组件调用进行修改

```javascript
class Parent {
  cahngeMsg(msg){
    console.log(msg)
  }
  render(){
    return (<Child callback={this.changeMsg}></Child>)
  }
}

// Child
this.props.callback('传递一些值')
```

### context共享状态

MyContext.js

```javascript
import React from "react";
const MyContext = React.createContext({text:'luck'});
export default MyContext
```

某个根组件

使用MyContext.Provider包一层

```javascript
import MyContext from './context';
<MyContext.Provider value={{text:'good luck'}}>
<Children></Children>
</MyContext.Provider>
```

后代组件

```javascript
import React from 'react';
import MyContext from './context';
// 获取数据
this.context.text
```
