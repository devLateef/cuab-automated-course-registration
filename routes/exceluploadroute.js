const express = require('express');
const router = express.Router();
const path = require('path');
const {
  importFileToDb,
  uploadStudentFile,
} = require('../controllers/excelupload.controller');

router.post('/upload-student', uploadStudentFile.single('file'), (req, res) => {
  // Handle the request after the file has been uploaded
  const filePath = path.join(__dirname, '..', 'public', 'uploads', 'students');
  importFileToDb(filePath);

  // Send a response to the client
  res.status(200).send('File uploaded successfully');
});

module.exports = router;
