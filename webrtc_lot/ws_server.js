/*
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2022-06-22 14:47:36
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2022-10-17 16:33:43
 * @FilePath: \vue-test\webrtc_lot\ws_server.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// websocket信令服务器
const NEWUSER = 'new_user';
// const NEWCAND = 'new_candidate';
// const SENDOFFER = 'send_offer';
// const SENDASWER = 'send_aswer';
// const CONNECTLIST = 'connection_list';
const CLOSECONNECTION = 'close_connection';
// const RESTCONNECTIONLIST = 'rest_connection_list';

import WebSocket, { WebSocketServer } from 'ws';

const connectionList = {}
const connectionWS = {}
const wss = new WebSocketServer({ port: 8001 });

wss.on('connection', function connection(ws) {
    ws.on('message', function message(data, isBinary) {
        const message = JSON.parse(data)
        const { id, targetId, username, type } = message

        if (type === CLOSECONNECTION) {
            closeConnection(id)
            sendRestConnectionList()
        }
        // 如果消息类型为new_user,则将消息转为connection_list
        // 并对所有连接广播,以更新各端本地RTCPeerconnection节点
        if (type === NEWUSER) {
            connectionList[id] = { id, username }
            connectionWS[id] = ws
            sendConnectionList(id)
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
                console.log(Object.keys(connectionList).length)
                console.log(type, 'kkkkk')
                if (key !== id) {
                    const message = JSON.parse(data)
                    const messageTarget = JSON.stringify(message)
                    connectionWS[key].send(messageTarget)
                }
            })
        }


    });
});

const closeConnection = (id) => delete connectionList[id] && delete connectionWS[id]

const sendConnectionList = (id) => {
    const params = JSON.stringify({
        type: 'connection_list',
        newUserId: id,
        list: connectionList
    })
    Object.keys(connectionWS).forEach(key => {
        connectionWS[key].send(params)
    })
}

const sendRestConnectionList = () => {
    const params = JSON.stringify({
        type: 'rest_connection_list',
        list: connectionList
    })
    Object.keys(connectionWS).forEach(key => {
        connectionWS[key].send(params)
    })
}