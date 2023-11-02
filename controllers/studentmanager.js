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
  const sqlQuery = `SELECT * FROM student_data`;

  db.query(sqlQuery, (err, results) => {
    if (err) return err.message;
    res.status(200).render('studentmanager', { results });
  });
});

const getDahsboard = asyncHandler((req, res) => {
  const allStdQuery =
    'SELECT COUNT(*) AS data FROM student_data UNION SELECT COUNT(*) FROM courses UNION SELECT COUNT(DISTINCT matricNo) FROM registrations';

  db.query(allStdQuery, (err, result) => {
    if (err) return err.message;
    res.render('dashboard', {
      allStudents: result[0].data,
      allCourses: result[1].data,
      allRegistered: result[2].data,
    });
  });
});

const logout = asyncHandler(async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = {
  getStudent,
  getStudents,
  getDahsboard,
  logout,
};
