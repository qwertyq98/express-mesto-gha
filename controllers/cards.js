const Card = require('../models/card');
const { checkError } = require('../utils/utils');

module.exports.createCard = (req, res ) => {
  const { name, link } = req.body;

  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then(card => res.status(201).send({ data: card }))
    .catch((err) => checkError(err, res));
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.status(200).send({ data: cards }))
    .catch((err) => checkError(err, res));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => {
      if (card) {
        res.status(200).send({ data: card });
      }
    })
    .catch((err) => checkError(err, res));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then(likes => {
      if(likes) {
        res.status(201).send({ data: likes })
      }
    })
    .catch((err) => checkError(err, res));
}

module.exports.dislikeCard = (req, res ) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
  .then(likes => {
    if(likes) {
      res.status(200).send({ data: likes })
    }
  })
  .catch((err) => checkError(err, res));
}

