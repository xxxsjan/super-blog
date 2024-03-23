cb-ui里的一个例子
主要是是解析vue文件为js
这部分vue比常规vue多了自定义的一些标签

```javascript
// demo.vue
<webdoc>
  <title>主题控制</title>
</webdoc>
<template>
  <m-card>
    <cb-button type="primary">默认主题</cb-button>
    <cb-button type="gray">灰色主题</cb-button>
    <cb-button type="info">信息按钮</cb-button>
    <cb-button type="danger">危险按钮</cb-button>
    <cb-button type="warning">警告按钮</cb-button>
    <cb-button type="link">链接按钮</cb-button>
  </m-card>
</template>
// 输出变成
export default function (Component) {
Component.__sourceCode = ${JSON.stringify(`<template>
  <m-card>
    <cb-button type="primary">默认主题</cb-button>
    <cb-button type="gray">灰色主题</cb-button>
    <cb-button type="info">信息按钮</cb-button>
    <cb-button type="danger">危险按钮</cb-button>
    <cb-button type="warning">警告按钮</cb-button>
    <cb-button type="link">链接按钮</cb-button>
  </m-card>
</template>`)}
Component.__sourceTitle = ${JSON.stringify('主题控制')}
Component.__sourceRemark = ${JSON.stringify(remark)}
}


```
```javascript
import { baseParse } from "@vue/compiler-core"
import fs from "fs"
const vitePluginVue = {
  name: "webdoc",
  transform(code, id) {
    if (!/\/src\/components\/(.*)\/demo\/.*\.demo\.vue/.test(id) || !/vue&type=webdoc/.test(id)) {
      return
    }
    const path = `.${id.match(/\/src\/components\/(.*)\/demo\/.*\.demo\.vue/)[0]}`

    const file = fs.readFileSync(path).toString()

    const parsed = baseParse(file).children.find(n => n.tag === "webdoc")
    const titleObj = parsed.children.find(item => {
      return item.tag === "title"
    })

    const remarkObj = parsed.children.find(item => {
      return item.tag === "remark"
    })

    const title = titleObj ? titleObj.loc.source.replace("<title>", "").replace("</title>", "") : ""
    const remark = remarkObj ? remarkObj.loc.source.replace("<remark>", "").replace("</remark>", "") : ""

    const main = file
      .split(parsed.loc.source)
      .join("")
      .trim()

    return `export default function (Component) {
      Component.__sourceCode = ${JSON.stringify(main)}
      Component.__sourceTitle = ${JSON.stringify(title)}
      Component.__sourceRemark = ${JSON.stringify(remark)}
    }`.trim()
  }
}
export default vitePluginVue

```

### vite-plugin结构
是一个对象
```javascript
const vitePluginVue = {
  name: "webdoc",
  transform(code, id) {
    // to do
    // 最后输出js
    return `export default xxxx`
  }
}
```
