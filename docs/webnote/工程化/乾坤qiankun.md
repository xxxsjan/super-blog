### 基座base

main.js

```javascript
import { registerMicroApps, start } from 'qiankun';

import actions from './store';

const apps = [
  {
    name: 'vueApp',
    entry: '//localhost:8081',
    container: '#vue',
    activeRule: '/vue',
    props: {
      a: 1,
      getGlobalState: actions.getGlobalState, // 下发getGlobalState方法
      // setGlobalState: actions.setGlobalState,
      onGlobalStateChange: actions.onGlobalStateChange,
    },
  },
  {
    name: 'reactApp',
    entry: '//localhost:8082',
    container: '#react',
    activeRule: '/react',
    props: {
      b: 1,
    },
  },
];
registerMicroApps(apps, {
  beforeLoad: (app) => {
    console.log('before load app.name====>>>>>', app.name);
  },
  beforeMount: [
    (app) => {
      console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
    },
  ],
  afterMount: [
    (app) => {
      console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name);
    },
  ],
  afterUnmount: [
    (app) => {
      console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
    },
  ],
});
start();

new Vue({
  router,
  render: function (h) {
    return h(App);
  },
}).$mount('#app');

```

store.js

```javascript
// main/src/store.js
import { initGlobalState } from "qiankun";
// import Vue from "vue";

//父应用的初始state
// Vue.observable是为了让state 变成可响应：https://cn.vuejs.org/v2/api/#Vue-observable。
// let state = Vue.observable({
//   user: {
//     name: "tom",
//   },
// });
const state = {};

const actions = initGlobalState(state);

actions.onGlobalStateChange((newState, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log("main change", JSON.stringify(newState), JSON.stringify(prev));
  for (let key in newState) {
    state[key] = newState[key];
  }
});

// 定义一个获取state的方法下发到子应用
actions.getGlobalState = (key) => {
  // 有key，表示取globalState下的某个子级对象
  // 无key，表示取全部
  return key ? state[key] : state;
};

export default actions;

```

### 应用1 vue

bootstrap
mount
unmount

```javascript
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

let instance = null;

function render(props = {}) {
  console.log("vue-props", props);

  props.onGlobalStateChange((newState, prev) => {
    console.log("vue change", JSON.stringify(newState), JSON.stringify(prev));
  });

  // setTimeout(() => {
  //   props.setGlobalState({ globalToken: "vue-token" });
  // }, 1000);

  instance = new Vue({
    router,
    render: function (h) {
      return h(App);
    },
  }).$mount("#app");
}

if (window.__POWERED_BY_QIANKUN__) {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-undef
    __webpack_public_path__ = `//localhost:${process.env.VUE_APP_PORT}/`;
  }
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap(props) {
  console.log("[vue] vue app bootstraped");
}

export async function mount(props) {
  console.log(
    "%c vueApp-mount",
    "background-color:pink",
    props
    // props.getGlobalState()
  );
  props.setGlobalState({ a: "jay" });
  console.log("%c props.a", "background-color:pink", props.a);
  render(props);
}

export async function unmount(props) {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
}

```

### 应用2 react

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

let root = ReactDOM.createRoot(document.getElementById("root"));

function render() {
  root = root || ReactDOM.createRoot(document.getElementById("root"));
  // <React.StrictMode>
  // <App />
  // </React.StrictMode>
  root.render(<App />);
  // ReactDOM.render(<App />, document.getElementById("root"));
}

if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}


export async function bootstrap(props) {}
export async function mount(props) {
  render();
}
export async function unmount(props) {
  // https://reactjs.org/docs/react-dom.html#unmountcomponentatnode
  // ReactDOM.unmountComponentAtNode(document.getElementById("root")); // 18以前
  root.unmount(document.getElementById("root"));
  root = null;
}

```
