require('dotenv').config();

const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

pool.connect((err)=>{
  if(err) return err.message;
  console.log('Connected to the Database Successfully');
})

module.exports = pool;
