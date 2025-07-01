import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './configs/db.js';
import userRoutes from './routes/userRoutes.js';



const app = express();


// Middlewares
app.use(cors());

app.use(express.json());
// Routes
app.get('/', (req,res)=>{
    res.send("API Working");
})

app.use('/api/users',userRoutes);
app.use(express.json());


const PORT = process.env.PORT || 3000 ;

app.listen(PORT,()=>{
    // connect database 
connectDB();
    console.log(`Server is running on port ${PORT}`);
})