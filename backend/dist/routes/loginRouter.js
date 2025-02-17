"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = __importDefault(require("../controllers/authcontrollers/login"));
const forgotPassword_1 = __importDefault(require("../controllers/authcontrollers/forgotPassword"));
const otp_1 = __importDefault(require("../controllers/authcontrollers/otp"));
const verifyOTP_1 = __importDefault(require("../controllers/authcontrollers/verifyOTP"));
// import Oauth from '../controllers/authcontrollers/Oauth';
const router = (0, express_1.Router)();
router.post('/', login_1.default);
router.post('/otp', otp_1.default);
router.post('/forgot-password', forgotPassword_1.default);
router.post('/verifyOTP', verifyOTP_1.default);
// router.post('/oauth', Oauth)
exports.default = router;
