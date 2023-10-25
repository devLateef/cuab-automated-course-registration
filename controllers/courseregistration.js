const db = require('../dbconfig/db');
const asyncHandler = require('express-async-handler');

const getCourseRegView = asyncHandler(async (req, res) => {
  res.render('courseregistration');
});

const getCourses = asyncHandler(async (req, res) => {
  const { department, level } = req.query;
  console.log(department, level);
  const sqlQuery = 'SELECT * FROM courses WHERE level = ? AND Dept = ?';
  db.query(sqlQuery, [level, department], (err, results, fields) => {
    if (err) return err.message;
    res.status(200).json(results);
  });
});

const registerCourse = asyncHandler(async (req, res) => {});

const addCourse = asyncHandler(async (req, res) => {});

const removeCourse = asyncHandler(async (req, res) => {});

module.exports = {
  registerCourse,
  removeCourse,
  getCourses,
  addCourse,
  getCourseRegView,
};
