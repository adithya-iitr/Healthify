import express, { Application, NextFunction, Request, Response, RequestHandler } from 'express'
import AuthRouter from './routes/auth';
import cors from 'cors'
import paymentRoutes from './routes/payment';
import geminiRoute from './routes/gemini'
import { verifyAccessToken } from './utils/jwt.utils';
import { getStreamToken } from './controllers/chatcontroller';
const app: Application=express();
const port=process.env.PORT || 8000;
app.use(express.json())
app.use(cors());
app.post('/',(req: Request,res: Response)=>{
    res.send("Hello from the server")
})
app.use('/auth', AuthRouter)
app.use('/api/payment', paymentRoutes);
app.use('/api/gemini', geminiRoute)
app.get('/chat/token',getStreamToken)

const verificationHandler: RequestHandler = (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ valid: false });
        return;
    }
    try {
      const verified = verifyAccessToken(token);
      res.json({ valid: true });
    } catch (err) {
      res.status(401).json({ valid: false });
    }
};
app.get('/api/auth/verify', verificationHandler);
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})
