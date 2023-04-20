const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'pettotal',
  port: '3306',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('DB connected');
});

module.exports = connection;
