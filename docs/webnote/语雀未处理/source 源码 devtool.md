[https://webpack.docschina.org/configuration/devtool](https://webpack.docschina.org/configuration/devtool)


### 开发推荐
#### eval    很小
Recommended choice for development builds with maximum performance.
推荐开发打包，有最高的性能，因为输出js很小
只知道文件路径
模块代码放到eval函数中执行并且通过sourse URL标识文件路径，只能定位出错文件不可定位行列
#### eval-source-map   行列
Recommended choice for development builds with high quality SourceMaps.
可定位行列，生产sourse-map
#### eval-cheap-source-map    行
没有map文件  没有按模块分离
阉割版，只可定位到行
只定位行，无列信息。定位的源代码是ES6转化后的源代码
#### eval-cheap-module-source-map   推荐
没有map文件  按模块分离
输出的是不经过loader加工的js
### 生产推荐
#### source-map
Recommended choice for development builds with high quality SourceMaps.
推荐生产打包 ，有高质量map文件
#### (none)
不输出map
#### nosourse-source-map
nosourse-source-map：可以看到错误位置信息，但无源代码
### 

 
![image.png](https://cdn.nlark.com/yuque/0/2022/png/28823371/1671731506384-604cdb77-979e-44a7-b6a0-8f3b8c8ba00c.png#averageHue=%23eeeeee&clientId=udcd8d712-893e-4&from=paste&height=484&id=ubd42110e&originHeight=605&originWidth=1705&originalType=binary&ratio=1&rotation=0&showTitle=false&size=349858&status=done&style=none&taskId=u77e3aa96-fd92-4ea4-981f-c9ac04bcc4f&title=&width=1364)
### 第三方包
#### hidden-source-map
生成souce-map开发第三方包时候使用。生成source-map文件，但没有引用文件
### 
### 全部
| **devtool** | **performance** | **production** | **quality** | **comment** |
| --- | --- | --- | --- | --- |
| (none) | **build**: fastest

**rebuild**: fastest | yes | bundle | Recommended choice for production builds with maximum performance. |
| **eval** | **build**: fast

**rebuild**: fastest | no | generated | Recommended choice for development builds with maximum performance. |
| eval-cheap-source-map | **build**: ok

**rebuild**: fast | no | transformed | Tradeoff choice for development builds. |
| eval-cheap-module-source-map | **build**: slow

**rebuild**: fast | no | original lines | Tradeoff choice for development builds. |
| **eval-source-map** | **build**: slowest

**rebuild**: ok | no | original | Recommended choice for development builds with high quality SourceMaps. |
| cheap-source-map | **build**: ok

**rebuild**: slow | no | transformed |  |
| cheap-module-source-map | **build**: slow

**rebuild**: slow | no | original lines |  |
| **source-map** | **build**: slowest

**rebuild**: slowest | yes | original | Recommended choice for production builds with high quality SourceMaps. |
| inline-cheap-source-map | **build**: ok

**rebuild**: slow | no | transformed |  |
| inline-cheap-module-source-map | **build**: slow

**rebuild**: slow | no | original lines |  |
| inline-source-map | **build**: slowest

**rebuild**: slowest | no | original | Possible choice when publishing a single file |
| eval-nosources-cheap-source-map | **build**: ok

**rebuild**: fast | no | transformed | source code not included |
| eval-nosources-cheap-module-source-map | **build**: slow

**rebuild**: fast | no | original lines | source code not included |
| eval-nosources-source-map | **build**: slowest

**rebuild**: ok | no | original | source code not included |
| inline-nosources-cheap-source-map | **build**: ok

**rebuild**: slow | no | transformed | source code not included |
| inline-nosources-cheap-module-source-map | **build**: slow

**rebuild**: slow | no | original lines | source code not included |
| inline-nosources-source-map | **build**: slowest

**rebuild**: slowest | no | original | source code not included |
| nosources-cheap-source-map | **build**: ok

**rebuild**: slow | no | transformed | source code not included |
| nosources-cheap-module-source-map | **build**: slow

**rebuild**: slow | no | original lines | source code not included |
| nosources-source-map | **build**: slowest

**rebuild**: slowest | yes | original | source code not included |
| hidden-nosources-cheap-source-map | **build**: ok

**rebuild**: slow | no | transformed | no reference, source code not included |
| hidden-nosources-cheap-module-source-map | **build**: slow

**rebuild**: slow | no | original lines | no reference, source code not included |
| hidden-nosources-source-map | **build**: slowest

**rebuild**: slowest | yes | original | no reference, source code not included |
| hidden-cheap-source-map | **build**: ok

**rebuild**: slow | no | transformed | no reference |
| hidden-cheap-module-source-map | **build**: slow

**rebuild**: slow | no | original lines | no reference |
| hidden-source-map | **build**: slowest

**rebuild**: slowest | yes | original | no reference. Possible choice when using SourceMap only for error reporting purposes. |



### 品质说明(quality)
打包后的代码 - 将所有生成的代码视为一大块代码。你看不到相互分离的模块。
生成后的代码 - 每个模块相互分离，并用模块名称进行注释。可以看到 webpack 生成的代码。示例：你会看到类似 var module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42); module__WEBPACK_IMPORTED_MODULE_1__.a();，而不是 import {test} from "module"; test();。
转换过的代码 - 每个模块相互分离，并用模块名称进行注释。可以看到 webpack 转换前、loader 转译后的代码。示例：你会看到类似 import {test} from "module"; var A = function(_test) { ... }(test);，而不是 import {test} from "module"; class A extends test {}。
原始源代码 - 每个模块相互分离，并用模块名称进行注释。你会看到转译之前的代码，正如编写它时。这取决于 loader 支持。
无源代码内容 - source map 中不包含源代码内容。浏览器通常会尝试从 web 服务器或文件系统加载源代码。你必须确保正确设置 [output.devtoolModuleFilenameTemplate](https://webpack.docschina.org/configuration/output/#output-devtoolmodulefilenametemplate)，以匹配源代码的 url。
（仅限行） - source map 被简化为每行一个映射。这通常意味着每个语句只有一个映射（假设你使用这种方式）。这会妨碍你在语句级别上调试执行，也会妨碍你在每行的一些列上设置断点。与压缩后的代码组合后，映射关系是不可能实现的，因为压缩工具通常只会输出一行。
### 对于开发环境
以下选项非常适合开发环境：
eval - 每个模块都使用 eval() 执行，并且都有 //# sourceURL。此选项会非常快地构建。主要缺点是，由于会映射到转换后的代码，而不是映射到原始代码（没有从 loader 中获取 source map），所以不能正确的显示行数。
eval-source-map - 每个模块使用 eval() 执行，并且 source map 转换为 DataUrl 后添加到 eval() 中。初始化 source map 时比较慢，但是会在重新构建时提供比较快的速度，并且生成实际的文件。行数能够正确映射，因为会映射到原始代码中。它会生成用于开发环境的最佳品质的 source map。
eval-cheap-source-map - 类似 eval-source-map，每个模块使用 eval() 执行。这是 "cheap(低开销)" 的 source map，因为它没有生成列映射(column mapping)，只是映射行数。它会忽略源自 loader 的 source map，并且仅显示转译后的代码，就像 eval devtool。
eval-cheap-module-source-map - 类似 eval-cheap-source-map，并且，在这种情况下，源自 loader 的 source map 会得到更好的处理结果。然而，loader source map 会被简化为每行一个映射(mapping)。
### 特定场景
以下选项对于开发环境和生产环境并不理想。他们是一些特定场景下需要的，例如，针对一些第三方工具。
inline-source-map - source map 转换为 DataUrl 后添加到 bundle 中。
cheap-source-map - 没有列映射(column mapping)的 source map，忽略 loader source map。
inline-cheap-source-map - 类似 cheap-source-map，但是 source map 转换为 DataUrl 后添加到 bundle 中。
cheap-module-source-map - 没有列映射(column mapping)的 source map，将 loader source map 简化为每行一个映射(mapping)。
inline-cheap-module-source-map - 类似 cheap-module-source-map，但是 source mapp 转换为 DataUrl 添加到 bundle 中。
### 对于生产环境
这些选项通常用于生产环境中：
(none)（省略 devtool 选项） - 不生成 source map。这是一个不错的选择。
source-map - 整个 source map 作为一个单独的文件生成。它为 bundle 添加了一个引用注释，以便开发工具知道在哪里可以找到它。
