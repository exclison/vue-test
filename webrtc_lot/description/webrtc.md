<!--
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2022-10-10 14:56:27
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2022-10-17 10:00:24
 * @FilePath: \vue-test\webrtc_lot\description\webrtc.md
 * @Description:
-->

## WebRTC API

WebRTC (Web Real-Time Communications) 是一项实时通讯技术，它允许网络应用或者站点，在不借助中间媒介的情况下，建立浏览器之间点对点（Peer-to-Peer）的连接，实现视频流和（或）音频流或者其他任意数据的传输。WebRTC 包含的这些标准使用户在无需安装任何插件或者第三方的软件的情况下，创建点对点（Peer-to-Peer）的数据分享和电话会议成为可能。

WebRTC 是一个完全对等技术，用于实时交换音频、视频和数据，同时提供一个中心警告。如其他地方所讨论的，必须进行一种发现和媒体格式协商，以使不同网络上的两个设备相互定位。这个过程被称为信令，并涉及两个设备连接到第三个共同商定的服务器。通过这个第三方服务器，这两台设备可以相互定位，并交换协商消息。

## 推荐文章

原理文章 https://juejin.cn/post/6978828342984179726

中文文档 https://github.com/RTC-Developer/WebRTC-Documentation-in-Chinese

## 原理概述

WebRtc 主要由 获取桌面流,建立 P2P 连接,传输数据等几部分组成

1. 获取桌面流 MediaStream

```javascript
const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
const captureStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
```

2. 建立 P2P 连接

```javascript
RTCPeerConnection.RTCPeerConnection();
```

3. 传输数据

```javascript
RTCPeerConnection.createDataChannel();
```

### 信令服务器

两个设备之间建立 WebRTC 连接需要一个信令服务器来实现双方通过网络进行连接。信令服务器的作用是作为一个中间人帮助双方在尽可能少的暴露隐私的情况下建立连接。
重要的是信令服务器并不需要理解和解释信令数据内容。虽然它基于 SDP 但这并不重要：通过信令服务器的消息的内容实际上是一个黑盒。重要的是，当 ICE 子系统指示你将信令数据发送给另一个对等方时，你就这样做，而另一个对等方知道如何接收此信息并将其传递给自己的 ICE 子系统。你所要做的就是来回传递信息。内容对信令服务器一点都不重要。

### ICE

ICE (交互式连接建立) 是一个被 WebRTC 使用的框架（跟其他技术在一起使用），它被用在两端之间的连接，不管是何种网络类型 (通常用在视频或语音聊天)。这个协议让两端能够互相找到对方并建立一个连接，即便它们都使用了网络地址转译 (NAT) 去跟内网的其他设备共享了一个公网 IP 地址。

### NAT

NAT (网络地址翻译) 是一个能够让多台主机共享一个 IP 地址的技术。NAT 会给局域网内每台主机分配一个唯一的地址同时调整输入和输出的网络流量，使之能够发送到正确的位置。

### STUN

STUN (NAT 会话穿越工具) 是一个 NAT (网络地址转换器) 传递数据的辅助协议。STUN 会返回一台位于 NAT 背后的已接入网络的主机的 IP address(IP 地址)、port (en-US)(端口号) 和连通状态。

### TURN

TURN (NAT 的中继穿越) 是一个能够让位于 Network Address Translator(NAT) 或者防火墙之后的主机接受和发送数据的 protocol(协议)。

### 交换会话描述信息

开始处理信号的时候，用户的初始化操作会创建一个请求（offer） ，根据 SDP 协议其中会包含一个 session 描述符，并且需要把这个发送到我们称之为**接收者（callee）那里，接受者需要返回一个包含描述符的应答（answer）**信息。

### 交换 ICE 候选

两个节点需要交换 ICE 候选来协商他们自己具体如何连接。每一个 ICE 候选描述一个发送者使用的通信方法，每个节点按照他们被发现的顺序发送候选并且保持发送直到退出，即使媒体数据流已经开始传递也要如此。

### 相关实例方法

#### RTCPeerConnection

RTCPeerConnection 接口代表一个由本地计算机到远端的 WebRTC 连接。该接口提供了创建，保持，监控，关闭连接的方法的实现

#### RTCPeerConnection.RTCPeerConnection()

构造函数;创建一个新的 RTCPeerConnection 对象

#### RTCPeerConnection.addIceCandidate()

当本机当前页面的 RTCPeerConnection 接收到一个从远端页面通过信号通道发来的新的 ICE 候选地址信息，本机可以通过调用**RTCPeerConnection.addIceCandidate()** 来添加一个 ICE 代理.这会将此新的远程候选项添加到 RTCPeer 连接的远程描述中，该描述描述了连接的远程端的状态

#### RTCPeerConnection.addTrack()

RTCPeerConnection 对象的 addTrack() 方法将一个新的媒体音轨添加到一组音轨中，这些音轨将被传输给另一个对等点。

#### RTCPeerConnection.createAnswer()

RTCPeer 连接接口上的创建应答（） 方法为在 WebRTC 连接的要约/应答协商期间从远程对等方收到的要约创建 SDP 应答。答案包含有关已附加到会话的任何媒体、浏览器支持的编解码器和选项以及已收集的任何 ICE 候选项的信息。答案将交付给退回的承诺，然后应发送到报价的来源以继续谈判过程。

#### RTCPeerConnection.createDataChannel()

RTCPeerConnection 的 createDataChannel() 方法创建一个可以发送任意数据的数据通道 (data channel)。常用于后台传输内容，例如：图像，文件传输，聊天文字，游戏数据更新包，等等。

#### RTCPeerConnection.createOffer()

RTCPeerConnection 接口的 createOffer() 方法启动创建一个 SDP offer，目的是启动一个新的 WebRTC 去连接远程端点。SDP offer 包含有关已附加到 WebRTC 会话，浏览器支持的编解码器和选项的所有 MediaStreamTracks 信息，以及 ICE 代理，目的是通过信令信道发送给潜在远程端点，以请求连接或更新现有连接的配置。返回值是一个 Promise (en-US)，创建 offer 后，将使用包含新创建的要约的 RTCSessionDescription 对象来解析该返回值。

#### RTCPeerConnection.setLocalDescription()

更改与连接关联的本地描述。此说明指定连接的本地端的属性，包括媒体格式。该方法采用单个参数（会话描述），并返回一个 Promise

#### RTCPeerConnection.setRemoteDescription()

RTCPeerConnection.setRemoteDescription() 方法改变与连接相关的描述，该描述主要是描述有些关于连接的属性，例如对端使用的解码器。连接受此更改影响，并且必须能够支持旧的和新的描述。方法带三个参数，RTCSessionDescription 对象用于设置，然后是更改成功的回调方法，一个是更改失败的回调方法。

方法是异步的，不用等待设置完成，成功会调用成功回调方法，失败则会调用错误回调方法。

连接的 offer 通常来自于负责匹配的服务器所发送的数据。执行者应调用此方法设置远程描述，然后生成发送到对端计算机的 answer。
