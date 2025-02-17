"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyVerificationToken = exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateVerificationToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const accessTokenSecret = process.env.JWT_ACCESS_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;
const verificationTokenSecret = process.env.JWT_VERIFICATION_SECRET;
// Generate Access Token (Short-lived)
const generateAccessToken = (email) => {
    return jsonwebtoken_1.default.sign({ email }, accessTokenSecret, { expiresIn: process.env.JWT_ACCESS_EXPIRE });
};
exports.generateAccessToken = generateAccessToken;
// Generate Refresh Token (Long-lived)
const generateRefreshToken = (email) => {
    return jsonwebtoken_1.default.sign({ email }, refreshTokenSecret, { expiresIn: process.env.JWT_REFRESH_EXPIRE });
};
exports.generateRefreshToken = generateRefreshToken;
const generateVerificationToken = (email) => {
    return jsonwebtoken_1.default.sign({ email }, verificationTokenSecret, { expiresIn: process.env.JWT_VERIFICATION_EXPIRE });
};
exports.generateVerificationToken = generateVerificationToken;
// Verify Access Token
const verifyAccessToken = (token) => {
    return jsonwebtoken_1.default.verify(token, accessTokenSecret);
};
exports.verifyAccessToken = verifyAccessToken;
// Verify Refresh Token
const verifyRefreshToken = (token) => {
    return jsonwebtoken_1.default.verify(token, refreshTokenSecret);
};
exports.verifyRefreshToken = verifyRefreshToken;
const verifyVerificationToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, verificationTokenSecret);
    }
    catch (error) {
        console.error("JWT Verification Failed:", error.message);
        return null;
    }
};
exports.verifyVerificationToken = verifyVerificationToken;
