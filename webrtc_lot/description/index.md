## WEBRTC 视频通话一对一原理概述

### offer 与 answer

    1. 控制端和傀儡端都连接 websocket 服务器
    2. 控制端和傀儡端都创建 RTCPeerConnection 实例(建立 onicecandidate,ontrack 事件)
    3. 控制端获取摄像头麦克风流并添加到 body,且添加到 RTCPeerConnection 实例(addTrack)
    4. 控制端创建 offer 并将 offer 设置为本地描述(setLocalDescription)
    5. 控制端将 offer 组装消息发送到信令服务器(这里使用 websocket)经过转发到达傀儡端
    6. 傀儡端收到控制端发送的消息,并将 offer 设置为远端描述(setRemoteDescription)
    7. 傀儡端获取摄像头麦克风流并将其添加的 body,且将其添加到 RECPeerConnection 实例(addTrack)
    8. 傀儡端使用 offer 创建 answer,并将其设置为本地描述(setLocalDescription)
    9. 傀儡端将 answer 发送到信令服务器经过转发到达控制端
    10. 控制端收到 answer 并将其设置为远端描述(setRemoteDescription)

### icecandidate

    1. 接 offer 与 answer 第 3 步
       - 控制端将视频流添加到实例后触发 ice,前往 stun 服务器询问本机真实 ip(NAT 穿透)
       - stun 服务器返回后触发 onicecandidate 事件
       - 在事件中将收到的 candidate 组装消息发送给信令服务器转发,到达傀儡端
       - 傀儡端收到 ice 消息后将 ice 添加到 RTC 实例(addicecandidate)
    2. 接 off 与 answer 第 7 步
       - 傀儡端将视频流添加到实例后触发 ice,前往 stun 服务器询问本机真是 ip(NAT 穿透)
       - stun 服务器返回后触发 onicecandidate 事件
       - 在事件中将收到的 candidate 组装消息发送给信令服务器转发,到达控制端
       - 控制端收到 ice 消息后将 ice 添加到 RTC 实例(addicecandidate)

## WEBRTC 视频通话多对多实现原理

    在一对一视频通话中,控制端与傀儡端各有一个RTCPeerConnection实例
    而在多对多通话中,有两种方式实现多对多通信
    一是每个端都有多个实例分别维持与其他端的通信连接
    另一个是每个端只有一个实例,通过一个通道实现多对多连接
    这里仅实现第一种方式(即多个实例),第二种方式日后研究

    在项目中使用的原理为:
        1. 每个端为一个用户,一个用户有一个id,不可重复,在信令服务器维护这些用户
        2. 每个端使用除自己之外的id建立多个RTCPeerConnection实例
        3. 每个端使用connectionList维护所有实例,使用id作为key
        4. 每个端使用固定消息结构发送数据,参考下边消息数据结构
        5. 每个端收到消息后使用来源id对应的RTC实例响应
        6. 新增用户时,先发送消息到信令服务器,等待服务器广播所有连接状态的用户
        7. 每个端收到广播消息后各自创建对应新用户的RTC实例
        8. 如果本地(本端)为新用户,则对每个REC实例创建offer并发送消息
        9. 其他端收到定向或广播消息后,根据targetId判定并创建answer(详见一对一)
        10. 本地收到其他各端的answer后设置远端描述

        其他: ice夹杂在上述10个步骤中,设置相应的消息处理事件即可
        注意: 主要难点为多对多拓扑结构,相当于各自连接一个一对一通信,具体实现均为一对一

## 消息数据结构

```json

    {
        id: localId, //本地id ,标识数据来源
        targetId:id, //目标id标识数据去向
        username: '',//用户名
        type: "send_offer",//消息类型  详见消息类型
        sdp: localDescription, //描述,用于传输offer与answer
        ice:candidate,//用于传输nat穿透数据 (借助stun/turn服务器)
        newUserId:id,//新用户id, 用于判断本地是否为新用户(仅type='new_user'时使用)
        list:connectionList,//用户列表,用于各端创建RTCPeerconnection节点
    }

```

## 消息类型

```javascript
const NEWUSER = "new_user"; //增加新用户
const NEWCAND = "new_candidate"; //新信令
const SENDOFFER = "send_offer"; //发送offer
const SENDASWER = "send_aswer"; //发送answer
const CONNECTLIST = "connection_list"; //连接用户列表
const CLOSECONNECTION = "close_connection"; //关闭连接
const RESTCONNECTIONLIST = "rest_connection_list"; //剩余连接用户列表
```
