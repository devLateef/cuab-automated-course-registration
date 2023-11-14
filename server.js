const express = require('express');
const dotenv = require('dotenv');
const ejs = require('ejs');
const expressSession = require('express-session');
const stdRoutes = require('./routes/studentmanagerroute');
const courseRoutes = require('./routes/coursesmanagerroute');
const courseRegRoutes = require('./routes/courseregistrationroute');
const authRoutes = require('./routes/authroute');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const protect = require('./middlewares/jwtAuthMiddleware.js');
const { redirectIfNotAuthenticated } = require('./middlewares/redirectIfAuthenticated.js');

require('./dbconfig/db.js');

dotenv.config();

const app = express();

const port = process.env.PORT || 80;

app.use(express.static('public'));
app.use(
  expressSession({
    secret: 'Coding is simple',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 3600 * 1000 }
  }),
);
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
// app.use(notFound);

//Auth
app.use(authRoutes);
// app.use(protect);
// app.use(redirectIfNotAuthenticated);

// Student Route
app.use(stdRoutes);

// Course Registration Route
app.use(courseRegRoutes);
app.use(courseRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});