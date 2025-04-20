# vscode

[vscode官网](https://code.visualstudio.com/)

## **vscode 插件**

### error lens

错误提示，会出现在代码行尾部进行提示

### import cost

导入模块的大小

### any-rule

你要的"正则"都在这!

<https://marketplace.visualstudio.com/items?itemName=russell.any-rule>

Node Snippets  --node代码工具

React Native Tools   --React代码工具

Vue 2 Snippets --vue 代码工具

node sn  --代码工具

## 导出vscode插件数据

```
code --list-extensions > extensions.txt
```

```
alefragnani.project-manager
BriteSnow.vscode-toggle-quotes
ChakrounAnas.turbo-console-log
chouzz.vscode-better-align
chrmarti.regex
cweijan.vscode-mysql-client2
DavidAnson.vscode-markdownlint
dbaeumer.vscode-eslint
donjayamanne.githistory
esbenp.prettier-vscode
formulahendry.auto-close-tag
formulahendry.auto-rename-tag
formulahendry.code-runner
GitHub.remotehub
GitHub.vscode-pull-request-github
hearhear.html-comment
hollowtree.vue-snippets
hoovercj.vscode-power-mode
kisstkondoros.vscode-gutter-preview
mrcrowl.easy-less
MS-CEINTL.vscode-language-pack-zh-hans
ms-python.isort
ms-python.python
ms-python.vscode-pylance
ms-toolsai.jupyter
ms-toolsai.jupyter-keymap
ms-toolsai.jupyter-renderers
ms-toolsai.vscode-jupyter-cell-tags
ms-toolsai.vscode-jupyter-slideshow
ms-vscode.remote-repositories
nick-rudenko.back-n-forth
ritwickdey.LiveServer
rvest.vs-code-prettier-eslint
shenjiaolong.vue-helper
streetsidesoftware.code-spell-checker
stylelint.vscode-stylelint
techer.open-in-browser
usernamehw.errorlens
vscode-icons-team.vscode-icons
Vue.volar
WallabyJs.console-ninja
whtouche.vscode-js-console-utils
wix.vscode-import-cost
yutent.scss-to-css
```

### 还原

```
cat extensions.txt | xargs -n 1 code --install-extension
```

或者

创建一个文件夹，新建.vscode\extensions.json

重新打开vscode就会提示你下载了，很方便

```
{
  "recommendations": [
    "alefragnani.project-manager",
    "antfu.vite",
    "ChakrounAnas.turbo-console-log",
    "chouzz.vscode-better-align",
    "cweijan.vscode-mysql-client2",
    "DavidAnson.vscode-markdownlint",
    "dbaeumer.vscode-eslint",
    "donjayamanne.githistory",
    "esbenp.prettier-vscode",
    "formulahendry.auto-close-tag",
    "formulahendry.auto-rename-tag",
    "formulahendry.code-runner",
    "GitHub.remotehub",
    "GitHub.vscode-pull-request-github",
    "hearhear.html-comment",
    "hollowtree.vue-snippets",
    "hoovercj.vscode-power-mode",
    "kisstkondoros.vscode-gutter-preview",
    "lokalise.i18n-ally",
    "mrcrowl.easy-less",
    "MS-CEINTL.vscode-language-pack-zh-hans",
    "ms-vscode.remote-repositories",
    "nick-rudenko.back-n-forth",
    "ritwickdey.LiveServer",
    "rvest.vs-code-prettier-eslint",
    "shenjiaolong.vue-helper",
    "streetsidesoftware.code-spell-checker",
    "stylelint.vscode-stylelint",
    "techer.open-in-browser",
    "usernamehw.errorlens",
    "vscode-icons-team.vscode-icons",
    "Vue.volar",
    "Vue.vscode-typescript-vue-plugin",
    "whtouche.vscode-js-console-utils",
    "wix.vscode-import-cost",
    "yutent.scss-to-css",
  ]
}
```

## ai插件

```
Codeium
TONGYI
CodeGeeX:
```

## js项目路径跳转

```
{
  "compilerOptions": {
    "baseUrl": "./assets"
  },
  "include": ["assets/**/*.js", "assets/**/*.jsx"]
}

```

## setting.json

### js文件 div补全 emmet

```
"emmet.includeLanguages": {
    "javascript": "javascriptreact"
},
"emmet.triggerExpansionOnTab": true,
```

### eslint

```
"eslint.format.enable": true,
"[typescriptreact]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    "editor.formatOnSave": true
}
```

### 文件夹分组

```
{
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.patterns": {
    "env.d.ts": "auto-imports.d.ts, components.d.ts, interface-extensions.d.ts",
    "tsconfig.json": "tsconfig.*.json"
  }
}
```

### 格式化报错 delete cr

1 修改.prettierrc文件， `npx prettier --write .`  可以修改文件

```
{
  "endOfLine": "auto"
}
```

2 关闭git自动转换

```
git config --global core.autocrlf false
```
