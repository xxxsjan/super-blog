# mock

[https://www.jianshu.com/p/9dbcfbe6130f](https://www.jianshu.com/p/9dbcfbe6130f?u_atoken=0ad9cf09-6138-4f12-9aa2-016a2b6422b1&u_asession=01QKtLi7XaTR8sV6bd2zH_mSFR8dldqBr17lL_LpmUwcPph_UiMGYh9XNJSjWuLeFjX0KNBwm7Lovlpxjd_P_q4JsKWYrT3W_NKPr8w6oU7K82H7W-gRB2uVzRcTVOxhq3S_nntv0fnCqKMMYW1x5qJGBkFo3NEHBv0PZUm6pbxQU&u_asig=05sHdBXTZ7VekS4TXLgy4GKlm5Wr45-K2smKdSP6Kw0mQtTpDWrF_0sMT5N-16KtFGcXiUNeIMBjhzOJWR0NnwbmQQXedp4KomvosxwdBHsNek0phYHeFv-lEn3P-OpwsDDiEKkmHds6aJFqIMNRRRetebuzf9y6bxTRppaBrPv-X9JS7q8ZD7Xtz2Ly-b0kmuyAKRFSVJkkdwVUnyHAIJzVk7F9-fc9N-c4UzjGSXHP2DkdVpfrSkEeSrRwDPSxFo4Nx7nJyT20ni5onZOBbfUe3h9VXwMyh6PgyDIVSG1W-pHlEAMr8yjK0x9rZ_uuGmXXwYrQ7UmDpPwLk9dRSUBcVfVN24ztOcq9Yi_vMpFWKhtBN_7gw7KVHaR_5X_UfqmWspDxyAEEo4kbsryBKb9Q&u_aref=3OQ8efVJ0B8iVxjtXeqJ9ak3sIc%3D)

基本使用

```javascript
var Mock = require("mockjs");
var list = Mock.mock({
  "list|1-10": [
    { "id|+1": 1, 
     email: "@email" 
    }
  ],
  });
```

邮箱

```javascript
var Random = Mock.Random;
Random.email()
Mock.mock("@email")
Mock.mock({email:"@email"})
```

Mock.Random 提供的完整方法（占位符）如下：

| **Type**      | **Method**                                                   |
| ------------- | ------------------------------------------------------------ |
| Basic         | boolean, natural, integer, float, character, string, range, date, time, datetime, now |
| Image         | image, dataImage                                             |
| Color         | color                                                        |
| Text          | paragraph, sentence, word, title, cparagraph, csentence, cword, ctitle |
| Name          | first, last, name, cfirst, clast, cname                      |
| Web           | url, domain, email, ip, tld                                  |
| Address       | area, region                                                 |
| Helper        | capitalize, upper, lower, pick, shuffle                      |
| Miscellaneous | guid, id                                                     |

用右边的就行

```javascript
Random.boolean()
Random.natural()

Mock.mock("@boolean")
Mock.mock("@natural")
```

自定义

```javascript
Random.extend({
    constellation: function(date) {
        var constellations = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
        return this.pick(constellations)
    }
})
Random.constellation()
// => "水瓶座"
Mock.mock('@CONSTELLATION')
// => "天蝎座"
Mock.mock({
    constellation: '@CONSTELLATION'
})
// => { constellation: "射手座" }
```





# mock模拟数据

https://www.jianshu.com/p/c5568910e946

## 自动引入

mock文件夹-index.js

自动遍历引入index以外的js文件

```plain
// 首先引入Mock
const Mock = require('mockjs');

// 设置拦截ajax请求的相应时间
Mock.setup({
    timeout: '200-600'
});

let configArray = [];

// 使用webpack的require.context()遍历所有mock文件
const files = require.context('.', true, /\.js$/);
files.keys().forEach((key) => {
    if (key === './index.js') return;
    configArray = configArray.concat(files(key).default);
});

// 注册所有的mock服务
configArray.forEach((item) => {
    for (let [path, target] of Object.entries(item)) {
        let protocol = path.split('|');
        // Mock.mock(url,type,{}|fn)
        Mock.mock(new RegExp('^' + protocol[1]), protocol[0], target);
    }
});
```



test.js

```plain
let demoList = [{
    id: 1,
    name: 'zs',
    age: '23',
    job: '前端工程师'
}, {
    id: 2,
    name: 'ww',
    age: '24',
    job: '后端工程师'
}]

export default {
    'get|/parameter/query': option => {
        return {
            status: 200,
            message: 'success',
            data: demoList
        };
    }
}
```



main.js引入，或者组件里引入

```plain
require('./mock');
```

## 手动引入

mockdemo.js

```plain
const Mock = require('mockjs');
let demoList = [{
    id: 1,
    name: 'zs',
    age: '23',
    job: '前端工程师'
}, {
    id: 2,
    name: 'ww',
    age: '24',
    job: '后端工程师'
}]
export default {
    'get|/parameter/query': demoList
}
Mock.mock('/parameter/query', 'get', {
    status: 200,
    message: 'success',
    data: demoList
})
```



页面引入

```plain
require('./mockdemo.js')
```