# package.json 说明

https://www.cnblogs.com/Super-scarlett/p/8177871.html



1. prepublish: 在包发布之前运行，也会在npm install安装到本地时运行
2. publish,postpublish: 包被发布之后运行
3. preinstall: 包被安装前运行
4. install,postinstall: 包被安装后运行
5. preuninstall,uninstall: 包被卸载前运行
6. postuninstall: 包被卸载后运行
7. preversion: bump包版本前运行
8. postversion: bump包版本后运行
9. pretest,test,posttest: 通过npm test命令运行
10. prestop,stop,poststop: 通过npm stop命令运行
11. prestart,start,poststart: 通过npm start命令运行
12. prerestart,restart,postrestart: 通过npm restart运行