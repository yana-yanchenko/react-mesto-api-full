const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/сonflict-err');

module.exports.getAllUsers = (req, res, next) => {
  UserModel.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      next();
    });
};

module.exports.getUserId = (req, res, next) => {
  const { userId } = req.params;
  UserModel.findById(userId)
    .orFail(() => new NotFoundError('404 — Пользователь по указанному _id не найден.'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('400 — Переданы некорректные данные для поиска пользователя'));
      }
      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!email || !password) {
    throw new BadRequestError('email или password отсутсвует!');
  }
  return bcrypt.hash(password, 10)
    .then((hash) => UserModel.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => {
        res.status(200).send({
          id: user._id, email: user.email, name: user.name, abote: user.aboute, avatar: user.avatar,
        });
      })
      .catch((err) => {
        if (err.name === 'ValidationError' || err.name === 'CastError') {
          next(new BadRequestError('400 — Переданы некорректные данные при регистрации пользователя!'));
        }
        if (err.name === 'MongoServerError' && err.code === 11000) {
          next(new ConflictError(`Пользователь с таким ${email} уже существует!`));
        }
        next();
      }));
};

module.exports.updateUserMe = (req, res, next) => {
  const { name, about } = req.body;
  if (!name || !about) {
    throw new BadRequestError('400 — Переданы некорректные данные при обновлении профиля.');
  }
  return UserModel.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .orFail(() => new NotFoundError('404 — Пользователь по указанному _id не найден.'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('404 — Пользователь по указанному _id не найден.'));
      }
      next(err);
    });
};

module.exports.updateUserMeAvatar = (req, res, next) => {
  const { avatar } = req.body;
  if (!avatar) {
    throw new BadRequestError('400 — Переданы некорректные данные при обновлении профиля.');
  }
  return UserModel.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail(() => new NotFoundError('404 — Пользователь по указанному _id не найден.'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError('400 — Переданы некорректные данные при обнавлении аватара'));
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  UserModel.findUserByCredentials(email, password)
    .then((user) => {
      const payload = { _id: user._id };
      res.send({
        token: jwt.sign(payload, 'secret', { expiresIn: '7d' }),
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getUserMe = (req, res, next) => {
  UserModel.findById(req.user._id)
    .orFail(() => new NotFoundError('404 — Пользователь по указанному _id не найден.'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('404 — Пользователь по указанному _id не найден.'));
      }
      next(err);
    });
};
