const jsonweb = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const config = require('../config');

const auth = (req, res, next) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jsonweb.verify(jwt, config.JWT_SECRET);
    req.user = payload;
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  return next();
};

module.exports = auth;
