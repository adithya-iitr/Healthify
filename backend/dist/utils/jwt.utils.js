"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyVerificationToken = exports.verifyAccessToken = exports.generateVerificationToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verificationTokenSecret = 'IITR1234';
const verificationTokenExpire = "15m";
const accessTokenSecret = "iitr";
const accessTokenExpire = "1d";
const generateAccessToken = (email) => {
    return jsonwebtoken_1.default.sign({ email }, accessTokenSecret, { expiresIn: accessTokenExpire } // e.g., "15m", "1h", "7d"
    );
};
exports.generateAccessToken = generateAccessToken;
const generateVerificationToken = (email) => {
    return jsonwebtoken_1.default.sign({ email }, verificationTokenSecret, { expiresIn: verificationTokenExpire } // e.g., "15m", "1h", "7d"
    );
};
exports.generateVerificationToken = generateVerificationToken;
const verifyAccessToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, accessTokenSecret);
    }
    catch (error) {
        console.error("JWT Verification Failed:", error.message);
        return null;
    }
};
exports.verifyAccessToken = verifyAccessToken;
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
