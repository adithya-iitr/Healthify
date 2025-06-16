"use strict";
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
async function sendVerificationEmail(userEmail, subject, html) {
    const mailOptions = {
        from: 'adithya.jaiswal341@gmail.com', // Your email
        to: userEmail, // Recipient's email
        subject: subject,
        html: html, // HTML email body
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    }
    catch (error) {
        console.error('Error sending email:', error);
    }
}
