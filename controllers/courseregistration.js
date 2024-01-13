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
      res.status(200).json(results);
    });
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const getCourses = asyncHandler(async (req, res) => {
  const { department, level, matricNo } = req.query;
  const sqlQuery = 'SELECT * FROM courses WHERE Level = ? AND Dept = ?';
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
          const registrationInfo = registrationResults.find((data) => {
            return parseFloat(data.courseId) === parseFloat(result.id);
          });

          const isRegistered = registrationInfo
            ? { selected: true, regId: registrationInfo.id }
            : { selected: false, regId: null };

          return { ...result, ...isRegistered };
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

const addCourse = asyncHandler(async (req, res) => {
  const data = req.body;
  // const sqlQuery = 'INSERT INTO registrations SET ?';

  try {
    req.session.myData = data;
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
            // console.log('Inserted data:', results);
          }
        },
      );
    }

    req.session.myData = [];
    res.redirect(`/courseform/${data[0].matricNo}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const removeCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const sqlQuery = 'DELETE FROM registrations WHERE id = ?';

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
    'SELECT courses.*, registrations.*, student_data.*, student_data.Level AS stdLevel FROM student_data INNER JOIN registrations ON student_data.id = registrations.studentId INNER JOIN courses ON registrations.courseId = courses.id WHERE student_data.MatriculationNo = ?';
  try {
    db.query(sqlQuery, [id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      results.sort((a, b) => {
        const courseCodeA = a.CourseCode.toUpperCase(); // Convert to uppercase for case-insensitive sorting
        const courseCodeB = b.CourseCode.toUpperCase();

        if (courseCodeA < courseCodeB) {
          return -1;
        } else if (courseCodeA > courseCodeB) {
          return 1;
        } else {
          return 0;
        }
      });

      // Assuming "courseForm" is an EJS template
      res.status(200).render('courseForm', { data: results });
    });
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const getExamPassView = asyncHandler(async (req, res) => {
  try {
    res.render('exampasspage', {
      studentData: null
    });
  } catch (err) {
    console.error('Error rendering course exam pass view:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const generateExamPass = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const sqlQuery =
    'SELECT courses.*, registrations.*, student_data.*, student_data.Level AS stdLevel FROM student_data INNER JOIN registrations ON student_data.id = registrations.studentId INNER JOIN courses ON registrations.courseId = courses.id WHERE student_data.MatriculationNo = ?';
  try {
    db.query(sqlQuery, [id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      results.sort((a, b) => {
        const courseCodeA = a.CourseCode.toUpperCase(); // Convert to uppercase for case-insensitive sorting
        const courseCodeB = b.CourseCode.toUpperCase();

        if (courseCodeA < courseCodeB) {
          return -1;
        } else if (courseCodeA > courseCodeB) {
          return 1;
        } else {
          return 0;
        }
      });

      // Assuming "courseForm" is an EJS template
      res.status(200).render('exampass', { data: results });
    });
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const addStudentToDB = asyncHandler(async (req, res, next) => {
  const { matricNo } = req.body;
  const sqlQuery ='INSERT INTO exampass (matricno, isPrinted) VALUES (?, ?)';
  const sqlQuery2 = `SELECT * FROM exampass WHERE matricno = ?`;
  
  try {
    db.query(sqlQuery2, [matricNo], (err, results) => {
      if (err) {
        throw err;
      }
      if(!results?.length) {
        db.query(sqlQuery, [matricNo, false], (err, insertRes) => {
          if(err) throw err
          // console.log('Data inserted', insertRes)
        })
      }
      next()
    });
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const getStudentForPass = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const sqlQuery = `SELECT * FROM student_data WHERE MatriculationNo = ?`;
  const sqlQuery2 = `SELECT * FROM exampass WHERE matricno = ?`;
  try {
    db.query(sqlQuery, [id], (err, stdResults) => {
      if (err) {
        throw err;
      }
      db.query(sqlQuery2, [id], (err, passResults) => {
        if(err){
          throw err
        }
        res.render('exampasspage', {
          studentData: stdResults,
          examPass: passResults
        });
      })
    });
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const updateIsPrinted = asyncHandler(async(req, res) => {
  const { id } = req.params
  const { isPrinted } = req.body

  const sql = 'UPDATE exampass SET isPrinted = ? WHERE id = ?';
  try {
    db.query(sql, [isPrinted, id], (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json(results);
    });
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

module.exports = {
  generateCourseForm,
  getExamPassView,
  generateExamPass,
  removeCourse,
  getCourses,
  addCourse,
  getStudent,
  getCourseRegView,
  saveToDb,
  getStudentJson,
  getStudentForPass,
  addStudentToDB,
  updateIsPrinted
};
