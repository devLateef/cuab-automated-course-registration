require('dotenv').config();

const mysql = require('mysql2');

const pool = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

pool.connect((err) => {
  if (err) throw new Error('Can not connect to the database');
  console.log(`Connected to the Database Successfully`);
});

module.exports = pool;
