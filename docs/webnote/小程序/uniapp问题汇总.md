# uniapp问题汇总

https://juejin.cn/post/6919341967432220679



### 跳转的注意点

navigateTo、redirectTo不能跳tabbar

reLaunch、switchTab可以跳转tabbar



url有长度限制，太长的字符串会传递失败,可通过窗口通信(下面会介绍)、全局变量或encodeURIComponent等多种方式解决

```typescript
//pageA页面
const data = {
    //多个参数
}
uni.navigateTo({
    url: `/pages/pageB/pageB?data=encodeURIComponent(JSON.stringify(data))`
})

//pageB页面
onLoad(option){
    const data = JSON.parse(decodeURIComponent(option.data));
}
console.log(`?x=${encodeURIComponent('test?')}`);
// expected output: "?x=test%3F"

console.log(`?x=${encodeURIComponent('шеллы')}`);
// expected output: "?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B"
```