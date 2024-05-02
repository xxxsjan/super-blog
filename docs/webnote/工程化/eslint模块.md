# eslint



按顺序导入模块

**eslint-plugin-simple-import-sort**

https://www.npmjs.com/package/eslint-plugin-simple-import-sort



https://juejin.cn/post/7281474941257220152



```
module.exports = {
  // ... 其他配置
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};

// rules 自定义
 'simple-import-sort/imports': [
  'error',
  {
    groups: [
     	[`^vue$`, `^vue-router$`, `^ant-design-vue$`, `^echarts$`], // 你可以根据需要添加更多的内置模块
        [`.*\\.vue$`], // .vue 文件
        [`.*/assets/.*`, `^@/assets$`],
        [`.*/config/.*`, `^@/config$`],
        [`.*/hooks/.*`, `^@/hooks$`],
        [`.*/plugins/.*`, `^@/plugins$`],
        [`.*/router/.*`, `^@/router$`],
        [`^@/services$`, `^@/services/.*`],
        [`.*/store/.*`, `^@/store$`],
        [`.*/utils/.*`, `^@/utils$`],
        [`^`],
        [`^type `],
    ],
  },
],
 
```





prettier做导入排序

> plasmo方案的.prettierrc.cjs

```
/**
 * @type {import('prettier').Options}
 */
module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: false,
  trailingComma: "none",
  bracketSpacing: true,
  bracketSameLine: true,
  plugins: [require.resolve("@plasmohq/prettier-plugin-sort-imports")],
  importOrder: ["^@plasmohq/(.*)$", "^~(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
}

```

