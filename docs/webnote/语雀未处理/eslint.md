#### eslint语法检查

三个开发包：eslint   eslint-plugin-import    eslint-config-airbnb-base

js代买加上注释：// eslint-disable-next-line     后面的代码不检查

```javascript
module.exports = {
	module:{
		rules：[{
			test:/\.js$/,
			exclude:/node_modules/,
    	enforce：'pre',//优先执行，先eslint再其他
			loader:'eslint-loader',
			options:{
				fix:true // 自动修复
			}
		}]
	},
	plugins：[]
}
// package.json配置-extent继承
"eslintConfig":{
	"extent":"airbnb-base"
}
```

