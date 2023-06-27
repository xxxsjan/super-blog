# js语法提示

### 函数参数提示

```javascript
/**
 * @description: 处理num标识+-.策略
 * @param {number} val
 * @param { [string] | string} symbol 传数组注意'-' '+'优于 '.'
 * @example '['+','.']'
 * @return {number}
 */
/**
 * @description: 限制输入最大最小值
 * @param {number} val 
 * @param {?number} min 
 * @param {number} max 
 * @return {number} val
 */
/**
 * @description: 封装上下文，只对外提供一个接口
 * @param {string} type
 * @param {[]} ...params
 * @return { undefined | Function}
 */
/**
 * @description: 解析plains为发布页面渲染的renderplains
 * @param {{}} plain 
 * @param {number} mode 某些任务选中加搜索时，弹框表单增加keyWords 
 * mode为-1 针对其他类型 mode 0 1 针对访客 1 >1 针对淘气
 * @param {[number]} twoAlgorithmNums 两种分配算法，当所选的分配方式不在里面，就删除递增量
 * @param {[number]} customArrayNums 
 * @param {{stringNumber: string}} carryOutModeLabel 用于分配方式类型转义文本
 * @param {boolean} carryOutModeNeedHour 用于控制date和time显示，只会取一个
 * @param {{stringNumber: number}} ratioObj 
  @return {{indexSymbol: Date,plainId: number | string, 
  '...typeTableTotal': {}, '...form': {} , assignsDaysObj: {}}}  {
    indexSymbol,
    plainId,
    ...typeTableTotal,
    ...form,
    assignsDaysObj
  }
 */
```

### 对象类型提示

```javascript
/** @type import("vite").UserConfig **/
const config = {
  //...
}
/** @type import("webpack").Configuration  **/
const config = {
  
}

import {Configuration}from 'webpack'
/*
* @type {Configuration}
*/
const config = {
  entry:'./index.js'
}
module.exports = config
```
