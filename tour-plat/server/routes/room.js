const Router = require("koa-router");
const query = require("../dbconnect/index");
// const util = require("../util/util");
// const { parseToken } = require("../util/ticket");
const route = new Router();

/*
 *@name:/room/get-room-list-by-id
 *@description:根据酒店id获取房间列表
 *@date: 2020-12-25 14:39:44
 *@params {String} id: 酒店id
 */
route.get("/get-room-list-by-id", async (ctx) => {
  const { id } = ctx.request.query;
  const sql = `SELECT room.room_id,room_num,user.id AS user_id,user.name AS user_name FROM room LEFT JOIN user ON user.id IN (room.user_id) WHERE room.hotel_id=${id}`;
  const roomList = await query(sql);
  ctx.body = roomList;
  return;
});

/*
 *@name:/room/add-room
 *@description:添加房间
 *@date: 2020-12-25 14:45:56
 *@params {String} roomNum: 房间号
 *@params {String} hotelId: 酒店id
 */
route.post("/add-room", async (ctx) => {
  const { roomNum, hotelId } = ctx.request.body;
  const sql = `INSERT INTO room (room_num,hotel_id) VALUES('${roomNum}','${hotelId}')`;
  await query(sql);
  ctx.body = "success";
  return;
});

/*
 *@name:/room/delete-room
 *@description:删除房间
 *@date: 2020-12-25 14:52:20
 *@params {String} roomId: 房间id
 */
route.post("/delete-room", async (ctx) => {
  const { roomId } = ctx.request.body;
  const sql = `DELETE FROM room WHERE room_id=${roomId}`;
  await query(sql);
  ctx.body = "success";
  return;
});

/*
 *@name:/room/reserve-room
 *@description:预定房间
 *@date: 2020-12-25 15:00:02
 *@params {String} userId: 预定人id
 *@params {String} roomId: 房间id
 */
route.post("/reserve-room", async (ctx) => {
  const { userId, roomId } = ctx.request.body;
  const roomSql = `SELECT user_id FROM room WHERE room_id=${roomId}`;
  const roomUserList = await query(roomSql);
  const roomUserInfo = roomUserList[0].user_id || "";

  let userList = roomUserInfo.split(",");
  !userList.includes(userId) && userList.push(userId);
  const newRoomUser = userList.join(",");

  const updateSql = `UPDATE room SET user_id='${newRoomUser}' WHERE room_id=${roomId}`;
  await query(updateSql);
  ctx.body = "success";
  return;
});

module.exports = route;
