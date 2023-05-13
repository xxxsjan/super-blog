### contextBridge
```json
// contextIsolation 需要设置为true
contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // 能暴露的不仅仅是函数，我们还可以暴露变量
});
```
### request
[https://blog.csdn.net/weixin_41568995/article/details/120352394](https://blog.csdn.net/weixin_41568995/article/details/120352394)
由于require可以直接请求运行客户机上的文件，容易引起安全问题，而在新的[electron](https://so.csdn.net/so/search?q=electron&spm=1001.2101.3001.7020)中被禁止，所以在contextIsolation为true时认为require不可以启用
如果想要使用require，则不应该使用contextBridge API
```json
//修改前
const { contextBridge, ipcRenderer } = require('electron')
const path = require('path')
 
contextBridge.exposeInMainWorld('electron', {
  startDrag: (fileName) => {
    ipcRenderer.send('ondragstart', path.join(process.cwd(), fileName))
  }
})
 
//修改后
 
//preload.js
const { ipcRenderer }  = require('electron')
const path = require('path')
function startDrag(fileName) {
  ipcRenderer.send('ondragstart', path.join(process.cwd(), fileName))
}
document.getElementById('drag').ondragstart = (event) => {
  event.preventDefault()
  startDrag('./img/img.jpeg');
}
```
## 打开文件夹
```javascript
const { ipcRenderer } = require('electron')
const openCacheFolder = async () => {
  await ipcRenderer.invoke('OPEN_CACHE_FOLDER')
}

// 
const { ipcMain, shell } = require('electron')
ipcMain.handle('OPEN_CACHE_FOLDER', () => {
  if (cacheFolder) {
    shell.openPath(cacheFolder)
  }
})
```
