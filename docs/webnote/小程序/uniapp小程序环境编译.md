# 编译环境

## 支付传参不一样

在使用uniapp开发小程序时，可以使用条件编译来解决支付传参不一样的情况。条件编译是指根据不同的平台或条件来编写不同的代码。

具体来说，对于支付宝和微信支付传参不同的情况，可以使用如下代码：

```javascript
if(uni.getSystemInfoSync().platform === 'android') {
  // 支付宝支付
  #ifdef APP-PLUS
  uni.requestPayment(aliPayParams)
  #endif

  // 微信支付
  #ifdef MP-WEIXIN
  uni.requestPayment(wxPayParams)
  #endif
} else if(uni.getSystemInfoSync().platform === 'ios') {
  // 支付宝支付
  #ifdef APP-PLUS
  uni.requestPayment(aliPayParams)
  #endif

  // 微信支付
  #ifdef MP-WEIXIN
  uni.requestPayment(wxPayParams)
  #endif
}
```

在这段代码中，我们首先根据`uni.getSystemInfoSync().platform`来判断当前平台是安卓还是iOS，然后根据当前平台选择不同的支付参数进行支付。