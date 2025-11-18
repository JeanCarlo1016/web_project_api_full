const jwt = require('jsonwebtoken');
const { authError } = require('../errors/errors'); // <--- Importar clase personalizada
const JWT_SECRET = 'secret';

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new authError('Token inválido o ausente'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;

    return next();
  } catch (err) {
    return next(new authError('Token inválido'));
  }
};
