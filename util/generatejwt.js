const jwt = require('jsonwebtoken');

const generateToken = async (username) => {
  try {
    const token = jwt.sign({ username }, 'jsonwebtoken is working', {
      expiresIn: '1h',
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};

module.exports = generateToken;
