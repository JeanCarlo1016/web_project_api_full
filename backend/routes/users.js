const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  updateProfile,
  updateAvatar
} = require('../controllers/users');

// GET /users
router.get('/', getAllUsers);

// GET /users/me
router.get('/me', getUserById);

// PATCH /users/me
router.patch('/me', updateProfile);

// PATCH /users/avatar
router.patch('/avatar', updateAvatar);

module.exports = router;
