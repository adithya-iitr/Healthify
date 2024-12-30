import { Router } from 'express'
import loginHandler from '../controllers/login'
import forgotPassword from '../controllers/forgotPassword';
import otp from '../controllers/otp';
import verifyOTP from '../controllers/verifyOTP';
const router=Router();
router.post('/',loginHandler)
router.post('/otp', otp)
router.post('/forgot-password',forgotPassword)
router.post('/verifyOTP',verifyOTP)
export default router;