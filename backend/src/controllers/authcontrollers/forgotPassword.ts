import { Request, Response } from "express";
import { generateVerificationToken } from "../../utils/jwt.utils";
import { sendVerificationEmail } from "../../utils/nodemailer";
const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    const verificationToken = generateVerificationToken(email);
    const verificationLink = `http://localhost:5175/login/forgot-password?token=${verificationToken}`;
    const subject = 'Change Password'
    const html = `<p>Click this <a href="${verificationLink}">link</a> to change your password.</p>`
    sendVerificationEmail(email, subject, html);
    res.json({
        email: email,
        msg: "Mail with link to change your password sent to the above email."
    })
}
export default forgotPassword;