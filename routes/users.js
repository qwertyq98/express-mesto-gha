const { getUser, getUserById, updateUser, updateUserAvatar, getUserMeById } = require('../controllers/users');
const userRouter = require('express').Router();
const { LINK_VALIDATOR } = require('../utils/constants');
const { celebrate, Joi } = require('celebrate');

userRouter.get('/me', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().required().length(24),
  }),
}), getUserMeById);

userRouter.get('/', getUser);

userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().required().length(24),
  }),
}), getUserById);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(LINK_VALIDATOR),
  }),
}), updateUserAvatar);

module.exports = userRouter;