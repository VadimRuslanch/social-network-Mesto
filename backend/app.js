require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
const { errors } = require('celebrate');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsAccess = require('./middlewares/corsAccess');
const router = require('./routes');
const config = require('./config');

const app = express();

const startServer = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI, {
      family: 4,
    });
    // eslint-disable-next-line no-console
    console.log('Подключено к MongoDB');
    await app.listen(config.PORT);
    // eslint-disable-next-line no-console
    console.log(`Сервер запущен на порте: ${config.PORT}`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Ошибка подключения к MongoDB', err);
  }
};

// app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(corsAccess);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handleError);

startServer();
