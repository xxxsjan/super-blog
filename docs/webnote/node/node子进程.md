# node子进程



https://juejin.cn/post/6882290865763680264



child_process 模块提供了以下 4 个方法用于创建子进程，**并且每一种方法都有对应的同步版本**：

- spawn: 启动一个子进程来执行命令；
- exec:  启动一个子进程来执行命令，与 spawn 不同的是，它有一个回调函数获知子进程的状况；
- execFile: 启动一个子进程来执行可执行文件；
- fork:  与 spawn 类似，不同点在于它创建 Node 的子进程只需指定要执行的 JavaScript 文件模块即可；





```tsx
const cp = require('child_process');

// spawn
cp.spawn('node', ['./dir/test1.js'],
  { stdio: 'inherit' }
);
// exec
cp.exec('node ./dir/test1.js', (err, stdout, stderr) => {
  console.log(stdout);
});
// execFile
cp.execFile('node', ['./dir/test1.js'],(err, stdout, stderr) => {
  console.log(stdout);
});
// fork
cp.fork('./dir/test1.js',
  { silent: false }
);

// ./dir/test1.js
console.log('test1 输出...');
 
```

### 差异列表如下：

| 类型     | 回调/异常 | 进程类型 | 执行类型        | 可设置超时 |
| -------- | --------- | -------- | --------------- | ---------- |
| spawn    | 不支持    | 任意     | 命令            | 不支持     |
| exec     | 支持      | 任意     | 命令            | 支持       |
| execFile | 支持      | 任意     | 可执行文件      | 支持       |
| fork     | 不支持    | Node     | JavaScript 文件 | 不支持     |



### exec

child_process.exec(command[, options:Options][, callback])

创建一个 shell，然后在 shell 里执行命令。执行完成后，将 stdout、stderr 作为参数传入回调方法。 options 参数说明：

- cwd：当前工作路径；
- env：环境变量；
- encoding：编码，默认是 utf8；
- shell：用来执行命令的 shell，unix 上默认是 /bin/sh，windows 上默认是 cmd.exe；
- timeout：默认是 0；
- killSignal：默认是 SIGTERM；
- uid：执行进程的 uid；
- gid：执行进程的 gid；
- maxBuffer： 标准输出、错误输出最大允许的数据量（单位为字节），如果超出的话，子进程就会被杀死；默认是 200*1024（即 200k ）

 

```typescript
exec('ls', {cwd: __dirname + '/dir'}, (error, stdout, stderr) => {
  if (error) {
    console.error('error:', error);
    return;
  }
  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);
})

// 子进程输出/错误监听
const child = exec('node ./dir/test1.js')

child.stdout.on('data', data => {
  console.log('stdout 输出:', data);
})
child.stderr.on('data', err => {
  console.log('error 输出:', err);
})
```



### execFile

child_process.execFile(file[, args][, options][, callback])

可以执行js 或者 sh文件

命令是放第二个参数，数组的方式传递

```typescript
const { execFile } = require('child_process');

// 1、执行js
execFile('node', ['./dir/test1.js'], (error, stdout, stderr) => {
  if (error) {
    console.error('error:', error);
    return;
  }
  console.log('stdout: ' + stdout); 
  console.log('stderr: ' + stderr);
})


const { execFile } = require('child_process');

// 2、执行 shell 脚本
// 在 shell 脚本中可以访问到 process.env 的属性 
process.env.DIRNAME = __dirname;
execFile(`${__dirname}/dir/test2.sh`, (error, stdout, stderr) => {
  if (error) {
    console.error('error:', error);
    return;
  }
  console.log('stdout: ' + stdout); // stdout: 执行 test2.sh  test1 输出...
  console.log('stderr: ' + stderr);
})

// ./dir/test2.sh

#! /bin/bash
echo '执行 test2.sh'
node $DIRNAME/dir/test1.js


// ./dir/test1.js
console.log('test1 输出...');
```

###  fork

child_process.fork(modulePath[, args][, options])

1）modulePath：子进程运行的模块； （2）args：字符串参数列表； （3）options 参数如下所示，其中与 exec 重复的参数就不重复介绍：

- execPath： 用来创建子进程的可执行文件，默认是 /usr/local/bin/node。也就是说，你可通过 execPath 来指定具体的 node 可执行文件路径；（比如多个 node 版本）
- execArgv： 传给可执行文件的字符串参数列表。默认是 process.execArgv，跟父进程保持一致；
- silent： 默认是 false，即子进程的 stdio 从父进程继承。如果是 true，则直接 pipe 向子进程的child.stdin、child.stdout 等；
- stdio： 选项用于配置在父进程和子进程之间建立的管道，如果声明了 stdio，则会覆盖 silent 选项的设置；

###  spawn

child_process.spawn(command[, args][, options])

```typescript
const spawn = require('child_process').spawn;
const ls = spawn('ls', ['-al']);

// 输出相关的数据
ls.stdout.on('data', function(data){
    console.log('data from child: ' + data);
});

// 错误的输出
ls.stderr.on('data', function(data){
    console.log('error from child: ' + data);
});

// 子进程结束时输出
ls.on('close', function(code){
    console.log('child exists with code: ' + code);
});
```

 



### 子进程通信

```typescript
// 例子
const { fork } = require('child_process');
const child = fork('./dir/test5.js')

child.on('message', (val) => {
  console.log('message 事件：', val);
})

// ./dir/test5.js
console.log('event_test 输出...');
process.send('子进程发送给父进程的消息...')

进程间通信
// 父进程
const child3 = fork('./dir/child3_1.js');

child3.on('message', (m)=>{
  console.log('message from child: ' + JSON.stringify(m));
});

child3.send({from: 'parent'});

// 子进程
process.on('message', function(m){
  console.log('message from parent: ' + JSON.stringify(m));
});

process.send({from: 'child'});
```