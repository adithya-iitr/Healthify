import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();
import { sendVerificationSMS } from "../utils/twilio";
const otp=async(req:Request,res:Response)=>{
    const { email }=req.body;
    const found =await prisma.user.findFirst({
        where:{
            email:email
        }
    });
    if(!found){
        res.send("No such user exists");
    }
    else{
        const phoneNumber=found.phoneNumber;
        sendVerificationSMS(phoneNumber);
        // res.redirect('/verify_otp')
        res.send("otp sent")
    }
}
export default otp;