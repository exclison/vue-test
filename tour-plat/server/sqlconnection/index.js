const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "Exclison",
});

connection.connect();

connection.query("SELECT * from user AS us", function(err, rows, fields) {
  if (err) throw err;
  console.log(rows,'ddd')
  for(let i in rows){
      console.log(rows[i].id,'i')
  }
  console.log("The user is: ", JSON.parse(JSON.stringify(rows[0])));
});

connection.end();
