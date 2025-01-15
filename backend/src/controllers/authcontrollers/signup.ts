import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import zod from 'zod'
import bcrypt from 'bcrypt'
import { generateVerificationToken } from '../../utils/jwt.utils';
import { sendVerificationEmail } from '../../utils/nodemailer';
const signup = async (req: Request, res: Response, next: NextFunction) => {
    const prisma = new PrismaClient();
    const genSalt = 10;
    const emailSchema: any = zod.string().email();
    const passwordSchema = zod.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/\d/, { message: "Password must contain at least one number" })
        .regex(/[\W_]/, { message: "Password must contain at least one special character" });

    const { name, email, password, phoneNumber }: { name: string, email: string, password: string, phoneNumber: string } = req.body;
    //oauth signup
    try {
        if (!name || !email || !password || !phoneNumber) {
            res.send("Please fill all the required input fields");
            return
        }
        else {
            const passwordResult = passwordSchema.safeParse(password);
            const emailResult = emailSchema.safeParse(email);
            if (!passwordResult.success) {
                const errorMessage = passwordResult.error.issues.map((err: any) => err.message).join(' ')
                res.send(errorMessage);
                return
            }
            if (!emailResult.success) {
                const errorMessage = emailResult.error.issues.map((err: any) => err.message).join(' ')
                res.send(errorMessage);
                return
            }
        }
        const hashedPassword = await bcrypt.hash(password, genSalt)
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (user != null) {
            res.send("User already exists")
            return
        }
        else {
            await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: hashedPassword,
                    phoneNumber: phoneNumber
                }
            })
            // res.redirect('/verify');
            const verificationToken = generateVerificationToken(email);
            const verificationLink = `http://localhost:5173/verify-email/token=${verificationToken}`;
            const subject = 'Email Verification'
            const text = `Click this link to verify your email: ${verificationLink}`
            const html = `<p>Click this <a href="${verificationLink}">link</a> to verify your email.</p>`
            sendVerificationEmail(email, subject, text, html)
            res.send(true)
        }
    }
    catch (e) {
        res.status(400).send((e as Error).message);
    }
}
export default signup