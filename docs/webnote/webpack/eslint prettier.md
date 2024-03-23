### 前言
eslint是负责校验代码规范的
prettier是负责格式化代码的
当然eslint也可以fix代码，但只是js文件
这点，就需要prettier的帮助，所以索性格式化就都交给prettier了吧
--参考[https://juejin.cn/post/6990929456382607374](https://juejin.cn/post/6990929456382607374)做的总结
### 配置文件
eslint的配置文件是.eslintrc 或者是.eslintrc.js
prettier的配置文件是.prettierrc 或者是 .prettierrc.js
名字其实挺好记的，都是什么什么rc，其他插件也是类似，babel的叫babelrc之类的
前者是json类型文件，格式就是json那种
后者就是js文件，需要module.export ={} 进行配置

配置的冲突
由于eslint有他自己的一套规则设置
prettier也有他的一套规则设置，
这时需要一个插件来解决这种矛盾
他就是 eslint-plugin-prettier , 重合的部分按照prettier的规则来。

开始安装依赖包
#### 方法一：
npm i eslint @vue/eslint-config-prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue prettier -D
##### 说明
--eslint-plugin-vue
--eslint-plugin-prettier
--eslint-config-prettier
--@vue/eslint-config-prettier
--prettier
--eslint
##### 手动添加.eslintrc.js
```javascript
//.eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/prettier'],
  /** 
  extends: [
  "plugin:vue/vue3-essential",
  "eslint:recommended",
  "@vue/typescript/recommended",
  "plugin:prettier/recommended",
  ], 
  */
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineComponent: 'readonly',
    defineExpose: 'readonly',
    ElMessage: 'readonly',
    ElNotification: 'readonly',
    ElMessageBox: 'readonly',
  },
}

```
#### 方法二
##### npx eslint --init
即npm init @eslint/config
按步骤，他会帮你装eslint-plugin-vue@latest, eslint@latest  放到devdependencies里
他也会生成eslintrc.js在根目录
module报错就在env加上node:true
```javascript
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
    }
}

```
现在就可以执行eslint相关命令了
按照的是eslint推荐的规范
```javascript
eslint --ext .js,.ts,.vue src
eslint --fix --ext .js,.ts,.vue src
```
要配合prettier就安装
npm i  @vue/eslint-config-prettier eslint-config-prettier eslint-plugin-prettier prettier -D
yarn add -D @vue/eslint-config-prettier eslint-config-prettier eslint-plugin-prettier prettier
.eslintrc配置使用prettier插件
```javascript
extends: ['eslint:recommended', 'plugin:vue/vue3-essential'],
  改成
extends: ['eslint:recommended', 'plugin:vue/vue3-essential','@vue/prettier'],
```

添加.prettierrc.js
```javascript
//.prettierrc.js
module.exports = {
  printWidth: 120,
  tabWidth: 4,
  useTabs: false,
  singleQuote: false,
  semi: false,
  trailingComma: "es5",
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: "avoid",
  endOfLine: "auto",
}

```

每次修改完规则后，都需要重启vscode才会生效。
### fix代码
fix也就是修正，格式化代码
分两种：手动、命令自动
#### 手动
手动就是编辑器右键格式化代码，他会根据编辑器里设置好的风格进行格式化
如果使用的是prettier插件，刚刚好你项目下有.prettierrc文件，那手动格式化就是项目规定的那种规范
#### 命令式格式化
这就是通过配置package.jsonl里的script

### 忽略文件
.eslintignore
```javascript
src/config
src/utils/bideo.js
vue.config.js
mock/
```

### 换行 CRLF  LF
在 Windows 上默认的是回车换行（Carriage Return Line Feed, CRLF），
然而，在 Linux/MacOS 上则是换行（Line Feed, LF）。
**.gitattributes可定义每种文件类型的换行格式**
```json
*.* eol=lf
*.jpg -text
*.png -text

// 这样，我们不管在什么平台上开发，文件换行符都统一为 LF。

# 或者👇
*.js eol=lf
*.ts eol=lf
*.json eol=lf
```
### Delete `␍`eslint(prettier/prettier)

```json
rules: {
   'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ]
}
```
eslinit 命令
```javascript
npm init @eslint/config
eslint ./
eslint --ext .js,.ts,.vue src
eslint --fix --ext .js,.ts,.vue src

```


### js使用prettier
```javascript
const {format}=require('pretttier')
const prettier_config = require("./.prettierrc.js")

format(html, { parser: "html", ...prettier_config })
```
