const express = require('express');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const authRoutes = require('./routes/auth');

const authMiddleware = require('./middleware/auth');

const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 3000;


// Necesario para permitir solicitudes desde tu frontend React
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


// Parseo de JSON
app.use(express.json());


// 2. Conexión MongoDB

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado a MongoDB local'))
  .catch(err => console.error('Error:', err));


// 3. Rutas públicas (sin auth)


app.use('/auth', authRoutes);
// POST /auth/signup
// POST /auth/signin


// 4. Middleware de autenticación


// Todo lo que venga después requiere token
app.use(authMiddleware);


// 5. Rutas protegidas


app.use('/users', usersRoutes);
// GET /users/me
// PATCH /users/me
// PATCH /users/avatar
// GET /users/

app.use('/cards', cardsRoutes);
// GET /cards
// POST /cards
// DELETE /cards/:id
// PUT /cards/:cardId/likes
// DELETE /cards/:cardId/likes


// 6. Ruta 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

// 7. Manejo centralizado de errores
app.use((err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;
  const message = err.message || 'Se ha producido un error en el servidor';

  res.status(status).json({ message });
});


// 7. Iniciar servidor


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
