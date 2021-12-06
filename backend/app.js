require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const errorsMy = require('./middlewares/errors');
const NotFoundError = require('./errors/not-found-err');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors-handler');

const mongoose = require('mongoose', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const userRouters = require('./routes/user');
const cardRouters = require('./routes/card');

const app = express();

const mestodb = 'mongodb://localhost:27017/mestodb';
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(requestLogger);
app.use(cors);

app.use('/', userRouters);
app.use('/', cardRouters);

app.use('*', auth, () => { throw new NotFoundError('Не найдено'); });

app.use(errorLogger);
app.use(errors());
app.use(errorsMy);

app.listen(PORT, () => {
  console.log(`Server start http://localhost:${PORT}`);
});

mongoose.connect(mestodb);
