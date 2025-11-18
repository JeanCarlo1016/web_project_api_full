const express = require('express');
const router = express.Router();

const { createUser } = require('../controllers/users');
const { login } = require('../controllers/login');

router.post('/signup', createUser);   // ok
router.post('/signin', login);        // corregido

module.exports = router;
