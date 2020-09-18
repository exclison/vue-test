const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')({prefix:"/api"});

const goods = [
    {id:1,text:"222222",price:1000},
    {id:2,text:"23333322",price:1000},
]

router.get('/detail',async (ctx)=>{
    ctx.body={
        ok:1,
        goods
    }

})



app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());

app.listen(8080);
