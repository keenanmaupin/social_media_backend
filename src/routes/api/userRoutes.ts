import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} from '../../controllers/userController.js';

const router = express.Router();

// Route for creating a new user
router.post('/', createUser);

// Route for getting all users
router.get('/', getAllUsers);

// Route for getting a single user by ID
router.get('/:userId', getUserById);

// Route for updating a user by ID
router.put('/:userId', updateUser);

// Route for deleting a user by ID
router.delete('/:userId', deleteUser);

// Route for adding a friend to a user
router.post('/:userId/friends/:friendId', addFriend);

// Route for removing a friend from a user
router.delete('/:userId/friends/:friendId', removeFriend);

export { router as userRouter };
