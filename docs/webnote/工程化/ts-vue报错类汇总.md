### 找不到模块“vue”或其相应的类型声明

![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151253717.png)

新建shims .d.ts

```css
declare module "*.vue" {
  import { defineComponent } from "vue";
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}
```

再tsconfig.json里includes
![image.png](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305151253552.png)
或者这样，自动匹配d.ts

```css
"include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "types/**/*.d.ts",
    "types/**/*.ts",
    "build/**/*.ts",
    "build/**/*.d.ts",
    "mock/**/*.ts",
    "vite.config.ts"
  ],
```
