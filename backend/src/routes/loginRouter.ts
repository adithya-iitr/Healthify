import { Router } from 'express'
import loginHandler from '../controllers/authcontrollers/login'
import forgotPassword from '../controllers/authcontrollers/forgotPassword';
import otp from '../controllers/authcontrollers/otp';
import verifyOTP from '../controllers/authcontrollers/verifyOTP';
// import Oauth from '../controllers/authcontrollers/Oauth';
const router=Router();
router.post('/',loginHandler)
router.post('/otp', otp)
router.post('/forgot-password',forgotPassword)
router.post('/verifyOTP',verifyOTP)
// router.post('/oauth', Oauth)
export default router;
