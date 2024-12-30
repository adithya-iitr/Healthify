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
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_utils_1 = require("../utils/jwt.utils");
const nodemailer_1 = require("../utils/nodemailer");
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const verificationToken = (0, jwt_utils_1.generateVerificationToken)(email);
    const verificationLink = `http://localhost:5175/login/forgot-password?token=${verificationToken}`;
    const subject = 'Change Password';
    const text = `Click this link to set your new password: ${verificationLink}`;
    const html = `<p>Click this <a href="${verificationLink}">link</a> to change your password.</p>`;
    (0, nodemailer_1.sendVerificationEmail)(email, subject, text, html);
    res.json({
        email: email,
        msg: "Mail with link to change your password sent to the above email."
    });
});
exports.default = forgotPassword;
