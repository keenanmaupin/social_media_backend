const router = require('express').Router();
const {
  createThought,
  getThoughts,
  getThoughtById,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../controllers/thoughtController');

// GET all thoughts
router.get('/', getThoughts);

// GET a single thought by id
router.get('/:thoughtId', getThoughtById);

// POST a new thought
router.post('/', createThought);

// PUT to update a thought by id
router.put('/:thoughtId', updateThought);

// DELETE to remove a thought by id
router.delete('/:thoughtId', deleteThought);

// POST to add a reaction to a thought
router.post('/:thoughtId/reactions', addReaction);

// DELETE to remove a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

module.exports = router;
