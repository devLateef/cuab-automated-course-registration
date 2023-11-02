const asyncHandler = require('express-async-handler');
const redirectIfNotAuthenticated = asyncHandler(async (req, res, next) => {
  if (!req.session.isLoggedIn) {
    res.status(302).redirect('/');
    return;
  }
  next();
});

module.exports = {
  redirectIfNotAuthenticated,
};
