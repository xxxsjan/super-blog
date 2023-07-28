# git Action

## action.yml

```yaml
name: My Action

description: A custom action to print a message

inputs:
  message:
    description: 'The message to print'
    required: true

outputs:
  time:
    description: 'The time when the action was run'

runs:
  using: 'node12'
  main: 'index.js'
```

## index.js

```
const core = require('@actions/core');

try {
  const message = core.getInput('message');
  const time = new Date().toISOString();
  console.log(`${time}: ${message}`);
  core.setOutput('time', time);
} catch (error) {
  core.setFailed(error.message);
}
```



## 创建Release 版本

先要创建tag

1. 在 GitHub 网站上，进入代码仓库的 Releases 页面，创建一个新的 Release 版本。可以按照页面上的提示，填写相关的信息，包括版本号、标题、描述、附件等。
2. 发布 Release 版本，使得其他用户可以方便地下载和使用该版本的代码。在发布之前，可以先进行一些测试和验证，以确保代码的质量和稳定性。

使用

```
- name: Print Message
  uses: <username>/<repository>@v1
  with:
    message: 'Hello, world!'
```

