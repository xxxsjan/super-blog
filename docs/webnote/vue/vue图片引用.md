# vue图片引用

## vite能够识别的路径

1 标签中的静态路径 比如img的src  变成文件指纹命名

2 css的静态路径

3 动态导入

## 解决方案

方案一：

一个个手动导入

```
import png1 from './assets/1.png'
import png2 from './assets/2.png'
```

方案二：

动态导入，通过模板字符串

但是不运行是没值的，但vite会解析静态的目录，把可能的都引进来，每个图片引用都会打包一个js，这个js暴露一个路径

```
function handleChange(val){
	import(`./assets/${val}.png`).then(res=>{
   		 path.value = res.default
    })
}
```

方案三：

使用URL

```
function handleChange(val){
	const url = new URL(`./assets/${val}.png`,import.meta.url)
   	path.value = url.pathname
}
```

