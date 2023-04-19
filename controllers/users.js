const User = require('../models/user');
const { checkError } = require('../utils/utils');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.status(201).send({ data: user }))
    .catch((err) => checkError(err, res));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      res.send({ data: user });
    })
    .catch((err) => checkError(err, res));
};

module.exports.getUser = (req, res) => {
  User.find({})
    .then(users => res.status(201).send({ data: users }))
    .catch((err) => checkError(err, res));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then(user => res.status(201).send({ data: user }))
    .catch((err) => checkError(err, res));
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then(user => res.status(201).send({ data: user }))
    .catch((err) => checkError(err, res));
};