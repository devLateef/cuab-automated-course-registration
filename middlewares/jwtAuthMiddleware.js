const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const db = require('../dbconfig/db');

const protect = asyncHandler(async (req, res, next) => {
  try {
    let token = req.session.token;
    if (token) {
      const decoded = jwt.verify(token, 'jsonwebtoken is working');
      if (decoded) {
        const sql = 'SELECT * FROM user WHERE username = ?';
        db.query(sql, [decoded.username], (err, result) => {
          if (err) throw err;
          req.user = decoded.username;
        });
        next();
      } else {
        throw new Error('Token is expired');
      }
    } else {
      throw new Error('Token is null');
    }
  } catch (error) {
    res.redirect('/');
  }
});

module.exports = protect;