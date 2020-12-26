const Router = require("koa-router");
const query = require("../dbconnect/index");
const { createToken } = require("../util/ticket");
const route = new Router();

/*
 *@name:/common/login-auth
 *@description:登录接口
 *@date: 2020-12-18 16:03:52
 *@params {String} phone: 联系电话
 *@params {String} password: 密码
*/
route.post("/login-auth", async (ctx) => {
  //设置允许跨域
  ctx.set("Access-Control-Allow-Origin", "*");
  let { phone, password } = ctx.request.body;
  if (!phone && !password) {
    ctx.body = {
      msg: "不合法",
      code: 0,
    };
    return;
  }

  const sql = `SELECT * FROM user WHERE phone='${phone}'`;
  const result = await query(sql);
  const userInfo = result[0];
  if (userInfo.password !== password || result.length === 0) {
    ctx.status = 400
    ctx.body = {
      msg: "用户名或密码不正确",
      code: 400,
    };
    return;
  }
  //生成token
  let token = createToken(
    { id: userInfo.id, phone: userInfo.phone, password: userInfo.password,role:userInfo.role },
    "secret",
    "1h"
  );
  const res = Object.assign({}, result[0], { ticket: token });

  ctx.body = res;
});

module.exports = route;
