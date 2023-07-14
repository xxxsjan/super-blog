# 垃圾回收
- 在Node中通过JavaScript使用内存时就会发现只能使用部分内存（64位系统下约为1.4 GB,32位系统下约为0.7 GB）。
- 垃圾回收的3种基本算法都需要将应用逻辑暂停下来，待执行完垃圾回收后再恢复执行应用逻辑，这种行为被称为“全停顿”（stop-the-world）
- 通过在Node启动时使用--prof参数，可以得到V8执行时的性能分析数据，其中包含了垃圾回收执行时占用的时间。
# 内存泄漏排查工具
## heapdump
npm install heapdump
## memwatch
npm install menwatch
```javascript
var memwatch = require('memwatch');
memwatch.on('leak', function (info) {
  console.log('leak:');
  console.log(info);
});

memwatch.on('stats', function (stats) {
  console.log('stats:')
  console.log(stats);
});
var http = require('http');

var leakArray = [];
var leak = function () {
  leakArray.push("leak" + Math.random());
};

http.createServer(function (req, res) {
  leak();
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337);

console.log('Server running at http://127.0.0.1:1337/');

```
### stats事件
```javascript
stats:
        { num_full_gc: 4, // 第几次全堆垃圾回收
          num_inc_gc: 23, // 第几次增量垃圾回收
          heap_compactions: 4, // 第几次对老生代进行整理
          usage_trend: 0, // 使用趋势
          estimated_base: 7152944, // 预估基数
          current_base: 7152944, // 当前基数
          min: 6720776, // 最小
          max: 7152944 } // 最大
在这些数据中，num_full_gc和num_inc_gc比较直观地反应了垃圾回收的情况。

```
### leak事件
如果经过连续5次垃圾回收后，内存仍然没有被释放，这意味着有内存泄漏的产生，node-memwatch会出发一个leak事件。某次leak事件得到的数据如下所示：
```javascript
leak:
{ 
  start: Mon Oct 072013 13:46:27 GMT+0800 (CST),
  end: Mon Oct 072013 13:54:40 GMT+0800 (CST),
  growth: 6222576,
  reason: 'heap growth over 5 consecutive GCs (8m 13s) -43.33 mb/hr' 
}
```
 这个数据能显示5次垃圾回收的过程中内存增长了多少。
### 获取堆内存差异
```javascript
var memwatch = require('memwatch');
        var leakArray = [];
    var leak = function () {
      leakArray.push("leak" + Math.random());
    };

    // Take first snapshot
    var hd = new memwatch.HeapDiff();

    for (var i = 0; i < 10000; i++) {
      leak();
    }

    // Take the second snapshot and compute the diff
    var diff = hd.end();
    console.log(JSON.stringify(diff, null, 2));

```
# commonjs原理
类似闭包，模块是常驻老生代内存的
local假如是对象，需要提供清空队列的接口，以供调用者释放内存
```javascript
(function (exports, require, module, __filename, __dirname) {
  var local = "局部变量";

  exports.get = function () {
    return local;
  };
});

```

# 文件流stream
由于V8的内存限制，我们无法通过fs.readFile()和fs.writeFile()直接进行大文件的操作，而改用fs.createReadStream()和fs.createWriteStream()方法通过流的方式实现对大文件的操作。
```javascript
var reader = fs.createReadStream('in.txt');
var writer = fs.createWriteStream('out.txt');
reader.on('data', function (chunk) {
  writer.write(chunk);
});
reader.on('end', function () {
  writer.end();
});
// 由于读写模型固定，上述方法有更简洁的方式，具体如下所示：

var reader = fs.createReadStream('in.txt');
var writer = fs.createWriteStream('out.txt');
reader.pipe(writer);

```

可读流提供了管道方法pipe()，封装了data事件和写入操作。通过流的方式，上述代码不会受到V8内存限制的影响，有效地提高了程序的健壮性
## 可读流乱码
> 读取遇到宽字节的中文会出现乱码

### highWaterMark方案：
将文件可读流的每次读取的Buffer长度限制为11，代码如下：
```javascript
var rs = fs.createReadStream('test.md', {highWaterMark: 11});
```
解释：中文在utf-8占三个字节，11 = 3+3+3+2，剩余两个假如是中文的其中两个，就会乱码
11只是实例，值越大出现乱码概率越低，但还是避免不了
### setEncoding方案：
```javascript
var rs = fs.createReadStream('test.md', { highWaterMark: 11});
rs.setEncoding('utf8');
原理是 setEncoding 的decoder会识别编码，断开的会缓存，下一组再续上
```
虽然string_decoder模块很奇妙，但是它也并非万能药，它目前只能处理UTF-8、Base64和UCS-2/UTF-16LE这3种编码。所以，通过setEncoding()的方式不可否认能解决大部分的乱码问题，但并不能从根本上解决该问题。
### 拼接buffer方案：
具体不描述了
# Buffer类型
编码不支持GBK GB2312 BIG-5
需要使用第三方库 iconv 或者 iconv-lite


# 网络
Node提供了net、dgram、http、https这4个模块，
分别用于处理TCP、UDP、HTTP、HTTPS，适用于服务器端和客户端。

