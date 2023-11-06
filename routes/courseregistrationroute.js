const express = require('express');
const router = express.Router();

const {
  getCourses,
  generateCourseForm,
  removeCourse,
  addCourse,
  getStudent,
  getCourseRegView,
  // registeredCourse,
  getStudentJson
} = require('../controllers/courseregistration');

// The id is refering to the student's matric no
router.get('/course-registration', getCourseRegView);
router.get('/course-registration/q', getCourses);
router.get('/course-registration/:id', getStudent);
router.get('/course-registrations/:id', getStudentJson);
router.get('/courseform/:id', generateCourseForm);
// router.get('/registered/:id', registeredCourse);
router.delete('/course-registration/:id', removeCourse);
router.post('/course-registration', addCourse);

module.exports = router;
