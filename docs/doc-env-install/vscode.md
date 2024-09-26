

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

Node Snippets 	--node代码工具

React Native Tools 	 --React代码工具

Vue 2 Snippets	--vue 代码工具

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



### 代码补全

#### html标签

```
"emmet.includeLanguages": {
    "vue-html": "html",
    "vue": "html"
  },
  "emmet.syntaxProfiles": {
    "vue-html": "html",
    "vue": "html"
  }
```



## 终端自动提示和补全

https://juejin.cn/post/7187442172671557689

https://dev.to/animo/fish-like-autosuggestion-in-powershell-21ec

https://juejin.cn/post/7224109605071945787





## ai工具

```
Codeium

TONGYI

CodeGeeX: AI Code AutoComplete, Chat, Auto Comment

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

