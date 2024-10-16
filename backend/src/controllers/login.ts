import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'
// import jwt from 'jsonwebtoken'
dotenv.config();
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.utils';
// const accessTokenSecret=process.env.JWT_ACCESS_SECRET as string
const login=async (req:Request,res: Response, next:NextFunction)=>{
    const prisma=new PrismaClient();
    const { email, password }: { email: string; password: string } = req.body;
    try{
        if(!email){
            throw new Error("Enter the email")
        }
        else if(!password){
            throw new Error("Enter the password")
        }
        else{
            const user=await prisma.user.findUnique({
                where:{
                    email:email
                }
            })
            if(!user){
                res.status(400).json({
                    "msg":"Email not registered"
                })
                return
            }
            const comparePassword=bcrypt.compare(password,user.password)
            if(!comparePassword){
                res.status(400).json({
                    "msg":"Invalid Password"
                })
                return
            }
            const accessToken=generateAccessToken(email)
            const refreshToken=generateRefreshToken(email)
            res.json({
                accessToken:accessToken,
                refreshToken:refreshToken
            })
        }
    }
    catch(e){
        console.error(e);
        res.status(400).json({ error: (e as Error).message });
        return 
    }
    //signin with oauth
    //forgot password
    //signin with password or otp
}
export default login