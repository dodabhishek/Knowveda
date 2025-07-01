import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import clerkWebhooks from './controllers/webhook.js';


const app = express();


// Middlewares
app.use(cors());

// connect database 
connectDB();
// Routes
app.get('/', (req,res)=>{
    res.send("API Working");
})

app.post('/clerk',express.json(),clerkWebhooks);


const PORT = process.env.PORT || 3000 ;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})