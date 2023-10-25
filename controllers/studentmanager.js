const db = require('../dbconfig/db.js');
const asyncHandler = require('express-async-handler');

const getStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const sqlQuery = `SELECT * FROM student_data WHERE MatriculationNo = ?`;

  db.query(sqlQuery, [id], (err, results) => {
    if (err) return err.message;
    res.status(200).json({ results });
  });
});

const getStudents = asyncHandler((req, res) => {
  const sqlQuery = `SELECT * FROM student_data limit 40`;

  db.query(sqlQuery, (err, results) => {
    if (err) return err.message;
    res.status(200).render('studentmanager', { results });
  });
});

const getDahsboard = asyncHandler((req, res)=>{
    res.render('dashboard');
});

module.exports = {
  getStudent,
  getStudents,
  getDahsboard,
};
