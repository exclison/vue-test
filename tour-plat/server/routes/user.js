const Router = require("koa-router");
const query = require("../dbconnect/index");
const { parseToken } = require("../util/ticket");
const route = new Router();

/*
 *@name:/user/get-user-info
 *@description:获取个人信息
 *@date: 2020-12-18 16:02:07
 *@params 无参数 需要登录权限 存在token中
*/
route.get("/get-user-info", async (ctx) => {
  const info = parseToken(ctx.header.ticket);
  const sql = `SELECT * FROM user WHERE id='${info.id}'`;
  const userList = await query(sql);
  const userInfo = userList[0];
  ctx.body = userInfo;
  return;
});


module.exports = route;
