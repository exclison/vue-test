const http = require('http');
const io = require('socket.io');

//1. 创建http服务

let httpServer = http.createServer(function(request,response){
	// console.log(request,response)
	console.log(request.url)
	response.write('fffgg');
	response.end();
});
httpServer.listen(8080);
console.log('11111')

//2. 创建webSocket服务

let wsServer = io.listen(httpServer);
wsServer.on('connection',function(sock){
	sock.on('a',function(num1,num2){
		console.log(num1,num2)
	});
	setInterval(function(){
		sock.emit('b',Math.random())
	},1000)
}); 