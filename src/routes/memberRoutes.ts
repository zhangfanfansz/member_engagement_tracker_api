import { Router } from 'express';
import { createBatchMember, createMember } from '../controllers/memberController';

const router = Router();

router.post('/new', createMember);
router.post('/batch', createBatchMember);

export default router;
