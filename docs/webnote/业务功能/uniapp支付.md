# uniapp支付



## 支付宝 当面付



```javascript
// 后台返回付款二维码
var url = res.data.data;
that.alipayUrl = "alipays://platformapi/startapp?appId=20000067&url=" + encodeURI(url);

that.codeImg = that.$API.qrCode() + "?codeContent=" + url;
// 可以img展示codeImg

// 也可以跳转应用支付
toPay()
function toPay(){
    var that = this;
    var url = that.alipayUrl;
    // #ifdef APP-PLUS
    plus.runtime.openURL(url)
    // #endif
    // #ifdef H5
    window.open(url)
    // #endif
}
```

## 微信支付

```javascript
后台返回付款二维码
var url = res.data.data.data;
that.wxpayUrl = url;
that.codeImg = that.$API.qrCode() + "?codeContent=" + url;


toPay()
function toPay(){
    var that = this;
 	var url = that.wxpayUrl;
    // #ifdef APP-PLUS
    plus.runtime.openURL(url)
    // #endif
    // #ifdef H5
    window.open(url)
    // #endif
    // #ifdef MP
    that.dtImg();
    // #endif
}

dtImg() {
    var that = this;
    var url = that.codeImg;
    // #ifdef APP-PLUS
    uni.downloadFile({
        url: url,
        success: (res) => {
            if (res.statusCode === 200) {
                uni.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: function() {
                        if (that.payType == 1) {
                            uni.showToast({
                                title: "图片已保存，微信不支持相册识别支付，请通过正常扫码完成。",
                                icon: "none"
                            });
                        } else {
                            uni.showToast({
                                title: "保存成功",
                                icon: "none"
                            });
                        }

                    },
                    fail: function() {
                        uni.showToast({
                            title: "保存失败，请稍后重试",
                            icon: "none"
                        });
                    }
                });
            }
        }
    })
    // #endif
    
    // #ifdef H5
    uni.showToast({
        title: "请长按二维码图片保存",
        icon: "none"
    });
    // #endif
},
```

