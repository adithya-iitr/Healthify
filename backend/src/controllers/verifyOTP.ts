import { Request, Response } from "express"
import { verifyCode } from "../utils/twilio"
const verifyOTP=async (req:Request,res:Response)=>{
    const { phoneNumber, code }=req.body;
    const flag=await verifyCode(phoneNumber,code)
    res.send(flag);
}
export default verifyOTP