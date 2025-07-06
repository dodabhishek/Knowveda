import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import {connectDB} from './config/db.js';
import { clerkWebhooks } from './controller/webhook.js';
import User from './model/user.model.js';
import educatorRouter from './routes/educatorRoute.js';
import { clerkMiddleware } from '@clerk/express';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send(`API Working`);
})

// Webhook endpoint - NO authentication needed
app.post('/clerk', clerkWebhooks);

// Protected routes - apply authentication middleware
app.use('/api/educator', clerkMiddleware(), educatorRouter);

// Backup endpoint to sync user data from frontend
app.post('/api/users/sync', async (req, res) => {
    try {
        const { _id, email, name, imageUrl } = req.body;
        
        if (!_id || !email || !name || !imageUrl) {
            return res.status(400).json({ 
                success: false, 
                message: 'Missing required user data' 
            });
        }

        // Check if user already exists
        const existingUser = await User.findById(_id);
        
        if (existingUser) {
            // Update existing user
            const updatedUser = await User.findByIdAndUpdate(_id, {
                email,
                name,
                imageUrl
            }, { new: true });
            console.log('User updated:', updatedUser);
            res.json({ success: true, message: 'User updated successfully' });
        } else {
            // Create new user
            const newUser = await User.create({
                _id,
                email,
                name,
                imageUrl
            });
            console.log('User created:', newUser);
            res.json({ success: true, message: 'User created successfully' });
        }
    } catch (error) {
        console.error('Error syncing user:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
    connectDB();
})