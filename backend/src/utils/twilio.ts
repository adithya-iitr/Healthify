import twilio from 'twilio';
// Twilio credentials
const accountSid: string = 'AC622fd4bf4a8072b1f11bfb5482ab9ba1';
const authToken: string = '3f2e63afb76941c94e49aa2c2b615467';
const serviceSid: string = 'VA272dd2bd1afc5a6bd6362c27edd7427c';
const client = twilio(accountSid, authToken);

// Function to send a verification SMS
export const sendVerificationSMS = async (phoneNumber: string) => {
    try {
        const verification = await client.verify.v2.services(serviceSid)
            .verifications
            .create({ to: phoneNumber, channel: 'sms' });

        console.log('Verification sent successfully:', verification.sid);
    } catch (error) {
        console.error('Error sending verification:', error);
    }
};

// Function to verify the code entered by the user
export const verifyCode = async (phoneNumber: string, code: string) => {
    try {
        const verificationCheck = await client.verify.v2.services(serviceSid)
            .verificationChecks
            .create({ to: phoneNumber, code });

        console.log('Verification status:', verificationCheck.status);
        if (verificationCheck.status === 'approved') {
            console.log('Verification successful!');
            return true;
        } else {
            console.log('Verification failed.');
            return false;
        }
    } catch (error) {
        console.error('Error verifying code:', error);
        return error;
    }
};

