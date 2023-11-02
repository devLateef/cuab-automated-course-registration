const asyncHandler = require('express-async-handler');

const user = { username: 'admin', password: 'ictec2023' };

const getAuthPage = asyncHandler(async (req, res) => {
  res.render('login');
});
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (
    username.toLowerCase() === user.username &&
    password.toLowerCase() === user.password
  ) {
    res.redirect('/dashboard');
  }else{
    res.render('/')
  }
});

module.exports = {
  getAuthPage,
  authUser
};
