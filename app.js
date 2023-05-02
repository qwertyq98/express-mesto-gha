require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const { login, createUser } = require('./controllers/users')
const cardRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const { PORT = 3000, MONGODB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();

mongoose.connect(MONGODB_URL);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/cards', cardRouter);
app.use('/users', userRouter);
app.use('*', ({ res }) => {
  return res.status(404).send({ message: 'Запрошен несуществующий роут' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})