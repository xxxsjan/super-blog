
# react

## 安装babel插件

```jsx
cnpm i babel-core babel-loader babel-plugin-transform-runtime -D
cnpm i babel-preset-env babel-preset-stage-0 -D
//识别转化jsx语法的包
cnpm i babel-preset-react -D
//配置webpack.config.js
module exports = {
  ...
  module：{//第三方模块
    rules:[//第三方匹配规则
    {test：/\.js|jsx$/,use:'babel-loader',exclude:/node_modules/}
    ]
  }
}
// 添加.babelrc配文件
{
"presets":["env","stage-0","react"],
"plugins":["transform-runtime"]
}
```

## Echart不更新

props和state最好别联系在一起，state的更新麻烦，

因为`componentDidMount`方法只会执行一次，

render时state不会更新，setState刷新的关键：

1. setState不会立刻改变React组件中state的值

2. setState通过引发一次组件的更新过程来引发重新绘制

3. 多次setState函数调用产生的效果会合并。

## 生命周期

***componentWillMount*****()** – 在渲染之前执行，在客户端和服务器端都会执行。

***componentDidMount*****()** – 仅在第一次渲染后在客户端执行。

***componentWillReceiveProps*****()** – 当从父类接收到 props 并且在调用另一个渲染器之前调用。

***shouldComponentUpdate*****()** – 根据特定条件返回 true 或 false。如果你希望更新组件，请返回**true** 否则返回 **false**。默认情况下，它返回 false。

***componentWillUpdate*****()** – 在 DOM 中进行渲染之前调用。

***componentDidUpdate*****()** – 在渲染发生后立即调用。

***componentWillUnmount*****()** – 从 DOM 卸载组件后调用。用于清理内存空间。

###

### 单向绑定 defaultValue

```
this.state = {}
<input defaultValue={this.state.msg}></input>
```

## pureComponent

官方的pureComponent，做了浅比较的优化

## 异步组件

## @loadable/component

```jsx
import type { DefaultComponent } from '@loadable/component';
import { lazy } from '@loadable/component';
import React, { Suspense } from 'react';
import FullLoading from '../FullLoading';

export const SuspenseLoading = () => {
  return <FullLoading />;
};

export type DynamicImportProps = {
  loadFn: <Props>(props: Props) => Promise<DefaultComponent<Props>>;
};
const DynamicImport = (props: DynamicImportProps) => {
  const Component = lazy(props.loadFn);
  return (
    <Suspense fallback={<SuspenseLoading />}>
      <Component />
    </Suspense>
  );
};

export default React.memo(DynamicImport);
```

```jsx
import { lazy } from '@loadable/component';

const MeetingRoomDetailRoutes = lazy(
  () => import(/* webpackChunkName: "MeetingRoomDetail" */ '@/pages/meeting-room-detail')
);
```

## lazy

```jsx
import React, { lazy, Suspense } from 'react';

const MyComponent = lazy(() => import('./MyComponent'));

const App = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <MyComponent />
      </Suspense>
    </div>
  );
};
```

## fiber

指向

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/128311b7121f4d4f919d49b326b0271b~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)
