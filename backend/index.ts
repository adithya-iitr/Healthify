import express, { Application, Request, Response } from 'express'
import AuthRouter from './src/routes/auth';
import cors from 'cors'
const app: Application=express();
const port=8000;
app.use(express.json())
app.use(cors());
app.post('/',(req: Request,res: Response)=>{
    res.send("Hello from the server")
})
app.use('/auth', AuthRouter)
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
});