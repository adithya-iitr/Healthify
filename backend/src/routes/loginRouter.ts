import { Router } from 'express'
import loginHandler from '../authcontrollers/login'
import forgotPassword from '../authcontrollers/forgotPassword';
import otp from '../authcontrollers/otp';
import verifyOTP from '../authcontrollers/verifyOTP';
import Oauth from '../authcontrollers/Oauth';
const router=Router();
router.post('/',loginHandler)
router.post('/otp', otp)
router.post('/forgot-password',forgotPassword)
router.post('/verifyOTP',verifyOTP)
router.post('/oauth', Oauth)
export default router;