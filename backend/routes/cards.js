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
cardsRouter.delete('/:cardID', validationCardById, deleteCard);
cardsRouter.put('/:cardID/likes', validationCardById, handleCardLike);
cardsRouter.delete('/:cardID/likes', validationCardById, handleCardLike);

module.exports = cardsRouter;
