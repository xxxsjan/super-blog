# vscode配置

## vscode插件

Node Snippets 	--node代码工具

React Native Tools 	 --React代码工具

Vue 2 Snippets	--vue 代码工具

node sn  --代码工具



在Visual Studio Code的安装目录下依此找到 Microsoft VS Code\resources\app\out\vs\workbench\ 目录下的workbench.main.css文件，打开搜索  .monaco-workbench .part>.content（注意.part前面有空格），修改字体大小，保存关闭文件和编辑器，从新打开，左侧资源管理器字体大小的视觉效果比之前舒服多了。

————————————————

版权声明：本文为CSDN博主「weixin_42554311」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。

原文链接：[https://blog.csdn.net/weixin_42554311/article/details/88528367](https://blog.csdn.net/weixin_42554311/article/details/88528367)

## 改注释颜色

ctrl shit p 打开setting设置json文件，后面添加下面代码

```
"editor.tokenColorCustomizations": {
        "comments": "#82e0aa", // 注释
        "keywords": "#0a0", // 关键字
        "variables": "#f00", // 变量名
        "strings": "#e2d75dbd", // 字符串
        "functions": "#5b99fcc9", // 函数名
        "numbers": "#AE81FF" // 数字
      }
```

## stylus格式化代码不带 {}

```
"stylusSupremacy.insertColons": false, // 是否插入冒号
    "stylusSupremacy.insertSemicolons": false, // 是否插入分好
    "stylusSupremacy.insertBraces": false, // 是否插入大括号
    "stylusSupremacy.insertNewLineAroundImports": false, // import之后是否换行
    "stylusSupremacy.insertNewLineAroundBlocks": false, // 两个选择器中是否换行
```

## 选中代码背景

```
"workbench.colorCustomizations": {
        "editor.selectionBackground": "#0000CD",
        "editor.selectionHighlightBackground": "#0000CD",
    }
```

## 自动换行

设置里搜索edit wrap,将off修改为on即可

## snippets语法

```bash
prefix      :代码片段名字，即输入此名字就可以调用代码片段。
body        :这个是代码段的主体.需要编写的代码放在这里,　　　　　 
$1          :生成代码后光标的初始位置.
$2          :生成代码后光标的第二个位置,按tab键可进行快速切换,还可以有$3,$4,$5.....
${1,字符}    :生成代码后光标的初始位置(其中1表示光标开始的序号，字符表示生成代码后光标会直接选中字符。)
description :代码段描述,输入名字后编辑器显示的提示信息。
```

## setting.json ( ctrl shit P)

```json
{
    "editor.fontSize": 20,
    "workbench.colorTheme": "Atom One Dark",
    "workbench.colorCustomizations": {
        "[Atom One Light]": {
            "editor.background": "#C7EDCC",
            "sideBar.background": "#C7EDCC",
            "activityBar.background": "#C7EDCC",
        },
        "editor.selectionBackground": "#0000CD",
        "editor.selectionHighlightBackground": "#0000CD",
    },
    "liveServer.settings.donotShowInfoMsg": true,
    "files.autoSave": "afterDelay",
    "workbench.tree.indent": 20,
    "editor.detectIndentation": false,
    "editor.tabSize": 4, //vscode设置的缩进量
    "editor.formatOnSave": true, //保存时候自动格式化
    "stylusSupremacy.insertColons": false, // 是否插入冒号
    "stylusSupremacy.insertSemicolons": false, // 是否插入分好
    "stylusSupremacy.insertBraces": false, // 是否插入大括号
    "stylusSupremacy.insertNewLineAroundImports": false, // import之后是否换行
    "stylusSupremacy.insertNewLineAroundBlocks": false, // 两个选择器中是否换行
    "editor.tokenColorCustomizations": {
        "comments": "#cacaca", // 注释
        // "keywords": "#82e0aa", // 关键字
        // "variables": "#eeee87", // 变量名
        // "strings": "#d6c937bd", // 字符串
        // "functions": "#5b99fcc9", // 函数名
        // "numbers": "#AE81FF" // 数字
    },
    "terminal.integrated.shell.windows": "C:\\Windows\\System32\\cmd.exe",
    "editor.minimap.enabled": false,
    "editor.wordWrap": "on"
}
```

## 格式化代码

[https://blog.csdn.net/userkang/article/details/84305689](https://blog.csdn.net/userkang/article/details/84305689)
