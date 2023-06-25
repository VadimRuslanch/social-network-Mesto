require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const errorServer = require('./errors/errorServer');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/corsErr');
const routes = require('./routes/index');
const config = require('./config');

const app = express();

const startServer = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
    });
    console.log('Подключено к MongoDB');
    await app.listen(config.PORT);
    console.log(`Сервер запущен на порте: ${config.PORT}`);
  } catch (err) {
    console.log('Ошибка подключения к MongoDB', err);
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cors);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorServer);

startServer();
