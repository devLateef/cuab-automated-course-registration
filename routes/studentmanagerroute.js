const express = require('express');
const router = express.Router();
const { getStudent, getStudents } = require('../controllers/studentmanager');

// router.get('/student-manager', studentManagerView);
router.get('/student-manager', getStudents);
router.get('/student-manager/:id', getStudent);

module.exports = router;
