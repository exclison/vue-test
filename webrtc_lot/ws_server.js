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
        const { id, username, type } = message
        
        if (type === NEWUSER) {
            connectionList[id] = { id, username }
            connectionWS[id] = ws
            const params = JSON.stringify({
                type: 'connection_list',
                list: connectionList
            })
            console.log(Object.keys(connectionList).length)
            ws.send(params)
        }

        Object.keys(connectionWS).forEach(key=>{
            console.log(type,key,id,'kkkkk')
            if(key!==id){
                const message = JSON.parse(data)
                const messageTarget = JSON.stringify(message)
                connectionWS[key].send(messageTarget)
            }
        })
    });
});

const closeConnection = (id) => delete connectionList[id]