const express = require('express');
const dotenv = require('dotenv');
const ejs = require('ejs');
const stdRoutes = require('./routes/studentmanagerroute');
const courseRoutes = require('./routes/coursesmanagerroute');
const courseRegRoutes = require('./routes/courseregistrationroute');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

require('./dbconfig/db.js');

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/coursereg', (req, res) => {
  res.render('courseForm');
});

// Student Route
app.use(stdRoutes);

// Course Registration Route
app.use(courseRegRoutes);
app.use(courseRoutes);

// const DataTable = require('datatables.net-dt')
// let table = new DataTable('#my_table', {
//   responsive: true
// });

// app.get('/coursemanager', (req, res) => {
//   res.render('coursemanager');
// });

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
