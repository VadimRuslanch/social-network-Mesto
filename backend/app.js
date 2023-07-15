require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
// const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const config = require('./config');

const app = express();

const startServer = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI, {
      family: 4,
    });
    console.log('Подключено к MongoDB');
    await app.listen(config.PORT);
    console.log(`Сервер запущен на порте: ${config.PORT}`);
  } catch (err) {
    console.log('Ошибка подключения к MongoDB', err);
  }
};

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(cookieParser());

app.use(bodyParser.json());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

// app.use(handleError);

startServer();
