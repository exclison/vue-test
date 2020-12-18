const mysql = require("mysql");
//数据库连接类
class DBConnection {
  constructor({ host, user, password, database }) {
    //保存参数
    this.host = host;
    this.user = user;
    this.password = password;
    this.database = database;
    //创建连接
    this.connection = mysql.createConnection({
      host: host,
      user: user,
      password: password,
      database: database,
    });
  }
  //暴露query方法
  async query(sql, args) {
    //建立连接
    this.connection.connect();
    //执行查询操作
    let result = await new Promise((resolve, reject) => {
      this.connection.query(sql, ...args, function(err, rows, fields) {
        if (err) reject(err);
        const reslut = JSON.parse(JSON.stringify(rows));
        resolve(reslut);
      });
    });
    //关闭连接
    this.connection.end();
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
