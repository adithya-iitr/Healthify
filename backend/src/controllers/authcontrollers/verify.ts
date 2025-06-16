import { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client";
import { verifyVerificationToken } from "../../utils/jwt.utils";
const prisma = new PrismaClient()
const verifyToken = async (req: Request, res: Response) => {
  const token = req.query.token as string;
  
  try {
    const decoded: any = verifyVerificationToken(token);
    if (!decoded || !decoded.email) {
      throw new Error();
    }
    const email = decoded.email
    const user = await prisma.user.update({ where: { email: email }, data: { isVerified: true } });
    res.redirect('http://localhost:5173/login')
  } catch (error) {
    res.redirect('http://localhost:5173/verify-email/verified=false')
  }
}


export default verifyToken


