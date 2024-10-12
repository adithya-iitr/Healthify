import express, { Application, Request, Response } from 'express'
const app: Application=express();
const port=8000;
app.post('/',(req: Request,res: Response)=>{
    res.send("Hello from the server")
})
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
});