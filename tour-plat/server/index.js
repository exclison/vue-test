const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const fs = require("fs");
const koajwt = require('koa-jwt');
const cors = require('koa-cors'); 
// const passport = require('passport')

const app = new Koa();
const router = new Router();

// 处理跨域
app.use(cors())

let urls = fs.readdirSync(__dirname + "/routes");
urls.forEach((element) => {
  //routes里的js接口文件
  let module = require(__dirname + "/routes/" + element);
  //routes里的文件名作为 路由名
  router.use("/" + element.replace(".js", ""), module.routes());
});

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());
//   .use(passport.initialize())
//   .use(passport.session());

// 错误处理
app.use((ctx, next) => {
  return next().catch((err) => {
      if(err.status === 401){
          ctx.status = 401;
        ctx.body = 'Protected resource, use Authorization header to get access\n';
      }else{
          throw err;
      }
  })
})

app.use(koajwt({
secret: 'secret'
}).unless({
path: [/\/common\/login-auth/]
}));


console.log("koa runing in 3000");

app.listen(3000);
