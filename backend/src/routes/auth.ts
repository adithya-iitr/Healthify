import { Router } from 'express';
import signup from '../controllers/signup';
import verify from '../controllers/verify'
import loginRouter from './loginRouter'
const router = Router();

router.post('/signup', signup);
router.use('/login', loginRouter);
router.post('/verify_token',verify)

export default router;
