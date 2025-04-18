import { Router } from 'express';
import { createCheckIn } from '../controllers/checkinController';

const router = Router();

router.post('/new', createCheckIn);

export default router;
