### 插件结构
是一个类
```javascript
class XXX {
  constructor(){}
  apply(complier){}
}
```
### 使用本地插件，要找到包可以设置
```javascript
 resolveLoader: {
    modules: ['node_modules', resolve(__dirname, 'modules')],
  },
```

### loader
```javascript
module.exports =  function MyLoader(source){
  return ''
}
```
### 插件示例
#### license-webpack-plugin
```javascript
class LicenseWebpackPlugin {
  constructor(params) {
    const { author } = params;
    this.author = author || '';
    this.source = `The MIT License (MIT)
  
    Copyright (c) 2019-present ${this.author}
                
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
                
    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.
                
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.`
  }
  apply(complier) {
    const that = this;
    complier.hooks.emit.tapAsync(
      'LicenseWebpackPlugin',
      function (complication, cb) {
        // console.log(complication.assets)
        complication.assets['LICENSE'] = {
          source: function () {
            return that.source;
          },
          size: function () {
            return that.source.length;
          },
        };
        cb();
      }
    );
  }
}
module.exports = LicenseWebpackPlugin;

```
