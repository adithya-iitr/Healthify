import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { PrismaClient } from "@prisma/client";
import { verifyVerificationToken, generateAccessToken, generateRefreshToken } from "../utils/jwt.utils";

const verifyToken = async (req: Request, res: Response) => {
  const token = req.body.token as string;
  const prisma = new PrismaClient()
  try {
    verifyVerificationToken(token);
    const decoded: any = jwt.decode(token);
    const email = decoded.email
    await prisma.user.update({ where: { email: email }, data: { isVerified: true } });
    const accessToken = generateAccessToken(email)
    const refreshToken = generateRefreshToken(email)
    res.json({
      accessToken: accessToken,
      refreshToken: refreshToken
    })
  } catch (error) {
    res.status(400).send('Invalid or expired token');
  }
}


export default verifyToken