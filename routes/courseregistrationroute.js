const express = require('express');
const router = express.Router();
const {
  getCourses,
  generateCourseForm,
  removeCourse,
  addCourse,
  getCourseRegView,
  registeredCourse,
} = require('../controllers/courseregistration');
const { getStudent } = require('../controllers/studentmanager');

// The id is refering to the student's matric no
router.get('/course-registration', getCourseRegView);
router.get('/filter', getCourses);
router.get('/course-registration/:id', getStudent);
router.get('/courseform/:id', generateCourseForm);
router.get('/registered/:id', registeredCourse);
router.delete('/course-registration/:id', removeCourse);
router.post('/course-registration', addCourse);

module.exports = router;
