
```javascript
// 获取Uint8ClampedArray 数据，他是个类数组
const arr = this.ctx.getImageData(
  0,
  0,
  this.canvas.width,
  this.canvas.height
).data;
// 某个地方你有色彩数据，这里模拟色彩数据来源于上面
const arr2 = [];
for (let i = 0; i < arr.length; i++) {
  arr2[i] = arr[i];
}

let data = new Uint8Array(arr2);
console.log("data: ", data);

// 转blob
let blob = new Blob([data], { type: "image/jpeg" });

data = null;// 防止内存泄漏
```

### url-- blob
```javascript
fetch("/img/img0.jpg").then((res) => res.blob())
```

## file-->[base64](https://so.csdn.net/so/search?q=base64&spm=1001.2101.3001.7020)
#### window.URL.createObjectURL
```javascript

	window.onload = function () {
		let $img = document.getElementById('img')
		file.onchange = function (e) {
			console.log(e.target.files[0])
			let file = e.target.files[0]
			let fileUrl = window.URL.createObjectURL(file)
			$img.src = fileUrl
			img.onload = function () {
			    // 手动回收
			    URL.revokeObjectURL(fileUrl)
			}
		}
	}

```
#### FileReader.readAsDataURL()
```javascript

	window.onload = function () {
		let $img = document.getElementById('img')
		file.onchange = function (e) {
			console.log(e.target.files[0])
			let file = e.target.files[0]
			const fr = new FileReader(file)
			fr.readAsDataURL(file)
			fr.onload = function () {
			 	$img.src = this.result
			}
		}
  }
```
## [canvas](https://so.csdn.net/so/search?q=canvas&spm=1001.2101.3001.7020) -->DataURL
```javascript
let imgSrc = canvas.toDataURL('image/png')
// canvas.toDataURL('image/jpeg')
```
## canvas-->blob对象
```javascript
canvas.toBlob(function (blobObj) {
	console.log(blobObj)
})
```

## img显示blob
```javascript
canvas.toBlob(function (blobObj) {
    var img = document.getElementById('img')
    img.onload = function(e) {
      window.URL.revokeObjectURL(img.src); 
    };
    img.src = window.URL.createObjectURL(blobUrl);
})
```


