import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const verificationTokenSecret = 'IITR1234';
const verificationTokenExpire =  "15m";
const accessTokenSecret="iitr"
const accessTokenExpire="1d"

export const generateAccessToken = (email: string): string => {
  return jwt.sign(
    { email },
    accessTokenSecret,
    { expiresIn: accessTokenExpire }  // e.g., "15m", "1h", "7d"
  );
};
export const generateVerificationToken = (email: string): string => {
  return jwt.sign(
    { email },
    verificationTokenSecret,
    { expiresIn: verificationTokenExpire }  // e.g., "15m", "1h", "7d"
  );
};


export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, accessTokenSecret);
  } catch (error: any) {
    console.error("JWT Verification Failed:", error.message);
    return null; 
  }
};
export const verifyVerificationToken = (token: string) => {
  try {
    return jwt.verify(token, verificationTokenSecret);
  } catch (error: any) {
    console.error("JWT Verification Failed:", error.message);
    return null; 
  }
};