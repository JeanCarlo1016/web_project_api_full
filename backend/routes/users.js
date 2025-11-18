const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar
} = require('../controllers/users');

router.get('/', getAllUsers);           // GET /users
router.get('/me', getUserById);         // GET /users/me
router.patch('/me', updateProfile);     // PATCH /users/me
router.patch('/avatar', updateAvatar);  // PATCH /users/avatar


module.exports = router;
