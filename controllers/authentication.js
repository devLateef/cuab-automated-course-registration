const asyncHandler = require('express-async-handler');
const db = require('../dbconfig/db');
const generateToken = require('../util/generatejwt');

const getAuthPage = asyncHandler(async (req, res) => {
  res.render('login');
});
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const sqlQuery = 'SELECT * FROM user WHERE username = ? AND password = ?';
  db.query(sqlQuery, [username, password], async (err, result) => {
    if (err) throw err.message;
    if (result.length === 0) {
      res.status(403).redirect('/');
    } else {
      // const token = await generateToken(username);
      req.session.isLoggedIn = username;
      console.log(req.session.isLoggedIn)
      return res.status(302).redirect('/dashboard');
    }
  });
});

module.exports = {
  getAuthPage,
  authUser,
};