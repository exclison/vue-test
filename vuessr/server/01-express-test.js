//nodejd代码
const express = require('express')

//获取实例
const server = express()

// 编写路由处理不同请求
server.get('/',(req,res)=>{
    res.send('hello-world')
})

//监听端口
server.listen(80,()=>{
    console.log('runing');
})