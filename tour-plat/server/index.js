/*
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2022-05-17 15:07:21
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2023-09-15 11:46:38
 * @FilePath: \vue-test\tour-plat\server\index.js
 * @Description: 
 */
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

function handleRegisterRoute(dir_path) {
  let urls = fs.readdirSync(dir_path);
  urls.forEach((element) => {
    if (element.match(/\.js*/g)) {
      //routes里的js接口文件
      let module = require(dir_path + '/' + element);
      //routes里的文件名作为 路由名
      router.use("/" + element.replace(".js", ""), module.routes());
    }
    else {
      handleRegstierRoute(dir_path + '/' + element)
    }
  });
}
const dir_path = __dirname + "/routes"
handleRegisterRoute(dir_path)

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());
//   .use(passport.initialize())
//   .use(passport.session());

// 错误处理
app.use((ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  })
})

app.use(koajwt({
  secret: 'secret'
}).unless({
  path: [/\/common\/login-auth/, /\/get-user-info-con/]
}));


console.log("koa runing in 3000");

app.listen(3000);
