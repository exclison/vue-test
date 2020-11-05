(async () => {

    const mysql = require('mysql2/promise')
    //连接设置
    const cfg = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'testnode'
    }

    const connection = await mysql.createConnection(cfg)

    const CRTATE_SQL = `CREATE TABLE IF NOT EXISTS test (
                        id INT NOT NULL AUTO_INCREMENT,
                        message VARCHAR(45) NULL,
                        PRIMARY KEY (id))`

    let ret = await connection.execute(CRTATE_SQL)
    console.log('create',ret)

    const INSERT_SQL = `INSERT INTO test(message) VALUES(?)`

    ret = await connection.execute(INSERT_SQL,['ABC'])
    console.log('insert',ret)

    const [rows,fields] = await connection.execute(`SELECT * FROM test`)

    console.log('select:',JSON.stringify(rows))
    
})()