最近看vexip ui的源码
记录一些操作
## 引用vue文件的内容
```json
const content = await import(`./xxx.vue?raw`).default
```
不加raw，default是个对象，里面有个render函数
## 主题色更改方案
### 使用变量
```json
const rootEl = document.documentElement
const rootStyle = getComputedStyle(rootEl)
const majorColor = ref(rootStyle.getPropertyValue('--vxp-color-primary-base'))

```
### 维护变量
```json
$namespace: 'vxp' !default;

// 生成--vxp-color-primary-base
@function to-css-var-name($name-units...) {
  $name: '--' + $namespace;

  @each $unit in $name-units {
    @if $unit != '' {
      $name: $name + '-' + $unit;
    }
  }

  @return $name;
}

@function get-css-var($name-units...) {
  @return var(#{to-css-var-name($name-units...)});
}

@mixin define-css-var($name-units, $value) {
  #{to-css-var-name($name-units...)}: #{$value};
}

// 使用
get-css-var('color-primary-base')

@include define-css-var('border-width', $border-width);


```
### 修改变量
利用dom操作
```json
const rootEl = document.documentElement
const rootStyle = getComputedStyle(rootEl)
const style = rootEl.style

style.setProperty('--vxp-color-primary-base', `${value}`)
```

## 动画结束事件
```javascript
setup(){
  return () => h('button',{onAnimationend: callback},['我是按钮'])
}
```

## markdown解决方案
vite环境使用vite-plugin-md，把md转成vue，再通过AsyncComponent+compoennt组件实现渲染
vite-plugin-md是基于markdown-it开发的plugin

```javascript
examples.value = demos.map(demo => {
  return {
    demo: markRaw(defineAsyncComponent(() => import(`../demos/${name}/${demo}/demo.${language}.vue`))),
    desc: markRaw(defineAsyncComponent(() => import(`../demos/${name}/${demo}/desc.${language}.md`))),
    code: '',
    github: `demos/${name}/${demo}/demo.${language}.vue`
  }
})

demos.forEach(async (demo, index) => {
  examples.value[index].code = (await import(`../demos/${name}/${demo}/demo.${language}.vue?raw`)).default
  })
```
vue-cli环境（webpack）下没有类似的插件
单独使用markdown-it 加高亮插件貌似实现效果也不好
markdown-it是负责输出字符串的，通过innerHtml方式插入到页面显示
样式之类的还没研究明白

## prettier格式化代码
prettier适用与执行node环境
不使用开发的环境，即vite webpack
比如下面这段代码，运行时是会报错找不到vue解析器的
```javascript
import { format } from 'prettier'

const vue = `
      <template><div>11111</div></template>
      <script lang="ts">
        import { defineComponent, markRaw } from 'vue'
        export default defineComponent(markRaw({ name: 'Name' }))
      </script>
    `

console.log(format(vue, { parser: 'vue', semi: false, singleQuote: true }))
```
假如是通过node ts-node命令执行ts文件，则是可以的
ts-node scripts/build.ts


## bem--className命名规范
el-namespace-block-blockSuffix__element--modifier
el-card
```javascript
const _bem = (
  namespace: string,
  block: string,
  blockSuffix: string,
  element: string,
  modifier: string
) => {
  let cls = `${namespace}-${block}`
  if (blockSuffix) {
    cls += `-${blockSuffix}`
  }
  if (element) {
    cls += `__${element}`
  }
  if (modifier) {
    cls += `--${modifier}`
  }
  return cls
}

```


