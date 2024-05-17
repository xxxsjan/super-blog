# typescript

[utility-types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

## 基础概念

```
K in keyof  T 什么意思

意思是，遍历T的所有key值

K in keyof  T as K什么意思

意思是，遍历T的所有key值，这些key放一起组合成新的类型，这个类型叫K

官方一点的解释：

在这个例子中，`as K` 的作用是映射属性名，将所有符合条件的属性名重新赋值为它们原本的名称，以便在后面的类型声明中使用。

具体来说，`key in keyof T as K` 中的 `as K` 表示将映射类型 `{ [key in keyof T]: T[key] }` 中的 `key` 属性名重新命名为 `K`，以避免在后续的属性过滤操作中因为属性名不一致而无法识别该属性。换句话说，`as K` 声明了一个新的类型变量 `K`，并将原本的属性名 `key` 赋值给它，以便在后面的类型声明中使用。
```



## extends

```javaScript
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}
上述代码中，T 是一个泛型类型参数，并使用 extends 关键字限制了 T 的类型必须有一个名为 length 的数值属性。
```

## 

#### [类型分发](https://link.juejin.cn/?target=https%3A%2F%2Fwww.typescriptlang.org%2Fdocs%2Fhandbook%2F2%2Fconditional-types.html%23distributive-conditional-types) --裸类型

```javascript
extends前面的参数如果为裸联合类型时则会分解联合类型进行判断（依次遍历所有的子类型进行条件判断）。
然后将最终的结果组成新的联合类型。
A extends B
A 里的值一个个去B里面匹配，匹配到走true，匹配不到走false，都会根据三元运算符返回一个类型
A走完最后一个，之前返回的类型会组成一个联合类型，作为本次三元运算符返回结果
// Type 是裸类型，会进行分发
type NakedToArray<Type> = Type extends any ? Type[] : never;
type t1 = NakedToArray<string | number>; // string[] | number[];

// [Type] 不是裸类型，不会进行分发
type ToArray<Type> = [Type] extends [any] ? Type[] : never;
type t2 = ToArray<string | number>; // (string | number)[]


type A = 1 | 2 | 3
type B = 1 | 2

type C<T, U> = T extends U ? T : never
// 裸类型
type D = C<A, B>   // 1 | 2
```

#### infer

```
infer的话是结合extends进行使用

用做匹配，按位置匹配，

有点类似js数组 [a,b] = [1,2]，最后a=1，b=2

比如

type Infer1<T> = T extends (infer S)[] ? S : never;

infer S就是相当于匹配T，看T是什么，他就对应什么

type a1 = Infer1<string>; // never

type a2 = Infer1<string[]>; // string

a1中：T是 string ，infer S应该匹配不到，T  extends string[]为false，输出never

a2中：T是 string[], infer S 匹配的还是string，T   extends string[]明显true，所以输出S ，也就是string
```



其他例子

```typescript
// 单元素元组 infer
type Infer2<T> = T extends [infer S] ? S : never;
type b1 = Infer2<[string, number]>; // never
type b2 = Infer2<[string]>; // string

// 多元素元组 infer
// R 同样是一个元组类型，数量最少为 0 个
type Infer3<T> = T extends [infer S, ...infer R] ? [S, R] : never;
type c1 = Infer3<[]>; // never
type c2 = Infer3<[string]>; // [string, []]
type c3 = Infer3<[string, number]>; // [string, [number]]

// 字符串字面量 infer
type Infer4<T> = T extends `${infer S}` ? S : never;
type d1 = Infer4<"str">; // str
type d2 = Infer4<1>; // never

// 字符串字面量 infer
type Infer5<T> = T extends `${infer S}${infer R}` ? [S, R] : never;
type e1 = Infer5<"">; // never
type e2 = Infer5<"s">; // ["s", ""]
type e3 = Infer5<"stw">; // ["s", "tw"] 类比split

// 字符串字面量 infer
// 获取分隔符前后的字面量
type Infer6<T> = T extends `${infer S}__${infer R}` ? [S, R] : never;
type f1 = Infer6<"">; // never
type f2 = Infer6<"str1__str2">; // ["str1", "str2"]
type f3 = Infer6<"str1__str2__str3">; // ["str1", "str2__str3"]

// 其他类型 infer 
type Infer7<T> = T extends Promise<infer R> ? R : never;
type g1 = Infer7<"">; // never
type g2 = Infer7<Promise<number>>; // number


// 总结
infer S匹配string，S是string
`${infer S}`匹配 "str",S是str
[infer S ] 匹配 [number ,string]， S是 [number | string]
Promise<infer S>匹配Promise<string>, S是string
```

## 题目

[取元组第二项的类型](https://www.typescriptlang.org/play?#code/C4TwDgpgBAKgrmANhAglAvFA2gOzgWwCMIAnAGikIHsrkBDHCgZ2BIEscBzAXQFgAoUJFgJkAIQzZqtCA2asOnCniKkKcHAGscVAO44A-H0Hho8JBADCk3AWLkoK+xWn1GlGm+MCh0AMoQAMZUOAAmADzmyFAQAB7AEGFMUBraejhY3AB8klHQcQlJ2BwAZqRQKBSl5WIUAHQN1SRQltxQBlASAFyOEABupAI+plABwWFomGMhEXkoWcPC02ESU0EzkaIQYgsmS+th1mvjs1uWu4vQAGJsJCyRMfGJocmpOvqZOZgwj4UvxTgys1KlAGnUmp02h00D0cP1BntoABRWKBRBwUIQG53YAPArPV5ad4ZbK5X4EgFAir1RqAmpQzpQWHwkiXKAAGTo9x++KKb3SnzJvP+WDBEJBELEDO6vQGrMRUBRaIxEE53PJfKJAtJ3w1IrFdOBVUNkPaFSZsvKQwVy1CABFJEr0ZjsdyzhcFa7gJMoF7NhZ5mynSqvT7gy7bm6A7tfByud7JGrcXMYyNw6r42HUc6M1HkIH+GyAAokKj4NhMVCSEtlisQcIsdhcVPCGvlysANTo6PrPKeRTbdfC-P0WS+sD1yUHlfCEK7PZyHXncGgzLlxdL7Ygy6rmGn2+7K-C+-mQA)

```typescript
// 取元组第二项的类型
type TupleA = [number, boolean, string]
type TupleB = [boolean, string, number, unknown?]
type TupleC = [number, number, boolean, boolean]
// 答案
type Second<Tuple extends unknown[]> 
  = Tuple extends [infer A, infer B, ...infer C] ? B : never

type SecondA = Second<TupleA>  // boolean
type SecondB = Second<TupleB>  // string
type SecondC = Second<TupleC>  // number

// 解释
// infer A  infer B 匹配元组的第一二个类型
```

[初学者入门ts](https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247493477&idx=1&sn=f6a74b2352fbdf3036f06049789e2baf&chksm=c2e1124ef5969b589eb603330f0ceb293b0908df20f7bf6df58218e7b068f0993883a84c4f32&token=907147968&lang=zh_CN&mode=light#rd)

## DOM

```javascript
// !
const link = document.querySelector('a')!;
// HTMLFormElement
const form = document.getElementById('signup-form') as HTMLFormElement;
// Event
form.addEventListener('submit', (e: Event) => {
  e.preventDefault(); // 阻止页面刷新

  console.log(e.tarrget); // ERROR: Property 'tarrget' does not exist on type 'Event'. Did you mean 'target'?
});
```

## class

```javascript
class Person {
  readonly name: string; // 不可以变的
  private isCool: boolean; // 类的私有属性、外部访问不到
  protected email: string; // 只能从这个类和子类中进行访问和修改
  public age: number; // 任何地方都可以访问和修改

  constructor(n: string, c: boolean, a: number) {
    this.name = n;
    this.isCool = c;
    this.age = a;
  }

  sayHello() {
    return `Hi，我是 ${this.name} ，我今年 ${this.age} 岁了`;
  }
}

// 简约写法
class Person {
  constructor(
    readonly name: string,
    private isCool: boolean,
    protected email: string,
    public age: number
  ) {}
}
```

## type与interface

### 扩展

```javascript
type通过&
interface通过extends

interface Bear extends Animal {
  honey: boolean
}

type Bear = Animal & {
  honey: boolean
}

**interface** 是可以自动合并类型的，但是 **type** 不支持

即interface可以重复声明

type不行，因为他是等号，相当于重新赋值了

一般来说

当你不知道用啥的时候，默认就用 **interface** 就行

直到 **interface** 满足不了我们的需求的时候再用 **type**
```



## 类型声明文件d.ts

declare为**已存在的变量**声明类型，不是新增变量

type interface 不需要使用declare关键字，因为他们本身就是新增变量类型的操作

```typescript
type MyType = {
  a:number
}
declare let count:number
export {count,MyType}

// 使用 不需要.d.ts后缀
import {MyType} from './index' 
```

## React

### react查看事件的类型技巧

```
在jsx中写好onClick = {e=>{}}
```

把鼠标放e上面即可

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305131204890.png)

```typescript
function Com(){
  const handleClick = (e:React.MouseEvent<HTMLButtonELement>)=>{}
  const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{}
  return (
    <input onClick={handleClick}/>
	)
}
```

### Function组件

[https://www.bilibili.com/video/BV14Z4y1u7pi](https://www.bilibili.com/video/BV14Z4y1u7pi?p=87&spm_id_from=pageDriver&vd_source=11e14f37a256537712e73b4b7f52411c)

### prop默认值

```typescript
function Com(){
  const handleClick = (e:React.MouseEvent<HTMLButtonELement>)=>{}
  const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{}
  return ()
}
Com.defaultProps = {age:18}

// or
function Com({age=18}){
  return ()
}
```

### class组件

类型声明

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305131204094.png)

props默认值

![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305131204104.png)

## 配置文件d.ts

自定义d.td，随便起名字就行

```javascript
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';
declare module '*.json';

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';
declare module '*.ico';
```

global.d.ts  空两行是格式化需要

```javascript
interface Window {
  NoCaptcha: any;
}

declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
}

declare const __DEV__: boolean;
declare const particlesJS: any;
```

index.d.ts

```javascript
/// <reference path="custom-typings.d.ts" />
```



## 体操

### 过滤、查找联合类型

```typescript
interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type Animal = Cat | Dog

type LookUp<U, T> = U extends { type: T } ? U : never
```

### as的骚操作

```typescript
type MyOmit<T, K extends keyof T> = {
  [P in keyof T as (P extends K ? never : P)]: T[P]
}
```

### trim字符串

模板字符串是关键

```typescript
// 左边
type TrimLeft<S extends string> = S extends `${' ' | '\n' | '\t'}${infer R}` 
  ? TrimLeft<`${R}`> 
  : S 
Expect<Equal<TrimLeft<'str'>, 'str'>>,
Expect<Equal<TrimLeft<' str'>, 'str'>>,
Expect<Equal<TrimLeft<'     str'>, 'str'>>,
Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
Expect<Equal<TrimLeft<''>, ''>>,
Expect<Equal<TrimLeft<' \n\t'>, ''>>,
// 两边 方法1 
type Whitespace = "\n" | "\t" | " ";
type Trim<S extends string> = S extends `${Whitespace}${infer R}`
  ? Trim<R>
  : S extends `${infer L}${Whitespace}`
    ? Trim<L>
    : S;
// 两边 方法2
type TrimLeft<S extends string> = S extends `${' ' | '\n' | '\t'}${infer R}` 
  ? TrimLeft<R> 
  : S;
type TrimRight<S extends string> = S extends `${infer R}${' ' | '\n' | '\t'}` 
  ? TrimRight<R> 
  : S;
type Trim<S extends string> = TrimRight<TrimLeft<S>>;
```

### 类型分发--裸类型

```javascript
type Permutation<T, U = T> = [T] extends [never]
  ? []
  : T extends U
  ? [T, ...Permutation<Exclude<U, T>>]
  : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<Equal<Permutation<'A' | 'B' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<'B' | 'A' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>,
]
```

extends输出&

平常都是输出 | 的，遇到函数+infer居然输出& ，记录一下

```javascript
type BB = ((k: () => '1') => void) | ((k: () => '2') => void) extends (
  k: infer I
) => void
  ? I
  : never;
```

union交集

```javascript
// 两个一样
Extract<keyof A,keyof B> === keyof (A | B)
```

没看懂

```javascript
type IsUnion<T, U = T> = [T] extends [never] 
  ? false 
  : T extends U 
    ? [U] extends [T] 
      ? false 
      : true 
    : false
```

union 和 {}

```javascript
type ReplaceKeys<U, T, Y> = {
  [key in keyof U]: key extends T ? (
    key extends keyof Y ? (
      Y[key]
    ) : never
  ) : U[key]
}
// U 是联合类型{}|{}|{}  输出也是{} |{} |{}
```

0 不是number

```javascript
type a = number extends 0 ? 1 : 2 // 2
```

& 之后使用 extends

```javascript
type PartialByKeys<T, K = keyof T> = Omit<T, K & keyof T> & Partial<Pick<T, K & keyof T>> extends infer U 
  ? { [K in keyof U]: U[K] } 
  : never;
```

类型体操时 生成联合类型常见方式

```javascript
// 用 union extends union 裸类型的方式
// 2946 - ObjectEntries 例子
type ObjectEntries<T, K = keyof T> = K extends keyof Required<T> 
? [K, [T[K]] extends [undefined] 
  ? undefined 
  : Exclude<T[K], undefined>] 
: never

// 对象使用union作为key获取
type ObjectEntries<T> = {
  [P in keyof T]-?: [P, [T[P]] extends [undefined] ? undefined : Exclude<T[P], undefined>]
}[keyof T]

type a = {
  name: ["name", string];
  age: ["age", number];
  locations: ["locations", string[] | null];
}['name' | 'age']
```

数字减一

```javascript
https://github.com/type-challenges/type-challenges/issues/14398
type MinusOne<T extends number, C extends any[] = []> = [
  1,
  ...C
]["length"] extends T
  ? C["length"]
  : [1, 1, ...C]["length"] extends T   // reduce recurtion depth +1问多一遍，减少一次问的次数
  ? [1, ...C]["length"]
  : MinusOne<T, [1, 1, ...C]>;

// 缺点数字长度过长就不行了，也就是number太大 自测3000都不行了

type numberLess = {
"0": 9,
  "1": 0,
  "2": 1,
  "3": 2,
  "4": 3,
  "5": 4,
  "6": 5,
  "7": 6,
  "8": 7,
  "9": 8
}
https://github.com/type-challenges/type-challenges/issues/14046
https://github.com/type-challenges/type-challenges/issues/13507
```

### FlattenDepth 可自定义深度的拍平

```javascript
https://github.com/type-challenges/type-challenges/issues/8566
// your answers
type FlattenDepth<Arr extends any[], depth extends number = 1> =
  depth extends 0
    ? Arr
    : Arr extends [infer F, ...infer Rest]
      ? F extends Array<any>
        ? [...FlattenDepth<F, MinusOne<depth>>, ...FlattenDepth<Rest, depth>]
        : [F, ...FlattenDepth<Rest, depth>]
      : Arr

// 用法数字减一的方法
```

### 所有组合AllCombinations  -union extends union

```typescript
https://github.com/type-challenges/type-challenges/issues/14137
type String2Union<S extends string> = S extends `${infer L}${infer R}` ? L | String2Union<R> : S

type AllCombinations<
  S extends string,
  U extends String2Union<S> = String2Union<S>, 
  T extends U = U
  > = [U] extends never 
  ? never : (
    U extends T ? (
      `${U}` | `${U}${AllCombinations<S, Exclude<T, U>>}`
    ) : never
  )
```

### 填充数组

```javascript
https://github.com/type-challenges/type-challenges/issues/14102
type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  Index extends any[] = [],
  IsStartIdx extends boolean = Index['length'] extends Start ? true : false
  > = Index['length'] extends End 
  ? T
  : T extends [infer R, ...infer U]
    ?IsStartIdx extends true
      ?[N,...Fill<U,N,Start,End,[...Index,1],true>]
      :[R,...Fill<U,N,Start,End,[...Index,1]>]
    :T
```

### 联合类型是对象，去筛选取值

```javascript
https://github.com/type-challenges/type-challenges/issues/14152
type MapTypes<T, R extends { mapFrom: any; mapTo: any }> = {
  [K in keyof T]: T[K] extends R['mapFrom']
  ? R extends { mapFrom: T[K] }  // 再过滤一遍
    ? R['mapTo']
    : never
  : T[K]
}
```

### 第三方库声明

比如引入第三方库时，他是js写的，没有声明文件，会报没有声明的错

解决：

在.d.ts里面新增定义即可，新建一个.d.ts也行，你找项目里随便一个.d.ts也行，写里面就行

但这个.d.ts需要先说明给ts知道，一般ts.config.js里面会有默认配置

大概是这种，.d.ts匹配到就会生效

```json
{
    "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
}
```

写的内容就是

```typescript
// 最简单的就一句
declare module 'other-lib';
// 详细定义  比如vue上加一个属性
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $filters:{
      format:(s:string)=>string
    },
    $env:string
  }
}
```



## InstanceType

获取类的实例类型

```
const formRef = ref<InstanceType<typeof ELForm>>()

// 封装
export  function useComRef<T extends abstract new (...args:any)=>any>(){
	return ref(InstanceType<T>)
}
const formRef = useComRef<ELForm>()

// 或者
export  function useComRef<T extends abstract new (...args:any)=>any>(_com:T){
	return ref(InstanceType<T>)
}
const formRef = useComRef(ELForm)
```

