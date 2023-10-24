const db = require('../dbconfig/db.js');
const asyncHandler = require('express-async-handler');

// query database using promises

// const studentManagerView = asyncHandler((req, res, next) => {
//   res.render('studentmanager');
//   next();
// });

const getStudent = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const sqlQuery = `SELECT * FROM student_data WHERE MatriculationNo = ?`;

  db.query(sqlQuery, [id], (err, results, fields) => {
    if (err) return err.message;
    res.status(200).json({ results });
  });
};

const getStudents = asyncHandler((req, res) => {
  const sqlQuery = `SELECT * FROM student_data limit 40`;

  db.query(sqlQuery, (err, results, fields) => {
    if (err) return err.message;
    res.status(200).render('studentmanager', { results });
  });
});

module.exports = {
  getStudent,
  getStudents,
};
