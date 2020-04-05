(async () => {
  const mysql = require("mysql2/promise");
  // 连接设置
  const cfg = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodemysql"
  };

  // 创建连接
  const connection = await mysql.createConnection(cfg);

  const CREATE_SQL = `CREATE TABLE IF NOT EXISTS test (
    id INT NOT NULL AUTO_INCREMENT,
    message VARCHAR(45) NULL,
    PRIMARY KEY (id))`;
    const INSERT_SQL = `INSERT INTO test(message) VALUES(?)`;
    const SELECT_SQL = `SELECT * FROM test`;

  // 创建表
  let ret = await connection.execute(CREATE_SQL);
  console.log('create:', ret)
  ret = await connection.execute(INSERT_SQL, ['abc']);
  console.log('insert:', ret)
  const [rows, fileds] = await connection.execute(SELECT_SQL);
  console.log('select:', JSON.stringify(rows))
})();
