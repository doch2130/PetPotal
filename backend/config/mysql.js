const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'pettotal',
  port: '3306',
});

connection.connect((err) => {
  if(err) { 
    console.error("Main DB connect Failed");
    console.error(err);
    process.exit();
  }
  else { 
    console.log('Main DB connected')
  };
});

module.exports = connection;
