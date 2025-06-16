"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCode = exports.sendVerificationSMS = void 0;
const twilio_1 = __importDefault(require("twilio"));
// Twilio credentials
const accountSid = 'AC622fd4bf4a8072b1f11bfb5482ab9ba1';
const authToken = '3f2e63afb76941c94e49aa2c2b615467';
const serviceSid = 'VA272dd2bd1afc5a6bd6362c27edd7427c';
const client = (0, twilio_1.default)(accountSid, authToken);
// Function to send a verification SMS
const sendVerificationSMS = async (phoneNumber) => {
    try {
        const verification = await client.verify.v2.services(serviceSid)
            .verifications
            .create({ to: phoneNumber, channel: 'sms' });
        console.log('Verification sent successfully:', verification.sid);
    }
    catch (error) {
        console.error('Error sending verification:', error);
    }
};
exports.sendVerificationSMS = sendVerificationSMS;
// Function to verify the code entered by the user
const verifyCode = async (phoneNumber, code) => {
    try {
        const verificationCheck = await client.verify.v2.services(serviceSid)
            .verificationChecks
            .create({ to: phoneNumber, code });
        console.log('Verification status:', verificationCheck.status);
        if (verificationCheck.status === 'approved') {
            console.log('Verification successful!');
            return true;
        }
        else {
            console.log('Verification failed.');
            return false;
        }
    }
    catch (error) {
        console.error('Error verifying code:', error);
        return error;
    }
};
exports.verifyCode = verifyCode;
