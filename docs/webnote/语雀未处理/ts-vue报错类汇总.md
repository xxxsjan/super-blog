### 找不到模块“vue”或其相应的类型声明

![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1660832948277-13fb0b2e-34cd-4566-bd6f-b54040e0f385.png#averageHue=%23272020&clientId=u448483b6-cc3f-4&from=paste&height=82&id=u06d75da2&originHeight=103&originWidth=786&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10987&status=done&style=none&taskId=ufcae8412-3909-4df1-8651-d9369d5fe3a&title=&width=628.8)

新建shims .d.ts

```css
declare module "*.vue" {
  import { defineComponent } from "vue";
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}
```

再tsconfig.json里includes
![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1660833011684-24076ab4-a14c-473e-b940-e99b8a4c1845.png#averageHue=%23352d21&clientId=u448483b6-cc3f-4&from=paste&height=253&id=uffff2af4&originHeight=316&originWidth=771&originalType=binary&ratio=1&rotation=0&showTitle=false&size=193316&status=done&style=none&taskId=ucaed7386-a37e-4ea7-bc60-6c7610db697&title=&width=616.8)
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
