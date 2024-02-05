require('dotenv').config();
const JWT = require("jsonwebtoken");
require('dotenv').config();
const secret = process.env.JWT_SECRET;
/**
 * This function is used to generate a JWT authentication
 * token for a specific user.
 * JWTs in 100 Seconds: https://www.youtube.com/watch?v=UBUNrFtufWo
 */
const generateToken = (user_id) => {
  return JWT.sign(
    {
      user_id: user_id,
      iat: Math.floor(Date.now() / 1000),

      // Set the JWT token to expire in 30 minutes
      exp: Math.floor(Date.now() / 1000) + 10 * 60,
    },
    secret
  );
};

const decodeToken = (token) => {
  return JWT.decode(token, secret);
};

module.exports = { generateToken, decodeToken };