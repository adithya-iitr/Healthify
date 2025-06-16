import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import zod from 'zod'
import bcrypt from 'bcrypt'
import { generateVerificationToken } from '../../utils/jwt.utils';
import { sendVerificationEmail } from '../../utils/nodemailer';
import { upsertStreamUser } from '../../utils/stream';

const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
    try {
        if (!name || !email || !password || !phoneNumber) {
            res.send("Please fill all the required input fields");
            return;
        }
        else {
            const passwordResult = passwordSchema.safeParse(password);
            const emailResult = emailSchema.safeParse(email);
            if (!passwordResult.success) {
                throw new Error("Invalid Password")
            }
            if (!emailResult.success) {
                throw new Error("Invalid Email")
            }
        }
        const hashedPassword = await bcrypt.hash(password, genSalt)
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (existingUser != null) {
            throw new Error("User already exists")
        }
        else {
            const user = await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: hashedPassword,
                    phoneNumber: phoneNumber
                }
            })
            try {
                await upsertStreamUser({
                    id: user.id.toString(),
                    name: user.name,
                    email: user.email,
                });
                console.log("Stream user created")
            } catch (error) {
                console.error("Error upserting Stream user:", error);
                res.status(500).json({ message: "Internal server error" });
                return;
            }
            const verificationToken = generateVerificationToken(email);
            const verificationLink = `http://localhost:8000/auth/verify_token?token=${verificationToken}`;
            const subject = 'Email Verification'
            const html = `
            <div style="font-family: Arial, sans-serif;">
              <div style="background-color: #f4f4f4; padding: 20px; text-align: center;">
                <h2 style="color: #333;">Welcome to <span style="color: #2e7d32;">Fit Trainer</span>!</h2>
              </div>
              <div style="padding: 20px; color: #333;">
                <p>Hi <strong>${name}</strong>,</p>
                <p>Thanks for joining <strong>Fit Trainer</strong>! We're thrilled to have you with us 🎉</p>
                <p>Click on the link to verify your email <a href='${verificationLink}'>link</a></p>
                <p>If you have any questions, feel free to reach out to our support team.</p>
                <p>Cheers,<br />The Fit Trainer Team</p>
              </div>
              <div style="background-color: #f0f0f0; padding: 15px; font-size: 12px; text-align: center; border-top: 1px solid #ccc;">
                <p>&copy; 2025 Fit Trainer Inc. All rights reserved.</p>
                <p>
                  <a href="#" onclick="return false;" style="color: #2e7d32; text-decoration: none;">Privacy Policy</a> |
                  <a href="#" onclick="return false;" style="color: #2e7d32; text-decoration: none;">Support</a>
                </p>
              </div>
            </div>
          `;
            await sendVerificationEmail(email, subject, html);
            res.json({ user, valid:true});
        }
    }
    catch (e) {
        res.status(400).send((e as Error).message);
    }
}

export default signup;