const asyncHandler = require('express-async-handler');
const db = require('../dbconfig/db');

const getAuthPage = asyncHandler(async (req, res) => {
  res.render('login');
});
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const sqlQuery = 'SELECT * FROM user WHERE username = ? AND password = ?';
  db.query(sqlQuery, [username, password], (err, result) => {
    if (err) return err.message;
    if (result.length === 0) {
      res.status(403).redirect('/');
    } else {
      req.session.isLoggedIn = username;
      res.status(302).redirect('/dashboard');
    }
  });
});

module.exports = {
  getAuthPage,
  authUser,
};
