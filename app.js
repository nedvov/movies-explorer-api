require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { handleErrors } = require('./middlewares/handleErrors');
const { handleCors } = require('./middlewares/handleCors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { MONGO_URL } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

mongoose.set('strictQuery', true);

app.use(helmet());

app.use(limiter);

app.use(bodyParser.json());
app.use(cookieParser());

app.use(handleCors);

app.use(requestLogger);
app.use(router);
app.use(errorLogger);

mongoose.connect(MONGO_URL, {})
  .catch((err) => {
    console.log(err.message);
  });

app.use(errors({ message: 'Ошибка. Переданы некорректные данные' }));

app.use(handleErrors);

module.exports = app;
