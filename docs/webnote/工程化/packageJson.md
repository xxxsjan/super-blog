# package.json



## 指定依赖包的版本号

`"resolutions"` 字段只能在使用了 Yarn 包管理器的项目中使用。如果使用的是 npm，可以使用 `npm-force-resolutions` 等工具来实现类似的功能。

```javascript
"resolutions": {
    "@types/react": "^17.0.9",
    "@types/react-dom": "^17.0.9",
    "eslint": "^8.36.0"
},
```

