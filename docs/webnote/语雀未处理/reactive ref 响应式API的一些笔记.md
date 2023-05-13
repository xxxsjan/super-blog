## reactive
会解包ref，意思是value是ref对象的话，读取不需要.value
> 解包就是会把RefImpl（ref 对象）里的value值直接返回，不用你手动.value获取
默认是有深层的响应式


isReactive只是判断检查对象是否是由`reactive`创建的响应式代理。

```
const refData = ref(1);
const state = reactive({
  foo: 1,
  ref: refData,
  nested: {
    bar: 2,
  },
});
console.log(refData); // RefImpl对象
console.log(isReactive(state.foo)); // false 
console.log(isReactive(state.nested)); // true
console.log(isReactive(state.ref), state.ref); // false  读取会解包ref，不用.value即可获得
```

## shallowReactive

不会解包ref，而是直接返回RefImpl对象，要你自己.value读取
只有第一层有响应式

```
const refData = ref(1); 
 const shallow_state = shallowReactive({
  foo: 1,
  nested: {
  bar: 2,
  },
  ref: refData,
  });
shallow_state.foo++;
console.log(isReactive(shallow_state.foo)); // false
console.log(isReactive(shallow_state.nested)); // false
console.log(isReactive(shallow_state.ref), shallow_state.ref.value); // 这里不会解包ref 而是返回RefImpl
},
```

## unref

val = isRef(val) ? val.value : val   的语法糖，有返回值

## toRef

与对象的某个key建立链接
返回一个ref，他们数据相通，更改相互影响
只是toRef返回的值需要.value获取与更改

## toRefs

与对象的每个key建立链接
然后生成一个对象返回，同样的，数据相通，更改相互影响
只是toRefs返回的值需要.value获取与更改
