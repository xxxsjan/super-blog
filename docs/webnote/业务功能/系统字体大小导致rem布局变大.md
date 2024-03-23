
```typescript
(function (doc, win) {
  
  var isAndroid = win.navigator.appVersion.match(/android/gi);
  var isIPhone = win.navigator.appVersion.match(/iphone/gi);
  
  var scale = 1.0;
  var ratio = 1;
  if(isIPhone) {
    if (window.devicePixelRatio == 2) {
      scale *= 0.5;
      ratio *= 2;
    }
    if (window.devicePixelRatio == 3) {
      scale *= (1/3);
      ratio *= 3;
    }
  }
  var text = '<meta name="viewport" content="initial-scale=' + scale + ', maximum-scale=' + scale + ',' + ' minimum-scale=' + scale + ', width=device-width,' + ' user-scalable=no" />';
  document.write(text);
  
  var docEl = doc.documentElement
  var resizeEvt = 'orientationchange' in window 
  ? 'orientationchange' 
  : 'resize'
  var recalc = function () {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) return
    docEl.style.fontSize = 100 * (clientWidth / 750)  + 'px'
    
    // 解决部分rem特别大的问题
    var nowFontSize = docEl.style.fontSize.replace(/px/gi, '')
    var beforeFontSize = win.getComputedStyle(docEl)['font-size'].replace(/px/gi, '')
    if(nowFontSize != beforeFontSize){
      docEl.style.fontSize = nowFontSize * nowFontSize / beforeFontSize + 'px'
    }
  }
  if (!doc.addEventListener) return
  recalc()
  win.addEventListener(resizeEvt, recalc, false)
	})(document, window);
```

```typescript

(function (doc, win) {
  var remFull = 3.75 // 3.75rem全屏
  var docEl = doc.documentElement
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  var recalc = function () {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) return;

    var fontSize = clientWidth / (remFull * 100) * 100
    docEl.style.fontSize = fontSize + 'px'

    var eDivWidth = 0
    var eDiv = document.createElement('div')

    eDiv.style.width = remFull + 'rem'
    eDiv.style.height = '1px'
    eDiv.style.position = 'fixed'
    eDiv.style.boxSizing = 'border-box'
    document.body.appendChild(eDiv)
    eDivWidth = eDiv.clientWidth

    if (clientWidth !== eDivWidth) {
      var timer = setInterval((function () {
        clientWidth = docEl.clientWidth
        eDivWidth = eDiv.clientWidth

        if (clientWidth !== eDivWidth) {
          docEl.style.fontSize = fontSize * (clientWidth / eDivWidth) + 'px'
        } else {
          clearInterval(timer)
          document.body.removeChild(eDiv)
        }
        return arguments.callee
      })(), 100)
    } else {
      document.body.removeChild(eDiv)
    }
  };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window);
```
