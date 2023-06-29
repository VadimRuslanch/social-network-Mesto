require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const routes = require('./routes');
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

// const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

// async function connect() {
//   try {
//     await mongoose.set('strictQuery', false);
//     await mongoose.connect('mongodb://localhost:27017/mestodb', {
//       family: 4,
//     });
//     console.log(`App connected ${MONGO_URL}`);
//     await app.listen(PORT);
//     console.log(`App listening on port ${PORT}`);
//   } catch (err) {
//     console.log(err);
//   }
// }

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cors);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(handleError);

startServer();
