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



## 控制图片输出base64

```
import { defineConfig } from 'vite';
import fs from 'node:fs';

function toBase64Plugin(limit = 4096) {
  return {
    name: 'tobase64-plugin',
    async transform(code, id) { // Add async keyword here
      if (process.env.NODE_ENV !== 'development') {
        return;
      }
      if (!id.endsWith('.png')) {
        return;
      }

      try {
        const stat = await fs.stat(id);
        if (stat.size > limit) {
          return;
        }

        const buffer = await fs.readFile(id);
        const base64 = buffer.toString('base64');
        const dataURL = `data:image/png;base64,${base64}`;

        return {
          code: `export default "${dataURL}";`,
          map: null, // Provide source map if needed
        };
      } catch (error) {
        console.error('Error processing image:', error);
        return; // Return undefined on error
      }
    },
  };
}

export default defineConfig({
  plugins: [toBase64Plugin()],
});
```

