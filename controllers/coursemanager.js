const asyncHandler = require('express-async-handler');
const db = require('../dbconfig/db');

const getAllCourses = asyncHandler(async(req, res)=>{
    const sql = 'SELECT * FROM courses LIMIT 20'
    db.query(sql, (err, results)=>{
        if(err) return err.message;
        res.status(200).render('coursemanager', { results });
    });
});

const getCourse = asyncHandler(async (req, res) => {
    const { code } = req.params;
  
    const sql = `SELECT * FROM courses WHERE CourseCode = ?`;
  
    db.query(sql, [code], (err, result) => {
      if (err) return err.message;
      res.status(200).json({ result });
    });
  });

module.exports = {
    getAllCourses,
    getCourse,
}
