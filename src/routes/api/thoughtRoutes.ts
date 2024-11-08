import express from 'express';
import {
  createThought,
  getAllThoughts,
  getThoughtById,
  deleteThought,
  addReaction,
  removeReaction,
  updateThought,
} from '../../controllers/thoughtController.js';

const router = express.Router();

// Route for creating a new thought
router.post('/', createThought);

// Route for getting all thoughts
router.get('/', getAllThoughts);

// Route for getting a single thought by ID
router.get('/:thoughtId', getThoughtById);

// Route for updating a thought by ID
router.put('/:userId', updateThought);

// Route for deleting a thought by ID
router.delete('/:thoughtId', deleteThought);

// Route for adding a reaction to a thought
router.post('/:thoughtId/reactions', addReaction);

// Route for removing a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

export { router as thoughtRouter };
