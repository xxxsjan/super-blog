### v-memo
传入一个数据，子项数据更改时才会使对应dom重新渲染
空数组的话 作用与v-once一致



## effectScope

场景：取消watch，但自动收集

```
const scope = effectScope()

scope.run(()=>{
	watch(...)
	watch(...)
	watchEffect(...)
	cosnt c = computed()
	// 可以嵌套使用 默认形参false，scope.stop会调用scope2.stop
	const scope2 = effectScope()
	scope2.run(()=>{
		。。。
	})
	// 入参true scope.stop不会调用scope3.stop
	const scope3 = effectScope(true)
	scope3.run(()=>{
		。。。
	})
})

// 停止，会自动取消watch computed effectScope watchEffect
scope.stop()
```

