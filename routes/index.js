const indexRouter = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const signupRouter = require('./signup');
const signinRouter = require('./signin');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

indexRouter.use('/signup', signupRouter);
indexRouter.use('/signin', signinRouter);

indexRouter.use(auth);

indexRouter.use('/cards', cardRouter);
indexRouter.use('/users', userRouter);
indexRouter.use('*', (req, res, next) => {
  next(new NotFoundError('Запрошен несуществующий роут'));
});

module.exports = indexRouter;
