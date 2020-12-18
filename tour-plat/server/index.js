const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const fs = require("fs");
// const passport = require('passport')

const app = new Koa();
const router = new Router();

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

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });
console.log("yes");

app.listen(3000);
