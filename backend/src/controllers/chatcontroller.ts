import { generateStreamToken } from "../utils/stream";
import { Request, Response } from "express";


export async function getStreamToken(req: Request, res: Response) {
  try {
    const authUser = req.query.id as string;
    const token = generateStreamToken(authUser);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error generating Stream token" });
  }
}