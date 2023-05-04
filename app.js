require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const { login, createUser } = require('./controllers/users')
const cardRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const errorHandler = require('./utils/errorHandler');
const {
  PORT = 3000,
  MONGODB_URL = 'mongodb://127.0.0.1:27017/mestodb'
} = process.env;
const app = express();
const { celebrate, Joi, errors } = require('celebrate');
const { LINK_VALIDATOR } = require('./utils/constants');
const NotFoundError = require('./errors/NotFoundError');

mongoose.connect(MONGODB_URL);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(LINK_VALIDATOR),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);

app.use('/cards', cardRouter);
app.use('/users', userRouter);
app.use('*', () => {
  throw new NotFoundError('Запрошен несуществующий роут');
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})