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
const client_1 = require("@prisma/client");
const zod_1 = __importDefault(require("zod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_utils_1 = require("../utils/jwt.utils");
const nodemailer_1 = require("../utils/nodemailer");
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    const genSalt = 10;
    const emailSchema = zod_1.default.string().email();
    const passwordSchema = zod_1.default.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/\d/, { message: "Password must contain at least one number" })
        .regex(/[\W_]/, { message: "Password must contain at least one special character" });
    const { name, email, password, phoneNumber } = req.body;
    //oauth signup
    try {
        if (!name || !email || !password || !phoneNumber) {
            res.send("Please fill all the required input fields");
            return;
        }
        else {
            const passwordResult = passwordSchema.safeParse(password);
            const emailResult = emailSchema.safeParse(email);
            if (!passwordResult.success) {
                const errorMessage = passwordResult.error.issues.map((err) => err.message).join(' ');
                res.send(errorMessage);
                return;
            }
            if (!emailResult.success) {
                const errorMessage = emailResult.error.issues.map((err) => err.message).join(' ');
                res.send(errorMessage);
                return;
            }
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, genSalt);
        const user = yield prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (user != null) {
            res.send("User already exists");
            return;
        }
        else {
            yield prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: hashedPassword,
                    phoneNumber: phoneNumber
                }
            });
            // res.redirect('/verify');
            const verificationToken = (0, jwt_utils_1.generateVerificationToken)(email);
            const verificationLink = `http://localhost:5173/verify-email/token=${verificationToken}`;
            const subject = 'Email Verification';
            const text = `Click this link to verify your email: ${verificationLink}`;
            const html = `<p>Click this <a href="${verificationLink}">link</a> to verify your email.</p>`;
            (0, nodemailer_1.sendVerificationEmail)(email, subject, text, html);
            res.send(true);
        }
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.default = signup;
