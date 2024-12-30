"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = __importDefault(require("../controllers/login"));
const forgotPassword_1 = __importDefault(require("../controllers/forgotPassword"));
const otp_1 = __importDefault(require("../controllers/otp"));
const verifyOTP_1 = __importDefault(require("../controllers/verifyOTP"));
const router = (0, express_1.Router)();
router.post('/', login_1.default);
router.post('/otp', otp_1.default);
router.post('/forgot-password', forgotPassword_1.default);
router.post('/verifyOTP', verifyOTP_1.default);
exports.default = router;
