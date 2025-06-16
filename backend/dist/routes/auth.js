"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signup_1 = __importDefault(require("../controllers/authcontrollers/signup"));
const verify_1 = __importDefault(require("../controllers/authcontrollers/verify"));
const loginRouter_1 = __importDefault(require("./loginRouter"));
const router = (0, express_1.Router)();
router.post('/signup', signup_1.default);
router.use('/login', loginRouter_1.default);
router.get('/verify_token', verify_1.default);
exports.default = router;
