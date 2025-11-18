const Card = require('../models/card');
const {
  NotFoundError,
  BadRequestError,
  ForbiddenError
} = require('../errors/errors');

// Obtener todas las cards
const getAllCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then(cards => res.status(200).json(cards))
    .catch(next);
};

// Crear card (con usuario autenticado)
const createCard = (req, res, next) => {
  const { name, link } = req.body;

  if (!name || !link) {
    return next(new BadRequestError('Faltan campos requeridos'));
  }

  Card.create({
    name,
    link,
    owner: req.user._id
  })
    .then(newCard => res.status(201).json(newCard))
    .catch(err => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Datos inválidos para crear la tarjeta'));
      }
      next(err);
    });
};

// Eliminar tarjeta
const deleteCardById = (req, res, next) => {
  const { id } = req.params;

  Card.findById(id)
    .orFail(() => new NotFoundError('Tarjeta no encontrada'))
    .then(card => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('No autorizado para eliminar esta tarjeta');
      }

      return card.deleteOne().then(() => res.status(200).json(card));
    })
    .catch(next);
};

// Like card
const likeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .populate('owner')
    .populate('likes')
    .then(card => {
      if (!card) {
        throw new NotFoundError('Tarjeta no encontrada');
      }
      res.status(200).json(card);
    })
    .catch(next);
};

// Dislike card
const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .populate('owner')
    .populate('likes')
    .then(card => {
      if (!card) {
        throw new NotFoundError('Tarjeta no encontrada');
      }
      res.status(200).json(card);
    })
    .catch(next);
};

module.exports = {
  getAllCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
