// websocket信令服务器
const WebSocket = require('ws')

const wss = new WebSocket.Server({
    port: 8000
})
const wsList = {}
wss.on('connection', function connection(ws) {
    console.log(new Date().getTime())
    ws.on('message', function message(data) {
        console.log(new Date().getTime())
        const message = JSON.parse(data)
        if (message.type === 'ws_register'){
            if (message.name) {
                wsList[message.name] = ws
            }
            // if (message.name && !wsList[message.name]) {
            //     wsList[message.name] = ws
            // }
        }
        // console.log(message,'message')
        


        if (message.target && wsList[message.target]) {
            const messageTarget = JSON.stringify(message)
            // console.log(messageTarget,'messageTarget')
            // console.log(wsList[message.target],'target')
            wsList[message.target].send(messageTarget)
        }
    });

    // ws.send('something');
});