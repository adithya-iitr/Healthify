import { Router } from 'express';
import signup from '../controllers/signup';
import login from '../controllers/login';
import verify from '../controllers/verify'
const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/verify-link/*',verify)

export default router;
