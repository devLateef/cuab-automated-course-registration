const express = require('express');
const router = express.Router();
const {getAllCourses, getCourse} = require('../controllers/coursemanager');

router.route('/coursemanager').get(getAllCourses);
router.route('/course/:code').get(getCourse);


module.exports = router