const errorServer = (err, __, res, next) => {
  // eslint-disable-next-line no-console
  console.log(err);
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    statusCode, message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
};

module.exports = errorServer;
