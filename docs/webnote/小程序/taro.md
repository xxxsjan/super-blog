# taro

## rpx问题

```
import Taro from '@tarojs/taro';

const systemInfo = Taro.getSystemInfoSync();
```

在移动设备中，有三种不同的像素概念：物理像素、逻辑像素和设备独立像素。它们之间的关系如下：

- 物理像素：是显示设备中最小的物理显示单元，是屏幕上显示图像的基本单位。不同设备的物理像素数量和分辨率不同，通常用像素密度（PPI）描述。
- 逻辑像素：是指在开发中使用的像素单位，也称为 CSS 像素。在 Taro 中，`rpx` 就是相对于屏幕宽度的 `1/750` 的逻辑像素。在不同设备上，逻辑像素代表的实际物理像素数量不同，因此可以实现适配不同设备的效果。
- 设备独立像素：是指设备显示的图像大小，通常用设备像素比（DPR）来描述。设备独立像素的概念是为了解决不同分辨率的屏幕上显示相同大小的图像而提出的。在高分辨率的设备上，设备独立像素比物理像素数量更多，因此可以显示更多的内容和细节。例如，在一个 2x 设备独立像素的设备上，每个设备独立像素会对应 2 个物理像素。

在 Taro 中，使用 `rpx` 可以方便地实现适配不同设备的效果。具体来说，`rpx` 是相对于屏幕宽度的 `1/750` 的逻辑像素，可以根据不同设备的屏幕宽度自适应调整实际的物理像素数量，从而实现屏幕适配的效果。

例如，假设在一个 750px 宽度的设计稿中，一个元素的宽度为 100px。如果您希望在一个 375px 宽度的设备上显示该元素，可以将它的宽度设置为 `200rpx`。在设备上，该 `200rpx` 会被转换为相应的物理像素数量，以适应设备的屏幕宽度。

总的来说，物理像素、逻辑像素和设备独立像素是移动设备中的三种不同的像素概念。在 Taro 中，使用 `rpx` 可以方便地实现适配不同设备的效果，`rpx` 是相对于屏幕宽度的 `1/750` 的逻辑像素，可以根据不同设备的屏幕宽度自适应调整实际的物理像素数量，从而实现屏幕适配的效果。

devicePixelRatio 为2

750rpx => 375px

转换公式

750rpx / css像素（px screenWidth） =  结果rpx /实际px

```javascript
function pxToRpx(px){
  return (750 / screenWidth ) * px
}
// 例子
function getScrollHeight() {
    const { screenWidth, windowHeight } = getSystemInfoSync();
    return (750 / screenWidth) * windowHeight + "rpx";
}
const scrollStyle = {
    height: getScrollHeight(),
};

// 其他：pxTransform
import {  pxTransform } from "@tarojs/taro";
pxTransform(windowHeight)
乘上devicePixelRatio 才等于上面的计算结果
```

# taro

## placeholderStyle 不生效

```jsx
 <AtInput
    name="name"
    title="报名人姓名:"
    type="text"
    placeholder="请输入报名人姓名"
    placeholderStyle="font-size:28rpx;"
    placeholderClass="vote-input-placeholder"
/>

.vote-input-placeholder {
  font-size: 28rpx !important;
}

```

## 路径问题注意

项目文件都得放在src目录下，比如不能把public放根目录

不然如果tabbar配置的png路径文件是在src之上的，目录，会导致输出png文件不成功

taro中public文件夹不是vue那种概念，不会原封不动移动的到输出目录

代码的根目录最多到src这一层

## 选择元素

```js

Taro.createSelectorQuery()
  .select('.box1')
  .boundingClientRect()
  .select('.box2')
  .boundingClientRect()
  .selectAll('.items')
  .boundingClientRect()
  .exec(res=>{
    const [box1,box2,items] = res
  })

```

## 电脑版预览不了base64

```js
  const previewImage = (base64: string) => {
    const filepath = Taro.env.USER_DATA_PATH + '/test.png'
    console.log('filepath: ', filepath)
    const fs = Taro.getFileSystemManager()
    fs.writeFile({
      filePath: filepath,
      data: base64,
      encoding: 'base64',
      success: function (res) {
        console.log(res)
        Taro.previewImage({
          current: 0,
          urls: [filepath]
        })
      },
      fail: function (res){
        console.log('res: ', res)
      }
    })
  }
```

## 新版本

```ts
  useDidShow(()=>{
    if (Taro.canIUse('getUpdateManager')) {
      const updateManager = Taro.getUpdateManager()
      updateManager && updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            Taro.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (ress) {
                if (ress.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            Taro.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    }
  })
```

## 拦截复制

```ts
Taro.onCopyUrl(()=>{
      const pages = Taro.getCurrentPages()
      const page = pages[pages.length - 1]
      const options = page.options
      const url = page.route
      const canCopyPage = ['pages/userDetail/index', 'pages/communityDetail/index']
      if (!url || !canCopyPage.includes(url) || !options.id){
        setTimeout(()=>{
          Taro.setClipboardData({
            data: '#小程序://name/wMR05laW9GDpKlg'
          })
        }, 500)
      } else {
        return {query: 'id=' + options.id}
      }
})
```
