const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'pro7'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});

module.exports = connection;