import { Router } from 'express';
import signup from '../controllers/authcontrollers/signup';
import verifyToken from '../controllers/authcontrollers/verify';
import loginRouter from './loginRouter'

const router = Router();

router.post('/signup', signup);
router.use('/login', loginRouter);
router.get('/verify_token', verifyToken);

export default router;
