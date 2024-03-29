const express = require('express');
const dotenv = require('dotenv');
const ejs = require('ejs');
const expressSession = require('express-session');
const stdRoutes = require('./routes/studentmanagerroute.js');
const courseRoutes = require('./routes/coursesmanagerroute.js');
const courseRegRoutes = require('./routes/courseregistrationroute.js');
const authRoutes = require('./routes/authroute.js');
const { errorHandler } = require('./middlewares/errorHandler.js');


require('./dbconfig/db.js');

dotenv.config();

const app = express();

const port = process.env.PORT || 80;

app.use(express.static('public'));
app.use(
  expressSession({
    secret: 'Coding is simple',
    resave: false,
    saveUninitialized: true,
  }),
);
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

//Auth
app.use(authRoutes);

// Student Route
app.use(stdRoutes);

// Course Registration Route
app.use(courseRegRoutes);
app.use(courseRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
