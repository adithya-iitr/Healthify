import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken'
import zod from 'zod'
import bcrypt from 'bcrypt'
import { sendVerificationEmail } from '../utils/nodemailer';
// import * as dotenv from 'dotenv';
// dotenv.config();
// const accessTokenSecret = process.env.JWT_ACCESS_SECRET as string;
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.utils';
const signup =async (req: Request, res: Response, next: NextFunction) => {
    const prisma=new PrismaClient();
    const genSalt=10;
    const emailSchema: any = zod.string().email();
    const passwordSchema = zod.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/\d/, { message: "Password must contain at least one number" })
        .regex(/[\W_]/, { message: "Password must contain at least one special character" });

    const { name, email, password }: { name: string, email: string, password: string } = req.body;
    //oauth signup
    try {
        if (!name || !email || !password) {
            throw new Error("Please fill all the required input fields");
        }
        else {
            let error:string='';
            const passwordResult = passwordSchema.safeParse(password);
            const emailResult=emailSchema.safeParse(email);
            if (!passwordResult.success) {
                const errorMessage=passwordResult.error.issues.map((err:any)=>err.message).join(' ')
                throw new Error(errorMessage);
            }
            if(!emailResult.success){
                const errorMessage=emailResult.error.issues.map((err:any)=>err.message).join(' ')
                throw new Error(errorMessage);
            }
        }
        const hashedPassword=await bcrypt.hash(password,genSalt)
        const user=await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(user!=null){
            throw new Error("User already exists")
        }
        else{
            const newUser=await prisma.user.create({
                data:{
                    name:name, 
                    email:email, 
                    password:hashedPassword
                }
            })
            const accessToken=generateAccessToken(email)
            const refreshToken=generateRefreshToken(email)
            sendVerificationEmail(email,accessToken)
            res.json({
                accessToken:accessToken,
                refreshToken:refreshToken
            })
        }
    }
    catch (e) {
        console.error(e);
        res.status(400).json({ error: (e as Error).message });
        return
    }
}
export default signup