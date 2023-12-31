const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const config = require('../config');

// Поиск всех пользователей
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) { next(err); }
};

// Поиск по ID
const getUserById = async (req, res, next) => {
  try {
    let action;

    if (req.path === '/me') {
      action = req.user._id;
    } else {
      action = req.params.id;
    }

    const user = await User.findById(action);

    if (!user) {
      throw new NotFoundError('Пользователь по указанному _id не найден.');
    }

    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные.'));
    } else {
      next(err);
    }
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: hash,
    });
    res.status(201).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    });
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError('Пользователь с таким электронным адресом уже существует'));
    } else if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
    } else {
      next(err);
    }
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 36000000,
          httpOnly: true,
          sameSite: true,
        });
      res
        .status(200)
        .send(user);
    })
    .catch(next);
};

const editProfile = async (req, res, next) => {
  try {
    const action = {};

    if (req.path === '/me/avatar') {
      action.avatar = req.body.avatar;
    } else {
      action.name = req.body.name;
      action.about = req.body.about;
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      action,
      { new: true, runValidators: true },
    );

    if (!user) {
      throw new NotFoundError('Пользователь с указанным _id не найден.');
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(
        `Переданы некорректные данные при обновлении ${req.path === '/me/avatar' ? 'аватара' : 'профиля'}.`,
      ));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getUsers,
  getUserById,
  editProfile,
  login,
  createUser,
};
