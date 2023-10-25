const express = require('express');
const router = express.Router();
const {
  getCourses,
  registerCourse,
  removeCourse,
  addCourse,
  getCourseRegView,
} = require('../controllers/courseregistration');
const { getStudent } = require('../controllers/studentmanager');

// The id is refering to the student's matric no
router.get('/course-registration', getCourseRegView);
router.get('/filter', getCourses);
router.get('/course-registration/:id', getStudent);
router.get('/register-course', registerCourse);
router.delete('/course-registration/:id', removeCourse);
router.post('/course-registration/:id', addCourse);

module.exports = router;
