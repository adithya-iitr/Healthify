"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const jwt_utils_1 = require("../utils/jwt.utils");
const verifyToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.token;
    const prisma = new client_1.PrismaClient();
    try {
        (0, jwt_utils_1.verifyVerificationToken)(token);
        const decoded = jsonwebtoken_1.default.decode(token);
        const email = decoded.email;
        yield prisma.user.update({ where: { email: email }, data: { isVerified: true } });
        const accessToken = (0, jwt_utils_1.generateAccessToken)(email);
        const refreshToken = (0, jwt_utils_1.generateRefreshToken)(email);
        res.json({
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    }
    catch (error) {
        res.status(400).send('Invalid or expired token');
    }
});
exports.default = verifyToken;
