# webrtc推流 socket.io+express+react

搭建参考

[有了WebRTC，直播可以这样玩！ - 掘金](https://juejin.cn/post/6964571538729205773)

详细原理

https://juejin.cn/post/7129763930779418654

https://zhuanlan.zhihu.com/p/93107411



### 图解



![img](https://raw.githubusercontent.com/xxxsjan/pic-bed/main/202304142148481.webp)





利用webrtc的RTCPeerConnection

实例方法

createOffer：创建offer

setLocalDescription：设置本地描述

setRemoteDescription：设置远程描述

createAnswer：创建answer

addIceCandidate：设置候选信息

### 文字流程

a先进房间

b点进房

a收到通知，以b的socketId为标识创建实例，创建offer，设置offer为setLocalDescription

发送offer到B

（同时实例需要监听onicecandidate，发送candidate，给B）

（设置track监听，可以拿到流，添加到页面video即可）

B收到offer，设置setRemoteDescription为offer，创建answer，设置setLocalDescription为answer，把answer发送会A

A 收到answer，设置setRemoteDescription为anser，连接建立完成

--为了可以定向发送给B，可以利用socket定向发送给B，socketId就是该标识

注意，本地创建的RTCPeerConnection都需要绑定本地视频流



关键点：各自客户端的peerconnect  存其他客户端id



A ： 

新建 pc B-->create offer -->local    

offer--->server

server---offer-->B

B:  

creart(pc A) --offer-->remote

create answer -->setLocal-->server

server-->A



### socket关键语法

join：假如房间

to：去到指定房间

emit：通知

```javascript
socket.join('demo');// 加入房间
socket.emit('new', socket.id);// 只通知自己
socket.to('demo').emit('new', socket.id);// 通知其他人，不包括自己
io.to('roomId').emit('event',data);// 通知全部人，包括自己
```