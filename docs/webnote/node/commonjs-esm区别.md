# commonjs esm区别

https://juejin.cn/post/6844903861166014478

commonjs的是输出拷贝，esm的是输出引用

也就是common在获取属性时，是拷贝的，cjs里再做操作和输出的也不再是一个对象

esm的话是输出引用，mjs里面的属性更改会反映到外面的获取值，因为是引用





https://www.zhihu.com/question/400927867

简单比较如下：

- ES Module 输出的是值的引用，而 CommonJS 输出的是值的[拷贝](https://www.zhihu.com/search?q=拷贝&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2469864759})（类似浅拷贝，引用类型会被修改）；
- ES Module 是编译时执行，而 CommonJS 模块是在运行时加载；
- ES6 Module可以导出多个值，而CommonJs 是单个值导出；
- ES6 Module 静态语法只能写在顶层，而CommonJs 是[动态语法](https://www.zhihu.com/search?q=动态语法&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2469864759})可以写在判断里；
- ES6 Module的 this 是 undefined，而CommonJs 的 this 是当前模块；



### 更深入的

https://juejin.cn/post/7063884183751852068#heading-15



 