const jwt = require("jsonwebtoken");

const createToken = (opts, name = "secret", time = "24h") => {
  return jwt.sign(opts, name, { expiresIn: time });
};

const parseToken = (token, name = "secret") => {
  try {
    return jwt.verify(token, name);
  } catch (err) {
    throw err;
  }
};

module.exports = { createToken, parseToken };
