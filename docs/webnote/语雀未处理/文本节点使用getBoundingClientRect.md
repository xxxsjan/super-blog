通过Range.getBoundingClientRect()

range是选取区域
[https://developer.mozilla.org/zh-CN/docs/Web/API/Range](https://developer.mozilla.org/zh-CN/docs/Web/API/Range)
```typescript
const range = document.createRange()
range.setStart(textNode,0)
range.setEnd(textNode,110) // 末尾位置
range.getBoundingClientRect()
```


幽灵字符
```typescript
const textNode = document.createTextNode('\u200b')
```
