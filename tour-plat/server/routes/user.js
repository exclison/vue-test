const Router = require('koa-router')
const route = new Router()
// const jwt = require('jsonwebtoken')

// route.get('/getToken', async (ctx)=>{
//     let {name,id} = ctx.query
//     if(!name && !id){
//         ctx.body = {
//             msg:'不合法',
//             code:0
//         }
//         return
//     }
//     //生成token
//     let token = jwt.sign({name,id},'secret',{ expiresIn: '1h' })
//     ctx.body = {
//         token: token,
//         code:1
//     }
// })

route.get('/getUser', async ctx=>{
    let id = ctx.query.id
    ctx.body = {
        user:ctx.payload,
        id,
        code:1
    }
})

route.get('/getAllUser', async ctx=>{
    let type = ctx.query.type
    if(type){
        ctx.body = {
            type,
            code:1
        }
    }else{
        ctx.body = {
            msg:'缺少参数type',
            code:0
        }
    }
})

module.exports = route