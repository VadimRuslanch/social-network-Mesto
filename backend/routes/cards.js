const cardsRouter = require('express').Router();

const {
  getCards, createCard, deleteCard, handleCardLike,
} = require('../controllers/cards');

const {
  validationCreateCard,
  validationCardById,
} = require('../middlewares/validation');

cardsRouter.get('/', getCards);
cardsRouter.post('/', validationCreateCard, createCard);
cardsRouter.delete('/:cardId', validationCardById, deleteCard);
cardsRouter.put('/:cardId/likes', validationCardById, handleCardLike);
cardsRouter.delete('/:cardId/likes', validationCardById, handleCardLike);

module.exports = cardsRouter;
