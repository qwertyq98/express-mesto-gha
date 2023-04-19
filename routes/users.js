const { createUser, getUser, getUserById, updateUser, updateUserAvatar } = require('../controllers/users');
const userRouter = require('express').Router();

userRouter.post('/', createUser);
userRouter.get('/', getUser);
userRouter.get('/:userId', getUserById);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateUserAvatar);

module.exports = userRouter;