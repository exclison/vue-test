//旅程信息接口
const Router = require("koa-router");
const query = require("../dbconnect/index");
// const util = require("../util/util");
const { parseToken } = require("../util/ticket");
const route = new Router();

/*
 *@name:/tripInfo/get-trip-info
 *@description:获取旅行信息
 *@date: 2020-12-25 17:29:59
*/
route.get("/get-trip-info", async (ctx) => {
  const info = parseToken(ctx.header.ticket);
  const { id } = info;
  const hotelSql = `SELECT hotel_id,hotel_name,room_id,room_num,m.user_id,user.id,user.name AS user_name  FROM user LEFT JOIN (SELECT hotel.hotel_id,hotel.hotel_name,room.room_id,room.room_num,room.user_id FROM hotel RIGHT JOIN room ON hotel.hotel_id=room.hotel_id) m ON user.id=m.user_id WHERE id=${id}`;
  const hotelList = await query(hotelSql);

  const flightSql = `SELECT m.id AS user_id,m.NAME AS user_name,m.phone AS user_phone,m.sex AS user_sex,flight.* FROM (SELECT user.id,user.name,user.phone,user.sex,seat.flight_id FROM user LEFT JOIN seat ON user.id=seat.user_id WHERE user.id=${id}) m LEFT JOIN flight ON m.flight_id=flight.id`;
  const flightList = await query(flightSql);

  const result = { hotelList, flightList };
  ctx.body = result;
  return;
});

module.exports = route;
