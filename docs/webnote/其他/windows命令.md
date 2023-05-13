# **windows命令**

## windows端口被占用解决方法

https://blog.csdn.net/z13208725188/article/details/124231988

```typescript
# 查询端口
netstat -ano
# 查询指定端口
netstat -ano | findstr "端口号"
# 根据进程PID查询进程名称
tasklist | findstr "进程PID号"
# 根据PID杀死任务
taskkill -f -pid "进程PID号"
# 根据进程名称杀死任务
taskkill -f -t -im "进程名称"
```

如果80端口被系统占用(pid为4)，则需要关闭http服务

```typescript
# 查看 http 服务的运行状态
netsh http show servicestate 

# 关闭使用上面命令中显示pid号代表的进程
taskkill -f -pid "进程PID号"

netsh http show servicestate 
#没有进程占用就ok了
```