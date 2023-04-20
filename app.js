require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect(process.env.MONGO_DB_CONNECTION);

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