const express = require('express');
const router = express.Router();

const {
  getAllCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard
} = require('../controllers/cards');

router.get('/', getAllCards);                // GET /cards
router.post('/', createCard);                // POST /cards
router.delete('/:id', deleteCardById);       // DELETE /cards/:id
router.put('/:cardId/likes', likeCard);      // PUT /cards/:cardId/likes
router.delete('/:cardId/likes', dislikeCard);// DELETE /cards/:cardId/likes

module.exports = router;
