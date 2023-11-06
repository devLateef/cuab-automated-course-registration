const db = require('../dbconfig/db');
const asyncHandler = require('express-async-handler');

const getCourseRegView = asyncHandler(async (req, res) => {
  try {
    res.render('courseregistration', { courseData: null, studentData: null });
  } catch (err) {
    console.error('Error rendering course registration view:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const getStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const sqlQuery = `SELECT * FROM student_data WHERE MatriculationNo = ?`;
  try {
    db.query(sqlQuery, [id], (err, results) => {
      if (err) {
        throw err;
      }
      res.render('courseregistration', {
        studentData: results,
        courseData: null,
      });
    });
    
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
const getStudentJson = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const sqlQuery = `SELECT * FROM student_data WHERE MatriculationNo = ?`;
  try {
    db.query(sqlQuery, [id], (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json(results)
    });
    
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
const getCourses = asyncHandler(async (req, res) => {
  const { department, level, matricNo } = req.query;
  const sqlQuery = 'SELECT * FROM courses WHERE level = ? AND Dept = ?';
  const sqlQuery2 = 'SELECT * FROM registrations WHERE matricNo = ?';
  try {
    db.query(sqlQuery, [level, department], (err, courseResults) => {
      if (err) {
        throw err;
      }
      db.query(sqlQuery2, [matricNo], (err, registrationResults) => {
        if (err) {
          throw err;
        }
        const finalResult = courseResults.map((result) => {
          const isRegistered = registrationResults.some(
            (data) => parseFloat(data.courseId) === parseFloat(result.id),
          );
          return { ...result, selected: isRegistered };
        });
        console.log(finalResult)
        res.status(200).render('courseregistration', {
          courseData: finalResult,
          studentData: null,
        });
      });
    });
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// const registeredCourse = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const sqlQuery =
//     'SELECT courseId, studentId, matricNo, code FROM student_data INNER JOIN registrations ON student_data.id = registrations.studentId INNER JOIN courses ON registrations.courseId = courses.id WHERE student_data.MatriculationNo = ?';

//   try {
//     db.query(sqlQuery, [id], (err, results) => {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }
//       res.status(200).json(results);
//     });
//   } catch (err) {
//     console.error('Database query error:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

const addCourse = asyncHandler(async (req, res) => {
  const data = req.body;
  const sqlQuery = 'INSERT INTO registrations SET ?';

  try {
    db.query(sqlQuery, data, (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json(results);
    });
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const removeCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const sqlQuery = 'DELETE FROM registrations WHERE courseId = ?';

  try {
    db.query(sqlQuery, [id], (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json(results);
    });
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const generateCourseForm = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const sqlQuery =
    'SELECT * FROM student_data INNER JOIN registrations ON student_data.id = registrations.studentId INNER JOIN courses ON registrations.courseId = courses.id WHERE student_data.MatriculationNo = ?';

  try {
    db.query(sqlQuery, [id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Assuming "courseForm" is an EJS template
      res.status(200).render('courseForm', { data: results });
    });
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = {
  generateCourseForm,
  removeCourse,
  getCourses,
  addCourse,
  getStudent,
  getCourseRegView,
  // registeredCourse,
  getStudentJson
};
