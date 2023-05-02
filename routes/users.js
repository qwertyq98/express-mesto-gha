const { getUser, getUserById, updateUser, updateUserAvatar, getUserMeById } = require('../controllers/users');
const userRouter = require('express').Router();

userRouter.get('/me', getUserMeById);
userRouter.get('/', getUser);
userRouter.get('/:userId', getUserById);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateUserAvatar);

module.exports = userRouter;