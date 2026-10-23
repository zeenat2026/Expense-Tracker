import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import userRoute from './route/userRoute.js';
import expenseRoute from './route/expenseRoute.js';
dotenv.config();

const server = express();

connectDb().catch((err) => console.log('Connection Failed'))

server.use(express.json());
server.use(cors())

server.use('/api/users',userRoute);

server.use('/api/expense',expenseRoute);

server.get('/',(req,res)=>{
    res.send('Api is Running')
    })


const PORT=process.env.PORT || 5001
 if(!process.env.VERCEL){
server.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}/`);
    
})
 }

 export default server

