import { Router } from 'express';
const router = Router();
import {
  getAllThoughts,
  getThoughtsById,
  createThought,
  deleteThought,
  addThought,
} from '../../controllers/thoughtController.js';

// /api/Thought
router.route('/').get(getAllThought).post(createThought);

// /api/Thought/:ThoughtId
router.route('/:ThoughtId').get(getThoughtById).delete(deleteThought);

// /api/Thought/:ThoughtId/assignments
router.route('/:ThoughtId/assignments').post(addAssignment);

// /api/Thought/:ThoughtId/assignments/:assignmentId
router.route('/:ThoughtId/assignments/:assignmentId').delete(removeAssignment);

export { router as ThoughtRouter} ;
