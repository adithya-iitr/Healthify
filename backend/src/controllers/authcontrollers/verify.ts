import { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client";
import { verifyVerificationToken, generateAccessToken, generateRefreshToken } from "../../utils/jwt.utils";
const prisma = new PrismaClient()
const verifyToken = async (req: Request, res: Response) => {
  const token = req.body.token as string;
  
  try {
    const decoded: any = verifyVerificationToken(token);
    if (!decoded || !decoded.email) {
      res.status(400).send('Invalid or expired token');
      return;
    }
    const email = decoded.email
    const user = await prisma.user.update({ where: { email: email }, data: { isVerified: true } });
    if(!user){
      res.status(400).send('Invalid or expired token');
      return;
    }
    const accessToken = generateAccessToken(email)
    const refreshToken = generateRefreshToken(email)
    res.json({
      accessToken: accessToken,
      refreshToken: refreshToken
    })
  } catch (error) {
    res.status(500).send('Error verifying token');
  }
}


export default verifyToken