import { StreamChat } from "stream-chat";
import dotenv from "dotenv";

dotenv.config();
const apiKey = 'v59mpffgtjux';
const apiSecret = 'qd4nsg32qqw7b5rvnm9sywnpycmvu3hmwhb45vtf5v4dj6ssavy7j4fuzuyzpxgf';

if (!apiKey || !apiSecret) {
  throw new Error("STREAM_API_KEY and STREAM_API_SECRET absent");
}
const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData:any) => {
  console.log(userData)
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error upserting Stream user:", error);
    throw error;
  }
};
export const generateStreamToken = (userId: string | number) => {
  try {
    const userIdStr = userId.toString();
    const token = streamClient.createToken(userIdStr);
    return token;
  } catch (error) {
    console.error("Error generating Stream token:", error);
    throw error;
  }
};