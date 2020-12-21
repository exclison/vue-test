const Router = require("koa-router");
const query = require("../dbconnect/index");
const util = require("../util/util");
const { parseToken } = require("../util/ticket");
const route = new Router();

/*
 *@name:/flight/get-flight-list
 *@description:获取航空列表
 *@date: 2020-12-18 16:03:52
 */
route.get("/get-flight-list", async (ctx) => {
  const info = parseToken(ctx.header.ticket);
  const role = info.role;
  console.log(info);

  const sql =
    role === 1
      ? `SELECT * FROM flight`
      : `SELECT * FROM filght WHERE users LIKE '${info.id}%'`;
  const result = await query(sql);
  ctx.body = result;
  return;
});
/*
 *@name:/flight/add-flight
 *@description:添加航班
 *@date: 2020-12-21 17:06:40
 *@params {String} name: 航班名称
 *@params {String} startTime: 出发时间
 *@params {String} endTime: 到达时间
 *@params {String} startPoint: 出发地点
 *@params {String} endPoint: 到达地点
 */
route.post("/add-flight", async (ctx) => {
  const { name, startTime, endTime, startPoint, endPoint } = ctx.request.body;

  const sql = `INSERT INTO flight (name,startTime,endTime,startPoint,endPoint) VALUES ('${name}','${startTime}','${endTime}','${startPoint}','${endPoint}')`;
  await query(sql);
  ctx.body = "seccess";
  return;
});
/*
 *@name:/flight/delete-flight
 *@description:删除航班
 *@date: 2020-12-21 17:17:08
 *@params {Number} id: 航班id
 */
route.post("/delete-flight", async (ctx) => {
  const { id } = ctx.request.body;
  if (!id) {
    ctx.body = {
      msg: "id不能为空",
      code: 0,
    };
    return;
  }
  const sql = `DELETE FROM flight WHERE id=${id}`;

  await query(sql);
  ctx.body = "seccess";
  return;
});
/*
 *@name:/flight/update-flight
 *@description:修改航班
 *@date: 2020-12-21 17:23:29
 *@params {String} name: 姓名
 *@params {String} startTime: 出发时间
 *@params {String} endTime: 到达时间
 *@params {String} startPoint: 出发地点
 *@params {String} endPoint: 到达地点
 */
route.post("/update-flight", async (ctx) => {
  let { id } = ctx.request.body;
  const reqBody = ctx.request.body;
  const keyList = [
    "name",
    "startTime",
    "endTime",
    "startPoint",
    "endPoint",
  ].filter((key) => !util.isNull(reqBody[key]));
  let setStr = keyList.reduce((c, v) => (c += `${v}='${reqBody[v]}',`), "");
  setStr = setStr.substring(0, setStr.length - 1);

  const sql = `UPDATE flight SET ${setStr} WHERE id=${id}`;

  await query(sql);
  ctx.body = "seccess";
  return;
});
/*
 *@name:
 *@description:
 *@date: 2020-12-21 17:31:39
 *@params {String} paramsName: 参数1
 *@params {Array} paramsName: 参数2
 */
route.get("/get-flight-by-id", async (ctx) => {
  let { id } = ctx.query;

  const flightSql = `SELECT * FROM flight WHERE id=${id}`;

  const resultList = await query(flightSql);

  const result = resultList[0];

  const userSql = `SELECT * FROM user WHERE id IN (${result.users.replace(
    /\"/g,
    ""
  )})`;

  const userList = await query(userSql);

  result.users = userList;

  ctx.body = result;

  return;
});

module.exports = route;
