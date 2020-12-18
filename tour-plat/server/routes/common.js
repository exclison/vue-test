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

  const sql = `SELECT * FROM user WHERE phone='${phone}'`
  const result = await query(sql)
  const userInfo = result[0]
  if(userInfo.password !== password || result.length === 0){
    ctx.body = {
        msg: "用户名或密码不正确",
        code: 400,
      };
      return;
  }
  //生成token
  let token = jwt.sign({ id:userInfo.id,phone:userInfo.phone, password:userInfo.password }, "secret", { expiresIn: "1h" });
  const res = Object.assign({},result[0],{ticket:token})

  ctx.body = res;
});

module.exports = route;
