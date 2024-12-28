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
