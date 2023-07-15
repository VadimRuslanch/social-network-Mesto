const cardsRouter = require('express').Router();
const { validationCreateCard, validationCardById } = require('../middlewares/validation');
const {
  getCards, createCard, deleteCard, likeCard, deleteLikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', validationCreateCard, createCard);
cardsRouter.delete('/:cardId', validationCardById, deleteCard);
cardsRouter.put('/:cardId/likes', validationCardById, likeCard);
cardsRouter.delete('/:cardId/likes', validationCardById, deleteLikeCard);

module.exports = cardsRouter;
