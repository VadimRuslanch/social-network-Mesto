require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { validationCreateUser, validationLogin } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsErr = require('./middlewares/corsErr');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger);

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);
app.use(auth);
app.use(routes);
app.use(errorLogger);
app.use(corsErr);

async function connect() {
  try {
    await mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://localhost:27017/mestodb', {
      family: 4,
    });
    // eslint-disable-next-line no-console
    console.log(`App connected ${MONGO_URL}`);
    await app.listen(PORT);
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${PORT}`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

app.use(errors());
app.use((err, __, res, next) => {
  // eslint-disable-next-line no-console
  console.log(err);
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    statusCode, message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

connect();
