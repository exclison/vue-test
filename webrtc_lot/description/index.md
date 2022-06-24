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

const NEWUSER = 'new_user';
const NEWCAND = 'new_candidate';
const SENDOFFER = 'send_offer';
const SENDASWER = 'send_aswer';
const CONNECTLIST = 'connection_list';

```