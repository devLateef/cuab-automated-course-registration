const express = require('express');
const router = express.Router();
const {
  getStudent,
  getStudents,
  getDahsboard,
  logout,
} = require('../controllers/studentmanager');

// router.get('/student-manager', studentManagerView);
router.get('/dashboard', getDahsboard);
router.get('/student-manager', getStudents);
router.get('/student-manager/:id', getStudent);
router.get('/logout', logout);

module.exports = router;



