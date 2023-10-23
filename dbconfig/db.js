const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
});

// const sql = 'SELECT * FROM cuab.registrations';

// pool.query(sql, function(err, result){
//     if(err) return console.log({error: err.message});
//     console.log(result);
// })

module.exports = pool.promise();