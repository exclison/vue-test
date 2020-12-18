const Router = require("koa-router");
const jwt = require("jsonwebtoken");
const query = require("../dbconnect/index");
const route = new Router();


route.post("/post", (ctx) => {
  //设置允许跨域
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.body = {
    code: 1,
    postParams: ctx.request.body,
  };
});
route.post("/login-auth", async (ctx) => {
  //设置允许跨域
  ctx.set("Access-Control-Allow-Origin", "*");
  console.log(ctx.request.body)
  let { phone, password } = ctx.request.body;
  if (!phone && !password) {
    ctx.body = {
      msg: "不合法",
      code: 0,
    };
    return;
  }

  const result = await query("SELECT * FROM user")


  //生成token
  let token = jwt.sign({ phone, password }, "secret", { expiresIn: "1h" });
  ctx.body = {
    token: token,
    code: 1,
  };
});

module.exports = route;
