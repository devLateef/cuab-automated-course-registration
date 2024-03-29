const express = require('express');
const router = express.Router();

const {
  getCourses,
  generateCourseForm,
  getExamPassView,
  generateExamPass,
  removeCourse,
  addCourse,
  getStudent,
  getCourseRegView,
  getStudentJson,
  saveToDb,
  getStudentForPass,
  addStudentToDB,
  updateIsPrinted
} = require('../controllers/courseregistration');

// The id is refering to the student's matric no, except the updateIsPrinted id which is the id for the record I want to update
router.get('/course-registration', getCourseRegView);
router.get('/course-registration/q', getCourses);
router.get('/course-registration/:id', getStudent);
router.get('/course-registrations/:id', getStudentJson);
router.get('/courseform/:id', generateCourseForm);
router.get('/exampass', getExamPassView);
router.get('/exampass/:id', generateExamPass);
router.get('/exam-pass/:id', getStudentForPass);
router.post('/exam-pass', addStudentToDB);
router.patch('/exam-pass/:id', updateIsPrinted);
router.post('/courses/store', addCourse);
router.get('/courses/save', saveToDb);
router.delete('/course-registration/:id', removeCourse);

module.exports = router;
