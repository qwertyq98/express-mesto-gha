const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '643d8d569a9ca187e44e7fe5'
  };
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', ({ res }) => {
  return res.status(404).send({ message: 'Запрошен несуществующий роут' });
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})