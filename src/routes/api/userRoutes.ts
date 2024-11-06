import { Router } from 'express';
const router = Router();
import {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../../controllers/userController.js';

// /api/Users
router.route('/').get(getAllUser).post(createUser);

// /api/Users/:UserId
router
  .route('/:UserId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

export { router as UserRouter };
