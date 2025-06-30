import express from 'express';
import cors from 'cors';
import 'dotenv/config'


const app = express();


// Middlewares
app.use(cors());


// Routes
app.get('/', (req,res)=>{
    res.send("API Working");
})


const PORT = process.env.PORT || 3000 ;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})