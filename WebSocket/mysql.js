const mySql = require('mysql');

//连接池
let db = mySql.createPool({host:'localhost',user:'root',password:'123456',database:'Exclison',maxConnection:12});
// let db = mySql.createConnection({host:'localhost',user:'root',password:'123456',database:'Exclison'});
// console.log(db);

db.query('SELECT * FROM user',(err,data)=>{
	if(err){
		console.error(err);
	}
	if(data){
		console.log(data);
	}
})
