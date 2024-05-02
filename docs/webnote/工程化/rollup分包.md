# rollup分包



配置定义

```
rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["vue", "axios", "vue-router", "pinia", "dayjs"],
          element: ["element-plus"],
          utils: ["/src/utils"],
        },
      },
},
```

函数定义

```
rollupOptions: {
      output: {
        manualChunks(id){
        	if(id.includes('node_modules')){
        	 return 'vendor'
        	}
        }
      },
},
```

