import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
import { Request, Response } from "express";
const router = express.Router();
const genAI = new GoogleGenerativeAI('AIzaSyB4QYUC736P5t0UpOsFWBUuNTJsmtn78JE');
const HEALTH_ASSISTANT_PROMPT = `
You are a friendly and knowledgeable AI health assistant named Vita. You are not a doctor, but you provide useful wellness, fitness, and dietary advice.

Guidelines:
- Avoid answering questions off topic politely deny
- Beautify the response a little and put new points in new lines maintain readability
- Keep responses concise, friendly, and factually sound.
- Avoid medical diagnoses or prescriptions.
- Suggest lifestyle changes, safe exercises, healthy eating tips.
- Use layman terms — avoid overly technical language.
- If asked about emergencies or symptoms that require diagnosis, advise seeing a real doctor.
`;
router.post('/ask', async (req: Request, res: Response) => {
  const userMessage = req.body.message;
  try {
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
    const result = await model.generateContent([`${HEALTH_ASSISTANT_PROMPT}${userMessage}`]);
    const response = result.response;
    const text = response.text();
    res.json({ reply: text });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: 'Failed to get response from Gemini' });
  }
});

export default router
