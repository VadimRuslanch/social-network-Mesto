const usersRouter = require('express').Router();

const {
  getUsers, getUserById, editProfile,
} = require('../controllers/users');

const {
  validationUpdateUser, validationUpdateAvatar, validationUserId,
} = require('../middlewares/validation');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUserById);
usersRouter.get('/:userID', validationUserId, getUserById);
usersRouter.patch('/me', validationUpdateUser, editProfile);
usersRouter.patch('/me/avatar', validationUpdateAvatar, editProfile);

module.exports = usersRouter;
