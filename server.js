const express = require('express');
const dotenv = require('dotenv');
const ejs = require('ejs');
const stdRoutes = require('./routes/studentmanagerroute');

require('./dbconfig/db.js');

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('dashboard');
});

app.get('/coursereg', (req, res) => {
  res.render('courseForm');
});

app.use(stdRoutes);

app.get('/coursemanager', (req, res) => {
  res.render('coursemanager');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
