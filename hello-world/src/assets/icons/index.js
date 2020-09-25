//webpack创建一个以svg目录为上下文的require函数
const req = require.context('./',false,/\.svg$/)

console.log(req)
console.log(req,req.keys(),'kkk')
req.keys().forEach(i=>{
    console.log(req(i),'eee')
    
})
//keys()会获取所有svg文件
// req.keys().map(req) 