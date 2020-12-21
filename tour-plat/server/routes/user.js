const Router = require("koa-router");
const query = require("../dbconnect/index");
const util = require("../util/util");
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
  Object.assign(userInfo, { ticket: ctx.header.ticket });
  ctx.body = userInfo;
  return;
});
/*
 *@name:/user/get-user-list
 *@description:获取用户列表
 *@date: 2020-12-21 14:40:41
 */
route.get("/get-user-list", async (ctx) => {
  const sql = `SELECT * FROM user`;
  const userList = await query(sql);
  ctx.body = userList;
  return;
});
/*
 *@name:/user/add-user
 *@description:添加用户
 *@date: 2020-12-21 15:01:21
 *@params {String} name: 姓名
 *@params {Number} sex: 性别
 *@params {String} phone: 电话
 */
route.post("/add-user", async (ctx) => {
  let { name, sex, phone } = ctx.request.body;
  if (!name && !sex && !phone) {
    ctx.body = {
      msg: "不合法",
      code: 0,
    };
    return;
  }
  const sql = `INSERT INTO user (name,sex,phone,password) VALUES ('${name}',${sex},'${phone}','000000')`;
  await query(sql);
  ctx.body = "seccess";
  return;
});
/*
 *@name:/user/delete-user
 *@description:删除用户
 *@date: 2020-12-21 15:24:42
 *@params {Number} id: 用户id
 */
route.post("/delete-user", async (ctx) => {
  let { id } = ctx.request.body;
  if (!id) {
    ctx.body = {
      msg: "不合法",
      code: 0,
    };
    return;
  }
  const sql = `DELETE FROM user WHERE id=${id}`;
  await query(sql);
  ctx.body = "seccess";
  return;
});
/*
 *@name:/user/update-user
 *@description:更新用户信息
 *@date: 2020-12-21 15:49:00
 *@params {Number} id: 用户id
 *@params {String} sex: 性别 1男 0女
 *@params {String} name: 姓名
 *@params {String} phone: 电话
 *@params {String} password: 密码
 */
route.post("/update-user", async (ctx) => {
  let { id } = ctx.request.body;
  const reqBody = ctx.request.body;
  const keyList = ["name", "phone", "password", "sex"].filter(
    (key) => !util.isNull(reqBody[key])
  );
  let setStr = keyList.reduce((c, v) => (c += `${v}='${reqBody[v]}',`), "");
  setStr = setStr.substring(0, setStr.length - 1);

  const sql = `UPDATE user SET ${setStr} WHERE id=${id}`;
  await query(sql);
  ctx.body = "seccess";
  return;
});
/*
 *@name:/user/reset-password
 *@description:重置密码
 *@date: 2020-12-21 16:09:28
 *@params {Number} id: 用户id
*/
route.post("/reset-password", async (ctx) => {
  let { id } = ctx.request.body;
  const sql = `UPDATE user SET password='000000' WHERE id=${id}`;
  await query(sql);
  ctx.body = "seccess";
  return;
});

module.exports = route;
