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

  const sql =`SELECT * FROM flight`
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
 *@name:/flight/get-flight-by-id
 *@description:根据id获取航班详情
 *@date: 2020-12-21 17:31:39
 *@params {Number} id: 航班id
 */
route.get("/get-flight-by-id", async (ctx) => {
  let { id } = ctx.query;

  const flightSql = `SELECT * FROM flight WHERE id=${id}`;

  const resultList = await query(flightSql);

  const result = resultList[0];

  const userSql = `SELECT user.id,user.name,user.phone,user.sex,seat.flight_id FROM user LEFT JOIN seat ON user.id=seat.user_id WHERE seat.flight_id=${result.id}`;

  const userList = await query(userSql);

  result.users = userList;

  ctx.body = result;

  return;
});

module.exports = route;
