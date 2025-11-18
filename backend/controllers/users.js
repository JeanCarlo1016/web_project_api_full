const User = require('../models/user');
const bcrypt = require('bcryptjs');
const {
  NotFoundError,
  BadRequestError
} = require('../errors/errors');

// Obtener todos los usuarios
const getAllUsers = (req, res, next) => {
  User.find({})
    .then(users => res.status(200).json(users))
    .catch(next);  // 🔥 pasa error al middleware global
};

// Obtener usuario actual (basado en token)
const getUserById = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then(user => {
      if (!user) {
        throw new NotFoundError('Usuario no encontrado');
      }
      res.status(200).json(user);
    })
    .catch(next);
};

// Crear usuario (signup)
const createUser = async (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  try {
    if (!email || !password) {
      throw new BadRequestError('Email y contraseña son obligatorios');
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash
    });

    res.status(201).json({
      message: 'Usuario registrado con éxito',
      user: {
        name: newUser.name,
        about: newUser.about,
        avatar: newUser.avatar,
        email: newUser.email
      }
    });
  } catch (err) {
    next(err);
  }
};

// Actualizar perfil
const updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then(user => {
      if (!user) {
        throw new NotFoundError('Perfil no encontrado');
      }
      res.status(200).json(user);
    })
    .catch(err => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Datos inválidos'));
      }
      next(err);
    });
};

// Actualizar avatar
const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then(user => {
      if (!user) {
        throw new NotFoundError('Perfil no encontrado');
      }
      res.status(200).json(user);
    })
    .catch(err => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('URL de avatar inválida'));
      }
      next(err);
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar
};
