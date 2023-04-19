const { createCard, getCards, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');
const cardRouter = require('express').Router();

cardRouter.post('/', createCard);
cardRouter.get('/', getCards);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardRouter;