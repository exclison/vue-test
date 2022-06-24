// websocket信令服务器
const NEWUSER = 'new_user';
// const NEWCAND = 'new_candidate';
// const SENDOFFER = 'send_offer';
// const SENDASWER = 'send_aswer';
// const CONNECTLIST = 'connection_list';

import WebSocket, { WebSocketServer } from 'ws';

const connectionList = {}
const connectionWS = {}
const wss = new WebSocketServer({ port: 8000 });

wss.on('connection', function connection(ws) {
    ws.on('message', function message(data, isBinary) {
        const message = JSON.parse(data)
        const { id, targetId, username, type } = message

        // 如果消息类型为new_user,则将消息转为connection_list
        // 并对所有连接广播,以更新各端本地RTCPeerconnection节点
        if (type === NEWUSER) {
            connectionList[id] = { id, username }
            connectionWS[id] = ws
            const params = JSON.stringify({
                type: 'connection_list',
                newUserId: id,
                list: connectionList
            })
            Object.keys(connectionWS).forEach(key => {
                connectionWS[key].send(params)
            })
            console.log(Object.keys(connectionList).length)
            // ws.send(params)
        } else if (targetId) {
            // 如果存在targetId,则实现点对点消息
            const message = JSON.parse(data)
            const messageTarget = JSON.stringify(message)
            connectionWS[targetId].send(messageTarget)
        } else {
            // 否则全局广播
            Object.keys(connectionWS).forEach(key => {
                console.log(type, key, id, 'kkkkk')
                if (key !== id) {
                    const message = JSON.parse(data)
                    const messageTarget = JSON.stringify(message)
                    connectionWS[key].send(messageTarget)
                }
            })
        }


    });
});

const closeConnection = (id) => delete connectionList[id]