const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const JWT_SECRET = require('../config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(
      token,
      JWT_SECRET,
    );
  } catch (err) {
    return next(new UnauthorizedError('Неверный электронный адрес или пароль'));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
