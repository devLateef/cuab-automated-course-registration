const express = require('express');
const router = express.Router();

const {
  getCourses,
  generateCourseForm,
  removeCourse,
  addCourse,
  getStudent,
  getCourseRegView,
  getStudentJson,
  saveToDb
} = require('../controllers/courseregistration');

// The id is refering to the student's matric no
router.get('/course-registration', getCourseRegView);
router.get('/course-registration/q', getCourses);
router.get('/course-registration/:id', getStudent);
router.get('/course-registrations/:id', getStudentJson);
router.get('/courseform/:id', generateCourseForm);
router.post('/courses/store', addCourse);
router.get('/courses/save', saveToDb);
router.delete('/course-registration/:id', removeCourse);

module.exports = router;
