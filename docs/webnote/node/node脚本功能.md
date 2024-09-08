# 脚本

## 当行打印

### single-line-log

``` js
const log = require('single-line-log').stdout
log(1)
log(2)
```

### ora

有loading

commonjs "ora": "^5.4.1"

esm 6及以上

- `spinner.stop()`：停止 Spinner 动画。
- `spinner.clear()`：清除 Spinner 输出。
- `spinner.frame()`：手动更新 Spinner 帧。
- `spinner.color = '...'`：设置 Spinner 的颜色。（loading的）

``` js
const ora = require('ora');

const spinner = ora('表哥我来咯').start();

function log (text){
  spinner.text = text
}

log('step 1')
log('step 2')

spinner.succeed();
```

## 彩色打印

### chalk

unpackedSize: 43.7 kB

### picocolors

unpackedSize: 11.4 kB
