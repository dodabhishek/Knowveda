import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import {connectDB} from './config/db.js';
import { clerkWebhooks } from './controller/webhook.js';
import educatorRouter from './routes/educatorRoute.js';
import { clerkMiddleware } from '@clerk/express';

const app = express();

app.use(cors());
app.use(express.json());

// --- PUBLIC ROUTES ---
app.get('/',(req,res)=>{
    res.send(`API Working`);
})

// --- CLERK WEBHOOK: MUST BE PUBLIC, NO AUTH ---
app.use('/clerk', clerkWebhooks);

// --- PROTECTED ROUTES (require Clerk auth) ---
app.use('/api/educator', clerkMiddleware(), educatorRouter);




const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
    connectDB();
})