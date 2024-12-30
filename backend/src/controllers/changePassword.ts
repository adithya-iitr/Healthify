import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
const changePassword=async (req:Request,res:Response)=>{
    const {email, newPassword}=req.body;
    const salt=10;
    const prisma=new PrismaClient();
    const newHashedPassword=await bcrypt.hash(newPassword, salt);
    await prisma.user.update({ where: { email: email },data:{ password:newHashedPassword }  });
    res.send("Password changed successfully");
}
export default changePassword;