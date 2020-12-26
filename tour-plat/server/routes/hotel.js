const Router = require("koa-router");
const query = require("../dbconnect/index");
// const util = require("../util/util");
// const { parseToken } = require("../util/ticket");
const route = new Router();

/*
 *@name:/hotel/get-hotel-list
 *@description:获取酒店列表
 *@date: 2020-12-18 16:02:07
 *@params 无参数 需要登录权限 存在token中
 */
route.get("/get-hotel-list", async (ctx) => {
//   const info = parseToken(ctx.header.ticket);
//   const {id,role} = info
  let hotelList=[]
  //管理员
//   if(role === 1){
      const hotel_sql = `SELECT hotel.hotel_id,hotel.hotel_name,hotel.hotel_phone, COUNT(room.hotel_id) AS roomCount FROM hotel LEFT JOIN room ON hotel.hotel_id=room.hotel_id GROUP BY hotel.hotel_id`
      hotelList = await query(hotel_sql)
//   }
  //用户
//   if(role === 2){}
  ctx.body = hotelList;
  return;
});

/*
 *@name:/hotel/update-hotel
 *@description:更新酒店信息
 *@date: 2020-12-21 15:01:21
 *@params {String} hotelId: 酒店id
 *@params {String} name: 酒店名称
 *@params {String} phone: 电话
 */
route.post("/update-hotel", async (ctx) => {
  let { hotelId,name, phone } = ctx.request.body;
  if (!hotelId&&!name && !phone) {
    ctx.body = {
      msg: "不合法",
      code: 0,
    };
    return;
  }
  const sql = `UPDATE hotel SET hotel_name='${name}',hotel_phone='${phone}' WHERE hotel_id=${hotelId}`;
  await query(sql);
  ctx.body = "seccess";
  return;
});
/*
 *@name:/hotel/add-hotel
 *@description:添加酒店
 *@date: 2020-12-21 15:01:21
 *@params {String} name: 酒店名称
 *@params {String} phone: 电话
 */
route.post("/add-hotel", async (ctx) => {
  let { name, phone } = ctx.request.body;
  if (!name && !phone) {
    ctx.body = {
      msg: "不合法",
      code: 0,
    };
    return;
  }
  const sql = `INSERT INTO hotel (hotel_name,hotel_phone) VALUES('${name}','${phone}')`;
  await query(sql);
  ctx.body = "seccess";
  return;
});
/*
 *@name:/hotel/delete-hotel
 *@description:删除酒店
 *@date: 2020-12-21 15:01:21
 *@params {String} id: 酒店id
 */
route.post("/delete-hotel", async (ctx) => {
  let { id } = ctx.request.body;
  if (!id) {
    ctx.status = 400
    ctx.body = {
      msg: "酒店id不能为空",
      code: 400,
    };
    return;
  }
  const sql = `DELETE FROM hotel WHERE hotel_id=${id}`;
  await query(sql);
  ctx.body = "seccess";
  return;
});

module.exports = route;
