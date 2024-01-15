const path = require('path');
const readXlsxFile = require('read-excel-file/node');
const multer = require('multer');

// Database Module
const db = require('../dbconfig/db');

const studentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join('..', 'public', 'uploads', 'students'));
    console.log(path.join('..', 'public', 'uploads', 'students'))
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  },
});
const courseStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join('..', 'public', 'uploads', 'courses'));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  },
});

const uploadStudentFile = multer({ storage: studentStorage });
const uploadCourseFile = multer({ storage: courseStorage });

function importFileToDb(exFile) {
  console.log(exFile)
  readXlsxFile(exFile).then((rows) => {
    rows.shift();
    db.connect((error) => {
      if (error) {
        console.error(error);
      } else {
        let query = 'INSERT INTO user (name, age, location) VALUES ?';
        connection.query(query, [rows], (error, response) => {
          console.log(error || response);
        });
      }
    });
  });
}

module.exports = { importFileToDb, uploadCourseFile, uploadStudentFile };
