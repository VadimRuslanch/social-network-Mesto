require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
const { errors } = require('celebrate');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const router = require('./routes');
const { MONGODB_URI, PORT } = require('./config');

const app = express();

const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      family: 4,
    });
    console.log('Подключено к MongoDB');
    await app.listen(PORT);
    console.log(`Сервер запущен на порте: ${PORT}`);
  } catch (err) {
    console.log('Ошибка подключения к MongoDB', err);
  }
};

// app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cors);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handleError);

startServer();
