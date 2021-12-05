const CardModel = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getAllCards = (req, res, next) => {
  CardModel.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      next();
    });
};

module.exports.createCard = (req, res, next) => {
  const user = req.user._id;
  const { name, link } = req.body;
  if (!name || !link) {
    throw new BadRequestError('400 — Переданы некорректные данные при создании карточки.');
  }
  return CardModel.create({ name, link, owner: user })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('400 — Переданы некорректные данные при создании карточки.'));
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  CardModel.findById(cardId)
    .orFail(() => new NotFoundError('404 — Карточка по указанному _id не найден.'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('Карточка вам не пренадлежит!');
      }
      CardModel.findByIdAndRemove(cardId)
        .then(() => {
          res.status(200).send({ message: 'Карточка удалена!' });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError('400 — Переданы некорректные данные для удаления карточки'));
      }
      next(err);
    });
};

module.exports.setLike = (req, res, next) => {
  CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('404 — Передан несуществующий _id карточки.');
      }
      return res.status(200).send({ message: 'Лайк поставлен!' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('400 — Переданы некорректные данные для постановки/снятии лайка.'));
      }
      next(err);
    });
};

module.exports.deleteLike = (req, res, next) => {
  CardModel.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('404 — Передан несуществующий _id карточки.');
      }
      return res.status(200).send({ message: 'Лайк Удалён!' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('400 — Переданы некорректные данные для постановки/снятии лайка.'));
      }
      next(err);
    });
};
