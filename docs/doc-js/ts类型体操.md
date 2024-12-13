# 类型体操

## 升序字符串数值

```ts
// 求 const obj = {
//     p1:'1',
//     p2:'2',
//     p3:'3',
//     ...
//     p96:'96'
// }
// 开始
type Result = ['p0','p1','p2','p3']
type ResultField =Result[number]
type GenerateObj = {
    [key in ResultField]:string
}
// 变
type ResultField<Result extends string[] = ['p0','p1','p2','p3']> = Result[number]
type GenerateObj = {
    [key in ResultField]:string
}
// 在变
type ResultField<Result extends string[] = []> = Result['length'] extends 96? Result[number]: ResultField<[...Result,`p${Result['length']}`]>
type GenerateObj = {
    [key in ResultField]:string
}

```