## 数组--img
```javascript
var arry = [
  -1, -40, -1, -32, 0, 16, 74, 70, 73, 70, 0, 1, 2, 0, 0, 1, 0, 1,
  0, 0, -1, -37, 0, 67, 0, 8, 6, 6, 7, 6, 5, 8, 7, 7, 7, 9, 9, 8,
  10, 12, 20, 13, 12, 11, 11, 12, 25, 18, 19, 15, 20, 29, 26, 31,
  30, 29, 26, 28, 28, 32, 36, 46, 39, 32, 34, 44, 35, 28, 28, 40,
  55, 41, 44, 48, 49, 52, 52, 52, 31, 39, 57, 61, 56, 50, 60, 46,
  51, 52, 50, -1, -37, 0, 67, 1, 9, 9, 9, 12, 11, 12, 24, 13, 13,
  24, 50, 33, 28, 33, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
  50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
  50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
  50, 50, 50, 50, 50, 50, 50, -1, -64, 0, 17, 8, 0, 26, 0, 80, 3, 1,
  34, 0, 2, 17, 1, 3, 17, 1, -1, -60, 0, 31, 0, 0, 1, 5, 1, 1, 1, 1,
  1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
  -1, -60, 0, -75, 16, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1,
  125, 1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34,
  113, 20, 50, -127, -111, -95, 8, 35, 66, -79, -63, 21, 82, -47,
  -16, 36, 51, 98, 114, -126, 9, 10, 22, 23, 24, 25, 26, 37, 38, 39,
  40, 41, 42, 52, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72,
  73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103,
  104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, -125, -124,
  -123, -122, -121, -120, -119, -118, -110, -109, -108, -107, -106,
  -105, -104, -103, -102, -94, -93, -92, -91, -90, -89, -88, -87,
  -86, -78, -77, -76, -75, -74, -73, -72, -71, -70, -62, -61, -60,
  -59, -58, -57, -56, -55, -54, -46, -45, -44, -43, -42, -41, -40,
  -39, -38, -31, -30, -29, -28, -27, -26, -25, -24, -23, -22, -15,
  -14, -13, -12, -11, -10, -9, -8, -7, -6, -1, -60, 0, 31, 1, 0, 3,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7,
  8, 9, 10, 11, -1, -60, 0, -75, 17, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5,
  4, 4, 0, 1, 2, 119, 0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81,
  7, 97, 113, 19, 34, 50, -127, 8, 20, 66, -111, -95, -79, -63, 9,
  35, 51, 82, -16, 21, 98, 114, -47, 10, 22, 36, 52, -31, 37, -15,
  23, 24, 25, 26, 38, 39, 40, 41, 42, 53, 54, 55, 56, 57, 58, 67,
  68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99,
  100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120,
  121, 122, -126, -125, -124, -123, -122, -121, -120, -119, -118,
  -110, -109, -108, -107, -106, -105, -104, -103, -102, -94, -93,
  -92, -91, -90, -89, -88, -87, -86, -78, -77, -76, -75, -74, -73,
  -72, -71, -70, -62, -61, -60, -59, -58, -57, -56, -55, -54, -46,
  -45, -44, -43, -42, -41, -40, -39, -38, -30, -29, -28, -27, -26,
  -25, -24, -23, -22, -14, -13, -12, -11, -10, -9, -8, -7, -6, -1,
  -38, 0, 12, 3, 1, 0, 2, 17, 3, 17, 0, 63, 0, -9, -6, 40, -94,
  -128, 25, 28, -79, -52, -91, -94, -111, 93, 67, 50, -110, -89, 35,
  32, -112, 71, -44, 16, 65, -9, 20, -6, -55, -16, -25, -4, -125,
  38, -1, 0, -81, -5, -49, -3, 41, -106, -99, -81, -53, 36, 90, 88,
  -14, -92, 104, -52, -73, 54, -16, -77, 33, -38, -37, 30, 100, 70,
  0, -114, 65, 42, -60, 100, 114, 58, -126, 13, 79, 55, -69, -52,
  110, -24, -2, -1, 0, -40, -89, -42, -33, -115, -117, 48, 106, -70,
  117, -43, -28, -74, 118, -9, -10, -77, 93, 69, -97, 50, 24, -26,
  86, 116, -63, -63, -54, -125, -111, -125, -59, 88, -110, 88, -31,
  80, -46, -56, -88, -91, -107, 65, 99, -127, -110, 64, 3, -22, 73,
  0, 123, -102, -55, -15, 12, 81, -38, 120, 90, -14, 91, 104, -42,
  23, -80, -74, 121, -83, 12, 99, 111, -110, -24, -121, 105, 80, 58,
  14, -40, -24, 65, 32, -126, 9, 20, -1, 0, 17, -1, 0, -56, 50, 31,
  -6, -1, 0, -77, -1, 0, -46, -104, -87, 57, 52, -99, -6, 23, 26,
  48, -100, -95, -53, -76, -99, -65, 47, -13, 52, -28, -106, 56, 84,
  52, -78, 42, 41, 101, 80, 88, -32, 100, -112, 0, -6, -110, 64, 30,
  -26, -97, 89, 62, 35, -1, 0, -112, 100, 63, -11, -1, 0, 103, -1,
  0, -91, 49, 86, -75, 85, -11, -79, -117, -123, -87, -87, -9, 109,
  125, -42, -1, 0, 48, -94, -118, 41, -103, -123, 20, 81, 64, 24,
  -47, -24, 51, 64, 101, 22, -38, -26, -93, 4, 82, 77, 36, -34, 82,
  45, -71, 85, 46, -27, -37, 5, -94, 39, 25, 99, -44, -102, -42,
  -106, 40, -25, -123, -31, -102, 53, -110, 41, 20, -85, -93, -116,
  -85, 3, -63, 4, 30, -94, -97, 69, 74, -118, 91, 26, 78, -84, -26,
  -17, 45, -3, 18, -4, -116, -72, -76, 80, -77, 33, -97, 80, -68,
  -69, -126, 38, 13, 21, -67, -61, 35, 34, 17, -9, 73, 33, 67, 57,
  94, -37, -39, -71, -61, 28, -80, 4, 94, -70, -75, -122, -14, -35,
  -32, -99, 55, 70, -40, -56, -55, 4, 16, 114, 8, 35, -112, 65, 0,
  -126, 57, 4, 2, 57, -87, -88, -90, -94, -106, -127, 42, -77, -109,
  82, 111, 85, -14, 50, -30, -47, -33, -50, 71, -68, -44, -17, 47,
  -110, 54, 14, -111, 92, 8, -126, 7, 28, -122, 33, 17, 114, 71, 81,
  -100, -128, 112, 113, -112, 8, -44, -94, -118, 18, 72, 83, -87,
  41, -17, -2, 95, -112, 81, 69, 20, -56, 63, -1, -39,
];
let base64Str = arrayBufferToBase64(arry)
this.imgSrc = "data:image/png;base64," + base64Str;

function arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
```

## a标签下载
```javascript
// 下载文件
function createObjectURL(data, type = "application/octet-stream") {
  const blob = new Blob([data], { type, });
  return window.URL.createObjectURL(blob);
}
function linkDownLoad(data, filename = "文件下载") {
  if ("msSaveOrOpenBlob" in navigator) {
    window.navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    const blobURL = createObjectURL(data);
    const link = document.createElement("a");
    link.href = blobURL;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(blobURL);
  }
}
```
## blob to file
[File](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 接口基于 Blob，继承了 blob 的功能并将其扩展以支持用户系统上的文件。
```javascript
const file = new File([blob],filename,{
  type:"image/jpeg"
})
```


## File to ArrayBuffer
利用 FileReader  readAsArrayBuffer
```javascript
function fileToArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.onerror = (event) => {
      reject(event.target.error);
    };
    reader.readAsArrayBuffer(file);
  });
}
```



## 下载文件

### iframe

```
console.log(record，'rec')

var elemIF = document.createElement( iframe')

elemIF.style.display = 'none'

elemIF.src = process.env.VUE APP API BASE URL + /oamat/bus0amatMain/fileDownById?id=' + record.fileUpload

document.body.appendchild(elemIF)
```

### fetch下载blob

```
fetch(url).then(res=>res.blob()).then(blob=>{
	 
	const url = URL.createObjectURL(res.data)
	const box = document.createElement('a')
        box.download = '附件.pdf'
        box.href = href
        box.click()
})
```

