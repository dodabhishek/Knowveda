import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import {connectDB} from './config/db.js';
import { clerkWebhooks } from './controller/webhook.js';


const app = express();

app.use(cors());

app.get('/',(req,res)=>{
    
    res.send(`API Working`);
})

app.post('/cler',express.json(), clerkWebhooks)

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
    connectDB();
})