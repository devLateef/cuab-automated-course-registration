const asyncHandler = require('express-async-handler');
const redirectIfNotAuthenticated = asyncHandler(async (req, res, next) => {
  console.log(req.session.isLoggedIn)
  if (!req.session.isLoggedIn) {
    return res.status(302).redirect('/');
  }
  next();
});

module.exports = {
  redirectIfNotAuthenticated,
};
