const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { checkError } = require('../utils/utils');
const jwt = require('jsonwebtoken');

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then(hash => User.create({ name, about, avatar, email, password: hash }))
    .then(user => res.status(201).send({ data: user }))
    .catch((err) => checkError(err, res));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const err = new Error('Пользователь не существует');
      err.name = 'NotFoundError';
      throw err;
    })
    .then(user => {
      if(user) {
        res.send({ data: user });
      }
    })
    .catch((err) => checkError(err, res));
};

module.exports.getUserMeById = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(() => {
      const err = new Error('Пользователь не существует');
      err.name = 'NotFoundError';
      throw err;
    })
    .then(user => {
      if(user) {
        res.send({ data: user });
      }
    })
    .catch((err) => checkError(err, res));
};


module.exports.getUser = (req, res) => {
  User.find({})
    .then(users => res.status(200).send({ data: users }))
    .catch((err) => checkError(err, res));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      const err = new Error('Пользователь не существует');
      err.name = 'NotFoundError';
      throw err;
    })
    .then(user => res.status(200).send({ data: user }))
    .catch((err) => checkError(err, res));
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then(user => res.status(200).send({ data: user }))
    .catch((err) => checkError(err, res));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
          sameSite: true
        })
        .send({ email });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};