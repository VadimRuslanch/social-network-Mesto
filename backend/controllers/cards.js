const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });

    res.status(201).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
    } else {
      next(err);
    }
  }
};

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) { next(err); }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      throw new NotFoundError('Карточка с указанным _id не найдена.');
    }
    if (card.owner.toString() !== req.user._id) {
      throw new ForbiddenError('Нельзя удалить чужую карточку.');
    }
    await card.deleteOne();
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные.'));
    } else {
      next(err);
    }
  }
};

const handleCardLike = async (req, res, method, next) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { [method]: { likes: req.user._id } },
      { new: true },
    );
    if (card === null) {
      throw new NotFoundError('Передан несуществующий _id карточки.');
    }
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные для постановки/снятии лайка.'));
    } else {
      next(err);
    }
  }
};

const likeCard = (req, res) => handleCardLike(req, res, '$addToSet');
const deleteLikeCard = (req, res) => handleCardLike(req, res, '$pull');

module.exports = {
  getCards,
  createCard,
  deleteCard,
  handleCardLike,
  likeCard,
  deleteLikeCard,
};
