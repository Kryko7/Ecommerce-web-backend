const express = require("express");

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'project'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});

const app = express();
app.get("/", (req, res) => {
    res.send("Hello Project");
});

app.listen(3000, () => console.log("Server is listening to port 3000"));



minidu thiranjays
