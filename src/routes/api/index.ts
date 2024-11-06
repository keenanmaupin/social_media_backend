import { Router } from 'express';
import { userRouter } from './userRoutes.js';
import { thoughtRouter } from '../api/thoughtRoutes';
const router = Router();

router.use('/users', userRouter);
router.use('/thoughts', thoughtRouter);

export default router;
