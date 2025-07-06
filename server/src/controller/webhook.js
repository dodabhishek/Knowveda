import {Webhook} from 'svix'
import User from '../model/user.model.js';

// API controller function to manage clerk user with database
export const clerkWebhooks = async(req,res)=>{
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        await whook.verify(JSON.stringify(req.body),{
            'svix-id':req.headers['svix-id'],
            'svix-timestamp':req.headers['svix-timestamp'],
            'svix-signature':req.headers['svix-signature']
        })
        const {data, type} = req.body
        console.log('Webhook received:', type, data)
        
        switch (type) {
            case 'user.created':{
                const userData = {
                    _id:data.id,
                    email:data.email_addresses[0].email_address,
                    name:data.first_name+' '+ data.last_name,
                    imageUrl : data.image_url,
                }

                const newUser = await User.create(userData);
                console.log('User created:', newUser);
                res.json({success: true, message: 'User created successfully'})
                break ;
            }
                
             case 'user.updated':{
                const userData = {
                    email:data.email_addresses[0].email_address,
                    name:data.first_name+' '+ data.last_name,
                    imageUrl : data.image_url,
                }

                const updatedUser = await User.findByIdAndUpdate(data.id, userData, {new: true});
                console.log('User updated:', updatedUser);
                res.json({success: true, message: 'User updated successfully'})
                break ;
             }

             case 'user.deleted':{
                const deletedUser = await User.findByIdAndDelete(data.id);
                console.log('User deleted:', deletedUser);
                res.json({success: true, message: 'User deleted successfully'})
                break ;
             }
        
            default:
                console.log('Unhandled webhook type:', type);
                res.json({success: false, message: 'Unhandled webhook type'})
                break;
        }
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({success:false, message: error.message});
    }
}