# git代码提交校验

参考自vue3源码

使用simple-git-hooks 与 lint-staged

```json
{
    "scripts":{
    "postinstall": "simple-git-hooks"
 },
    "simple-git-hooks": {
        "pre-commit": "pnpm lint-staged && pnpm check",
        "commit-msg": "node scripts/verifyCommit.js"
    },
    "lint-staged": {
        "*.{js,json}": [
            "prettier --write"
        ],
        "*.ts?(x)": [
            "eslint",
            "prettier --parser=typescript --write"
        ]
    },
}
```
