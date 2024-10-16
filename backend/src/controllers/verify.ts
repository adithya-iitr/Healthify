import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
// import * as dotenv from 'dotenv';
import { PrismaClient } from "@prisma/client";
// dotenv.config();
import { verifyAccessToken } from "../utils/jwt.utils";
// const accessTokenSecret = process.env.JWT_ACCESS_SECRET as string;
const verify=async(req:Request,res:Response)=>{
    const token = req.query.token as string; 
    const prisma=new PrismaClient()
  try {
    verifyAccessToken(token); 
    const decoded:any = jwt.decode(token);
    const email=decoded.email  
    await prisma.user.update({ where: { email: email },data:{ isVerified: true }  });
    res.send('Email successfully verified');
  } catch (error) {
    res.status(400).send('Invalid or expired token');
  }
}
export default verify