telnet可以调试tcp
dgram可以新建服务端，也可以新建客户端，两者相互调试。就send 、onmessage那套
获取http报文，使用curl
```javascript
curl http://127.0.0.1:1337
回车
会展示握手信息
展示报文信息
展示回话结束信息
```

## http模块

http.request(options,cd()) 可以发送http请求
对于同一个服务器，默认最大5个并发限制，内部有连接池优化
假如需要变更或者移除限制，可以再options的agent里配置
agent:new http.Agent({maxSockets:10})
agent:false

## 流式处理解析报文
这里要介绍到的模块是formidable。它基于流式处理解析报文，将接收到的文件写入到系统的临时文件夹中

## 预防csrf
```javascript
<form id="test" method="POST" action="http://domain_a.com/guestbook">
          <input type="hidden" name="content" value="vim是这个世界上最好的编辑器" />
          <input type="hidden" name="_csrf" value="<%=_csrf%>" />
        </form>
```
## 静态文件代理优化
> 传路径可以减少io判断

对于这种情况，我们需要做的是提升匹配成功率，那么就不能使用默认的/路径来进行匹配了，因为它的误伤率太高。给它添加一个更好的路由路径是个不错的选择，如下所示：
```javascript
app.use('/public', staticFile);
```
# 页面性能
使用高效的方法。必要时通过jsperf.com测试基准性能。

# MIME判断
mime库可以判断
```javascript
var mime = require('mime');

        mime.lookup('/path/to/file.txt');         // => 'text/plain'
        mime.lookup('file.txt');                  // => 'text/plain'
        mime.lookup('.TXT');                      // => 'text/plain'
        mime.lookup('htm');                       // => 'text/html'

```

# 附件下载
content-disposition  
inline是即时查看内容
attachment是附件  content-disposition :attachment ;filename="filename.txt"
## 实现附件下载api
```javascript
res.sendfile = function (filepath) {
  fs.stat(filepath, function(err, stat) {
    var stream = fs.createReadStream(filepath);
    // 设置内容
    res.setHeader('Content-Type', mime.lookup(filepath));
    // 设置长度
    res.setHeader('Content-Length', stat.size);
    // 设置为附件
    res.setHeader('Content-Disposition' 'attachment; filename="' + path.basename(filepath) + '"');
    res.writeHead(200);
    stream.pipe(res);
  });
};
```

# 响应跳转302
当我们的URL因为某些问题（譬如权限限制）不能处理当前请求，需要将用户跳转到别的URL时，我们也可以封装出一个快捷的方法实现跳转，如下所示：
```javascript
  res.redirect = function (url) {
          res.setHeader('Location', url);
          res.writeHead(302);
          res.end('Redirect to ' + url);
        };
```


# 进程
## 进程复制
```javascript
var fork = require('child_process').fork;
var cpus = require('os').cpus();
for (var i = 0; i < cpus.length; i++) {
  fork('./worker.js');
}

```
在*nix系统下可以通过ps aux | grep worker.js查看到进程的数量

## 创建子进程
child_process模块给予Node可以随意创建子进程（child_process）的能力。它提供了4个方法用于创建子进程。
❑ spawn()：启动一个子进程来执行命令。
❑ exec()：启动一个子进程来执行命令，与spawn()不同的是其接口不同，它有一个回调函数获知子进程的状况。
❑ execFile()：启动一个子进程来执行可执行文件。
❑ fork()：与spawn()类似，不同点在于它创建Node的子进程只需指定要执行的JavaScript文件模块即可。
spawn()与exec()、execFile()不同的是，后两者创建时可以指定timeout属性设置超时时间，一旦创建的进程运行超过设定的时间将会被杀死。
exec()与execFile()不同的是，exec()适合执行已有的命令，execFile()适合执行文件。这里我们以一个寻常命令为例，node worker.js分别用上述4种方法实现，如下所示：
```javascript
var cp = require('child_process');
cp.spawn('node', ['worker.js']);
cp.exec('node worker.js', function (err, stdout, stderr) {
  // some code
});
cp.execFile('worker.js', function (err, stdout, stderr) {
  // some code
});
cp.fork('./worker.js');
```
以上4个方法在创建子进程之后均会返回子进程对象。
如果是JavaScript文件通过execFile()运行，它的首行内容必须添加如下代码：
```javascript
 #! /usr/bin/env node
```
尽管4种创建子进程的方式有些差别，但事实上后面3种方法都是spawn()的延伸应用。

[node子进程](https://www.yuque.com/yuqueyonghudteckj/zpdk0q/hhdtgcatq038xsl3?view=doc_embed)
### 一图总结
![74dae7ad2b07cb91f37d035e97b31ec.jpg](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202307141122709.jpeg)

## 进程通信
```javascript
// parent.js
        var cp = require('child_process');
        var n = cp.fork(__dirname + '/sub.js');

        n.on('message', function (m) {
          console.log('PARENT got message:', m);
        });

        n.send({hello: 'world'});
// sub.js
        process.on('message', function (m) {
          console.log('CHILD got message:', m);
        });

        process.send({foo: 'bar'});

```
通过fork()或者其他API，创建子进程之后，为了实现父子进程之间的通信，父进程与子进程之间将会创建IPC通道。通过IPC通道，父子进程之间才能通过message和send()传递消息。
### 句柄传递
child.send(message, [sendHandle])
