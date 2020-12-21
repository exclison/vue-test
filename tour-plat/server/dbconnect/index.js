const mysql = require("mysql");
//数据库连接类
class DBConnection {
  constructor({ host, user, password, database }) {
    //保存参数
    this.host = host;
    this.user = user;
    this.password = password;
    this.database = database;

    //创建连接池
    this.pool = mysql.createPool({
      host: host,
      user: user,
      password: password,
      database: database,
    });
  }
  //暴露query方法
  async query(sql, args) {
    let result = await new Promise((resolve, reject) => {
      //建立连接
      this.pool.getConnection((err, connection) => {
        if (err) reject(err);
        //执行查询操作
        connection.query(sql, ...args, function(err, rows, fields) {
          if (err) reject(err);
          const reslut = JSON.parse(JSON.stringify(rows));
          connection.release();
          resolve(reslut);
        });
      });
    });
    return result;
  }
}
//创建实例
const db = new DBConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "Exclison",
});
//导出query方法以重用
const query = async (sql, args = []) => {
  const res = await db.query(sql, args).then((res) => res);
  return res;
};

module.exports = query;
