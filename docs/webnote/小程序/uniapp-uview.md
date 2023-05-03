# uniapp-uview

## 安装

https://ext.dcloud.net.cn/plugin?id=6682

1.8导入有点问题，还是直接下载解压吧

![image-20230503135815100](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202305031358288.png)

## 配置

pages.json

```json
{
	"easycom": {
		"^u-(.*)": "@/uview-ui/components/u-$1/u-$1.vue"
	},
}
```

main.js

```
import App from './App'

// 引入:uView-UI
import uView from 'uview-ui';
Vue.use(uView);
```

引入样式

uni.scss

```
// 引入uview全局scss变量
@import "uview-ui/theme.scss";
```

