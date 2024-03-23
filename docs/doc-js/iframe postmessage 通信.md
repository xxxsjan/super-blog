### 原生使用
#### 父 html
```html
<h1>parent</h1>
<button id="btn">获取iframe信息</button>
<iframe src="./child.html" id="iframe1"></iframe>

<script>
  iframe1.onload = () => {
    window.addEventListener("message", evt => {
      const { type, data } = evt.data
      if (type === 'getUserInfo') {
        iframe1.contentWindow.postMessage({
          type: 'getUserInfo',
          data: {
            id: 1,
            name: '小明',
            phone: '19999999999'
          }
        }, iframe1.src)
      } else if (type === 'getMore') {
        console.log(data)
      }
    }, false)
    document.getElementById('btn').onclick = () => {
      iframe1.contentWindow.postMessage({
        type: 'getMore',
        data: {
          a: 1
        }
      }, iframe1.src)
    }
    iframe1.contentWindow.postMessage({
      type: 'sendUrl',
      data: location.href
    }, iframe1.src)
  }
</script>
```
#### iframe html
```html
<h1>child(iframe)</h1>
<button id="btnUser">获取用户信息</button>

<script>
  let parentPath = ''
  document.getElementById('btnUser').onclick = () => {
    window.parent.postMessage({
      type: 'getUserInfo'
    }, parentPath)
  }
  window.addEventListener("message", evt => {
    const { type, data } = evt.data
    if (type === 'getUserInfo') {
      console.log(data)
    } else if (type === 'sendUrl') {
      parentPath = data
    } else if (type === 'getMore') {
      window.parent.postMessage({
        type: 'getMore',
        data: {
          name: 'abc',
          ...data
        }
      }, parentPath)
    }
  }, false)
</script>
```
### 封装PostMessage
#### PostMessage
connect
--传入的是其他端window，没有传入就是顶层
--添加message监听
--监听获取数据， 
--
```javascript
class PostMessage {
  callList = []
  parentPath = ''
  postParentList = []
  postIframeList = []
  ifr = null
  openWin = null
  openUrl = ''
  constructor() {}
  connect(pt) {
    this.pt = pt
    return new Promise((resolve, reject) => {
      window.addEventListener(
        'message',
        (evt) => {
          const { type, data } = evt.data
          this.callList
            .filter((v) => v.name === type)
            .forEach((v) => {
              this.pt.postMessage(
                {
                  type: v.name,
                  data: v.call(data)
                },
                this.parentPath
              )
            })
          this.postParentList
            .filter((v) => v.name === type)
            .forEach((v) => {
              v.resolve(data)
              this.postParentList.splice(
                this.postParentList.indexOf(v),
                1
              )
            })
          if (top !== window && type === 'sendUrl') {
            this.parentPath = data
            resolve(this)
          }
        },
        false
      )
      if (top === window) {
        this.parentPath = pt.location.href
        resolve(this)
      }
    })
  }
  postParent(name, params) {
    return new Promise((resolve) => {
      this.postParentList.push({
        name,
        resolve
      })

      this.pt.postMessage(
        {
          type: name,
          data: params
        },
        this.parentPath
      )
    })
  }
  postIframe(name, params) {
    return new Promise((resolve) => {
      this.postIframeList.push({
        name,
        resolve
      })
      this.openWin.postMessage(
        {
          type: name,
          data: params
        },
        this.openUrl
      )
    })
  }
  create(ifr) {
    this.ifr = ifr
    return new Promise((resolve) => {
      ifr.addEventListener('load', (e) => {
        this.openWin = ifr.contentWindow ? ifr.contentWindow : ifr
        this.openUrl = ifr.src || ifr.location.href
        this.openWin.postMessage(
          {
            type: 'sendUrl',
            data: location.href
          },
          this.openUrl
        )
        resolve(this)
      })
      window.addEventListener(
        'message',
        (evt) => {
          const { type, data } = evt.data
          this.postIframeList
            .filter((v) => v.name === type)
            .forEach((v) => {
              v.resolve(data)
              this.postIframeList.splice(
                this.postIframeList.indexOf(v),
                1
              )
            })
          for (const n of this.callList) {
            if (type === n.name) {
              this.openWin.postMessage(
                {
                  type: n.name,
                  data: n.call(data)
                },
                this.openUrl
              )
            }
          }
        },
        false
      )
    })
  }
  register(path, call) {
    this.callList.push({
      name: path,
      call: call
    })
  }
}

```
#### 使用
##### 父 html
```html
<h1>parent</h1>
<button id="btn">获取iframe信息</button>
<iframe src="./child.html" id="iframe1"></iframe>

<script>
  const iframe1 = document.getElementById('iframe1')
  new PostMessage().create(iframe1).then((sdk) => {
    sdk.register('getUserInfo', () => {
      return {
        id: 1,
        name: '小明',
        phone: '19999999999'
      }
    })
    document.getElementById('btn').onclick = () => {
      sdk.postIframe('getMore', { a: 1 }).then((res) => {
        console.log(res)
      })
    }
  })
</script>
```
##### iframe html
```html
<h1>child(iframe)</h1>
<button id="btnUser">获取用户信息</button>

<script>
  new PostMessage().connect(window.parent).then((sdk) => {
    document.getElementById('btnUser').onclick = () => {
      sdk.postParent('getUserInfo', {}).then((res) => {
        console.log(res)
      })
    }
    sdk.register('getMore', (data) => {
      return {
        name: 'abc',
        ...data
      }
    })
  })
</script>
```

### window.opener
opener 属性是一个可读可写的属性，可返回对创建该窗口的 Window 对象的引用。
当使用window.open()打开一个窗口，您可以使用此属性返回来自目标窗口源（父）窗口的详细信息。
**代码提示：** window.opener.close()将关闭源（父）窗口。
```html
// page1
function openPage() {
			const win = open('./42-2.html')
			new PostMessage().create(win).then((sdk) => {
				sdk.register('tabData', (res) => {
					console.log('tabData', res)
					return {
						name: 'abc'
					}
				})
			})
		}
// page2 open from page1
new PostMessage().connect(window.opener).then((sdk) => {
			document.getElementById('btn').onclick = () => {
				sdk.postParent('tabData', { name: 'tabData' }).then((res) => {
					console.log(res)
})
}
})
```
