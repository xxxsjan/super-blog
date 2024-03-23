
```javascript
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [],
                    //开启babel缓存，第二次构建时，会读取之前的缓存
                    cacheDirectory: true,
                },
            },
        ],
    },
}
```
