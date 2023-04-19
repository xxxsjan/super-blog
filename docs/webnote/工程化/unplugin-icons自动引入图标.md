# unplugin-icons自动引入图标


npm i -D @vue/compiler-sfc


```js

const Icons = require('unplugin-icons/webpack');
const IconsResolver = require('unplugin-icons/resolver');

module.exports = {
    configureWebpack: {
        plugins: [
            Icons({
                compiler: 'vue3',
                autoInstall: true
            }),
            AutoImport({
                resolvers: [
                    IconsResolver({
                        prefix: 'Icon'
                    })
                ],
            }),
            Components({
                resolvers: [
                    IconsResolver({
                        enabledCollections: ['ep']
                    })
                ]
            })
        ],
       
        
    }, 
};
```

