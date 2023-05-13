### 1.xxx
#### packages.json
配置工作区workspace
*号表示目录下的文件夹都是

对应项目的packags.json的name要设置好
以方便工作区之间的相互引用
```typescript
{
  // 写法1
   "workspaces": [
    "packages/*"
  ]
  // 写法2 一个个写
  "workspaces":["app1","app2"]
}

```
#### 工作区详情
yarn workspace info [--json]
> 2.xxx移除了info，所以上面命令失效

> 改用：yarn workspace list

