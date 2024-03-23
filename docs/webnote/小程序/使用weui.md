### 安装
使用useExtendedLib安装
```typescript
  "useExtendedLib": {
    "weui": true
  }
```
或者使用npm

### 使用
```typescript
// app.json
{
  "usingComponents": {
    "mp-dialog": "weui-miniprogram/dialog/dialog"
  }
}
// xxx.wxml
<mp-dialog title="test" 
  show="{{true}}" 
  bindbuttontap="tapDialogButton" 
  buttons="{{buttons}}"
>
    <view>test content</view>
</mp-dialog>
// xxx.js
Page({
    data: {
        buttons: [
        	{ text: '取消' },
        	{ text: '确认' }
        ]
    }
})
```
