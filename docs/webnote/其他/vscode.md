

# vscode

## 控制相关文件嵌套展示

setting.json

```javascript
{
	// 控制相关文件嵌套展示
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.expand": false,
  "explorer.fileNesting.patterns": {
    "*.ts": "$(capture).test.ts, $(capture).test.tsx",
    "*.tsx": "$(capture).test.ts, $(capture).test.tsx",
    "*.env": "$(capture).env.*",
    "CHANGELOG.md": "CHANGELOG*",
    "package.json": "pnpm-lock.yaml,pnpm-workspace.yaml,LICENSE,.gitattributes,.gitignore,.gitpod.yml,CNAME,README*,.npmrc,.browserslistrc",
    ".eslintrc.js": ".eslintignore,.prettierignore,.stylelintignore,.commitlintrc.js,.prettierrc.js,.stylelintrc.js"
  },
}
```

## **vscode 插件**

### error lens

错误提示，会出现在代码行尾部进行提示



### import cost 

导入模块的大小



### any-rule

你要的"正则"都在这!

https://marketplace.visualstudio.com/items?itemName=russell.any-rule