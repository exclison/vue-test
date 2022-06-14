// const { WebSocketServer } = require('ws');
const WebSocket = require('ws')

const wss = new WebSocket.Server({
    port: 8000
})
const wsList = {}
wss.on('connection', function connection(ws) {
    console.log(111)
    ws.on('message', function message(data) {
        const message = JSON.parse(data)
        // console.log(message,'message')
        if(message.name && !wsList[message.name]){
            wsList[message.name] = ws
        }


        if(message.target&&wsList[message.target]){
            const messageTarget = JSON.stringify(message)
            // console.log(messageTarget,'messageTarget')
            // console.log(wsList[message.target],'target')
            wsList[message.target].send(messageTarget)
        }
    });

    // ws.send('something');
});