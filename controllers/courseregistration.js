const db = require('../dbconfig/db');
const asyncHandler = require('express-async-handler');

const getCourseRegView = asyncHandler(async (req, res) => {
  res.render('courseregistration');
});

const getCourses = asyncHandler(async (req, res) => {
  const { department, level } = req.query;
  const sqlQuery = 'SELECT * FROM courses WHERE level = ? AND Dept = ?';
  db.query(sqlQuery, [level, department], (err, results) => {
    if (err) return err.message;
    res.status(200).json(results);
  });
});

const registeredCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const sqlQuery =
    'SELECT courseId, studentId, matricNo, code FROM student_data INNER JOIN registrations ON student_data.id = registrations.studentId INNER JOIN courses ON registrations.courseId = courses.id WHERE student_data.MatriculationNo = ?';

  db.query(sqlQuery, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(200).json(results);
  });
});

const addCourse = asyncHandler(async (req, res) => {
  const data = req.body;
  const sqlQuery = 'INSERT INTO registrations SET ?';
  db.query(sqlQuery, data, (err, results) => {
    if (err) return err.message;
    res.status(200).json(results);
  });
});

const removeCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const sqlQuery = 'DELETE FROM registrations WHERE courseId = ?';
  db.query(sqlQuery, [id], (err, results) => {
    if (err) return err.message;
    res.status(200).json(results);
  });
});
const generateCourseForm = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const sqlQuery =
    'SELECT * FROM student_data INNER JOIN registrations ON student_data.id = registrations.studentId INNER JOIN courses ON registrations.courseId = courses.id WHERE student_data.MatriculationNo = ?';

  db.query(sqlQuery, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Assuming "courseForm" is an EJS template
    res.status(200).render('courseForm', { data: results });
  });
});

module.exports = {
  generateCourseForm,
  registeredCourse,
  removeCourse,
  getCourses,
  addCourse,
  getCourseRegView,
};
