# vite插件开发

https://mp.weixin.qq.com/s/_0mFO6jG7V2cO_ZRr_rQVg

## 替换指定字符

```typescript
type Options = {
searchValue:RegExp,
replaceValue:string
}


export default function replacePlugin(options) {
  return {
    name: 'replace',
    transform(code, id) {
      if (id.endsWith('.js')) {
        code = code.replace(options.searchValue, options.replaceValue);
      }
      return { code, map: null };
    }
  };
}
```



