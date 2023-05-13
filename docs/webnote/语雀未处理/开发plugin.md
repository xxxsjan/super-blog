使用Tapable出发事件
插件基本结构
```javascript
class Myplugin{
  constructor(){

  }
  apply(compiler){
    compiler.hooks.emit.tap("MyPlugin",function (compilation){
      
    })
    compiler.hooks.make.tapAsync("MyPlugin",function (compilation){
      compilation.hooks.seal.tap("MyPlugin",()=>{})
    })
  }
}
```

生命周期
webpack 根据入口文件创建compiler对象
下一步
compiler.run()
compiler.compilation()   ------create compilation object
compiler.make() -----并行
create compilation
compilation.buildModule()
compilation.seal()
compilation.optimize() 优化
compilation.reviveChunks()
compilation.seal()
compiler.afterCompile()
compiler.emit() ----串行
compiler.emitAssets()
![](https://cdn.nlark.com/yuque/0/2022/jpeg/28823371/1671110327048-a9dc16b7-c81b-48fa-abf3-21d611f08796.jpeg#averageHue=%23fbf5f2&clientId=ub89d6429-d0db-4&from=paste&height=932&id=u99f6d316&originHeight=1863&originWidth=1225&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u8c883cd7-2724-41a2-9997-292b127f2b6&title=&width=613)
### Compiler

compiler.hooks.emit.tap   串行执行  前面异步会阻塞后面
compiler.hooks.make 并行执行，就是异步

tap
tapAsync
tapPromise
### Compilation

调试node
查看compiler有什么属性
写在js写上debugger
执行 node --inspect-brk ./src/xxx.js
打开浏览器，f12
左上角看到nodejs图标![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1671111455559-2c7c532f-95bf-4d5a-9c28-d86fd2c56a2d.png#averageHue=%23f5f8f2&clientId=ub89d6429-d0db-4&from=paste&height=144&id=ud4f91cb6&originHeight=180&originWidth=291&originalType=binary&ratio=1&rotation=0&showTitle=false&size=41148&status=done&style=none&taskId=u5b83a76d-ffe6-4440-aca9-870424a6dd6&title=&width=232.8)
点击图标
![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1671111562382-df12fb88-4dd3-4bae-a1ee-dc899b9281f5.png#averageHue=%23ededed&clientId=uc75d22a2-2d29-4&from=paste&height=485&id=u3152ea71&originHeight=606&originWidth=718&originalType=binary&ratio=1&rotation=0&showTitle=false&size=95491&status=done&style=none&taskId=ub114f3ef-bb4c-4d6b-865b-af570a3e6c7&title=&width=574.4)
执行debugger，会执行到下一个debugger
![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1671111545617-a9b398c7-5722-4cf2-9bed-ac3facc315f4.png#averageHue=%23dddcd4&clientId=uc75d22a2-2d29-4&from=paste&height=284&id=uc96d16d4&originHeight=567&originWidth=891&originalType=binary&ratio=1&rotation=0&showTitle=false&size=208034&status=done&style=none&taskId=ud041c44c-08f1-423f-a47c-26a73b2d737&title=&width=446)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1671111589897-ab28c8a3-3599-4d41-ad77-5b525ac12032.png#averageHue=%23d6dace&clientId=uc75d22a2-2d29-4&from=paste&height=268&id=ud4977fa1&originHeight=535&originWidth=1006&originalType=binary&ratio=1&rotation=0&showTitle=false&size=341301&status=done&style=none&taskId=uc537f840-b5d9-4be9-89d2-c180b0b53ae&title=&width=503)

## 例子
### BannerWebpackPlugin
```javascript
// plugins/banner-webpack-plugin.js
class BannerWebpackPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    // 需要处理文件
    const extensions = ["js", "css"];

    // emit是异步串行钩子
    compiler.hooks.emit.tapAsync("BannerWebpackPlugin", (compilation, callback) => {
      // compilation.assets包含所有即将输出的资源
      // 通过过滤只保留需要处理的文件
      const assetPaths = Object.keys(compilation.assets).filter((path) => {
        const splitted = path.split(".");
        return extensions.includes(splitted[splitted.length - 1]);
      });

      assetPaths.forEach((assetPath) => {
        const asset = compilation.assets[assetPath];

        const source = `/*
* Author: ${this.options.author}
*/\n${asset.source()}`;

        // 覆盖资源
        compilation.assets[assetPath] = {
          // 资源内容
          source() {
            return source;
          },
          // 资源大小
          size() {
            return source.length;
          },
        };
      });

      callback();
    });
  }
}

module.exports = BannerWebpackPlugin;
```
### CleanWebpackPlugin
[https://www.bilibili.com/video/BV14T4y1z7sw?p=83](https://www.bilibili.com/video/BV14T4y1z7sw?p=83)
```javascript
// plugins/clean-webpack-plugin.js
class CleanWebpackPlugin {
  apply(compiler) {
    // 获取操作文件的对象
    const fs = compiler.outputFileSystem;
    // emit是异步串行钩子
    compiler.hooks.emit.tapAsync("CleanWebpackPlugin", (compilation, callback) => {
      // 获取输出文件目录
      const outputPath = compiler.options.output.path;
      // 删除目录所有文件
      const err = this.removeFiles(fs, outputPath);
      // 执行成功err为undefined，执行失败err就是错误原因
      callback(err);
    });
  }

  removeFiles(fs, path) {
    try {
      // 读取当前目录下所有文件
      const files = fs.readdirSync(path);

      // 遍历文件，删除
      files.forEach((file) => {
        // 获取文件完整路径
        const filePath = `${path}/${file}`;
        // 分析文件
        const fileStat = fs.statSync(filePath);
        // 判断是否是文件夹
        if (fileStat.isDirectory()) {
          // 是文件夹需要递归遍历删除下面所有文件
          this.removeFiles(fs, filePath);
        } else {
          // 不是文件夹就是文件，直接删除
          fs.unlinkSync(filePath);
        }
      });

      // 最后删除当前目录
      fs.rmdirSync(path);
    } catch (e) {
      // 将产生的错误返回出去
      return e;
    }
  }
}

module.exports = CleanWebpackPlugin;
```
### AnalyzeWebpackPlugin
```javascript
// plugins/analyze-webpack-plugin.js
class AnalyzeWebpackPlugin {
  apply(compiler) {
    // emit是异步串行钩子
    compiler.hooks.emit.tap("AnalyzeWebpackPlugin", (compilation) => {
      // Object.entries将对象变成二维数组。二维数组中第一项值是key，第二项值是value
      const assets = Object.entries(compilation.assets);

      let source = "# 分析打包资源大小 \n| 名称 | 大小 |\n| --- | --- |";

      assets.forEach(([filename, file]) => {
        source += `\n| ${filename} | ${file.size()} |`;
      });

      // 添加资源
      compilation.assets["analyze.md"] = {
        source() {
          return source;
        },
        size() {
          return source.length;
        },
      };
    });
  }
}

module.exports = AnalyzeWebpackPlugin;
```
### InlineRuntimeWebpackPlugin
```javascript
// plugins/inline-chunk-webpack-plugin.js
const HtmlWebpackPlugin = require("safe-require")("html-webpack-plugin");

class InlineChunkWebpackPlugin {
  constructor(tests) {
    this.tests = tests;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap("InlineChunkWebpackPlugin", (compilation) => {
      const hooks = HtmlWebpackPlugin.getHooks(compilation);

      hooks.alterAssetTagGroups.tap("InlineChunkWebpackPlugin", (assets) => {
        assets.headTags = this.getInlineTag(assets.headTags, compilation.assets);
        assets.bodyTags = this.getInlineTag(assets.bodyTags, compilation.assets);
      });

      hooks.afterEmit.tap("InlineChunkHtmlPlugin", () => {
        Object.keys(compilation.assets).forEach((assetName) => {
          if (this.tests.some((test) => assetName.match(test))) {
            delete compilation.assets[assetName];
          }
        });
      });
    });
  }

  getInlineTag(tags, assets) {
    return tags.map((tag) => {
      if (tag.tagName !== "script") return tag;

      const scriptName = tag.attributes.src;

      if (!this.tests.some((test) => scriptName.match(test))) return tag;

      return { tagName: "script", innerHTML: assets[scriptName].source(), closeTag: true };
    });
  }
}

module.exports = InlineChunkWebpackPlugin;

```
