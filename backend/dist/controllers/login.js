"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const jwt_utils_1 = require("../utils/jwt.utils");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    const { email, password } = req.body;
    try {
        if (!email) {
            throw new Error("Enter the email");
        }
        else if (!password) {
            throw new Error("Enter the password");
        }
        else {
            const user = yield prisma.user.findUnique({
                where: {
                    email: email
                }
            });
            if (!user) {
                res.status(400).json({
                    "msg": "Email not registered"
                });
                return;
            }
            const comparePassword = bcrypt_1.default.compare(password, user.password);
            if (!comparePassword) {
                res.status(400).json({
                    "msg": "Invalid Password"
                });
                return;
            }
            const accessToken = (0, jwt_utils_1.generateAccessToken)(email);
            const refreshToken = (0, jwt_utils_1.generateRefreshToken)(email);
            res.json({
                accessToken: accessToken,
                refreshToken: refreshToken
            });
        }
    }
    catch (e) {
        console.error(e);
        res.status(400).json({ error: e.message });
        return;
    }
    //signin with oauth
    //signin with password or otp
});
exports.default = login;
