import { Request, Response } from 'express';
import { generateAccessToken, verifyRefreshToken } from '../../utils/jwt.utils';

// Simulate a user database (Replace with actual DB in a real project)
let refreshTokens: string[] = []; // Store refresh tokens in memory (use a database in production)

// Refresh Access Token using Refresh Token
export const refreshToken = (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token || !refreshTokens.includes(token)) {
    return res.status(403).json({ message: 'Refresh token not found, login again' });
  }

  try {
    const decoded = verifyRefreshToken(token) as any;
    const newAccessToken = generateAccessToken(decoded.userId);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};

// Logout (Invalidate Refresh Token)
export const logout = (req: Request, res: Response) => {
  const { token } = req.body;

  // Remove refresh token from store
  refreshTokens = refreshTokens.filter((t) => t !== token);

  res.json({ message: 'Logged out' });
};
