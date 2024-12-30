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
exports.sendVerificationEmail = sendVerificationEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail', // Use your email provider, e.g., Gmail, SendGrid
    auth: {
        user: process.env.NODEMAILER_ID,
        pass: process.env.NODEMAILER_PASS, // Use an app-specific password or environment variable
    },
});
// Function to send email
function sendVerificationEmail(userEmail, subject, text, html) {
    return __awaiter(this, void 0, void 0, function* () {
        const mailOptions = {
            from: 'adithya.jaiswal341@gmail.com', // Your email
            to: userEmail, // Recipient's email
            subject: subject,
            text: text,
            html: html, // HTML email body
        };
        try {
            yield transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        }
        catch (error) {
            console.error('Error sending email:', error);
        }
    });
}
