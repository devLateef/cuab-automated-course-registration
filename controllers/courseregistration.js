const db = require('../dbconfig/db');
const asyncHandler = require('express-async-handler');
let courseAdded = [];
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
      res.status(200).json(results);
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
  // const sqlQuery = 'INSERT INTO registrations SET ?';

  try {
    // if (!Array.isArray(courseAdded)) {
    //   courseAdded = [];
    // }

    // // Add data to the array
    // courseAdded.push(data);

    // Store the updated array in the session
    req.session.myData = data;

    console.log('Session data:', req.session.myData);
    res.status(200).end();
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const saveToDb = asyncHandler(async (req, res) => {
  const data = req.session.myData;
  const sqlQuery =
    'INSERT INTO registrations (studentId, courseId, matricNo, code) VALUES (?, ?, ?, ?)';
  console.log(req.session.myData);
  try {
    for (const item of req.session.myData) {
      db.query(
        sqlQuery,
        [item.studentId, item.courseId, item.matricNo, item.code],
        (err, results) => {
          if (err) {
            console.error('Error inserting data:', err);
            // You can handle the error here, but don't throw it.
          } else {
            console.log('Inserted data:', results);
          }
        },
      );
    }

    req.session.myData = [];
    res.redirect(`/courseform/${data[0].matricNo}`);
    // Move the db.end() call outside the loop and after all queries have completed.
    // Close the database connection once all queries are finished.
    // db.end((err) => {
    //   if (err) {
    //     console.error('Error closing the database connection:', err);
    //   } else {
    //     console.log('Database connection closed');
    //   }
    // });
  } catch (err) {
    console.error(err);
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
      console.log(results)
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
  saveToDb,
  getStudentJson,
};
