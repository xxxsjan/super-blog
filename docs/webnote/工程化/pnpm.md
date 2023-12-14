# pnpm

## peerDependency

忽略第三方peerDependency依赖的检测报错

```
"pnpm": {
    "peerDependencyRules": {
      "ignoreMissing": [
        "webpack",
        "vite",
        "vue"
      ]
    }
  }
```

## 清理缓存

pnpm 是一个Node.js包管理器,类似npm。它有自己的缓存机制,可以通过几种方式清理缓存:

### 1 pnpm cache clean

这个命令可以清理pnpm的全局缓存。

```
pnpm cache clean
```

它会清空缓存目录: 	~/.pnpm-store

### 2 pnpm install --clean

在安装包时使用--clean标志也可以清空缓存。

```
pnpm install <packages> --clean
# 或者
pnpm i --clean
```

这会重新安装所有的依赖,并清除缓存。

### pnpm generated-link cleancache

这个命令可以清除当前项目的缓存。

```
pnpm generated-link cleancache
```

它会清空:	.pnpm-store 目录下与当前项目有关的缓存

### 通过删除缓存目录

最直接的方式就是手动删除缓存目录:

```
rm -rf ~/.pnpm-store 
# 清理全局缓存

rm -rf .pnpm-store 
# 清理项目缓存
```

pnpm 会自动重新生成缓存。

总的来说,通过上面的几种方式,你可以清理 pnpm 的全局缓存或者当前项目缓存。



## npm、pnpm、yarn 清理缓存，更改缓存目录



```
// 清理缓存
$ yarn cache clean
$ npm cache clean -f
$ pnpm store prune

// 设置新的缓存地址
$ npm config  set global-folder "E:/npm/global"
$ pnpm config  set global-folder "E:/yarn/global"
$ pnpm config set "E:/pnpm/global"
```

