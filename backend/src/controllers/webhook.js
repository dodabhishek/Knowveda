import { Webhook } from 'svix';
import 'dotenv/config';
import { createUser, updateUser, deleteUser } from '../models/user.model.js'; 

const clerkWebhooks = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const evt = await wh.verify(
      JSON.stringify(req.body),
      {
        'svix-id': req.headers['svix-id'],
        'svix-timestamp': req.headers['svix-timestamp'],
        'svix-signature': req.headers['svix-signature']
      }
    );

    const { data, type } = evt;

    switch (type) {
      case 'user.created': {
        const userData = {
          id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image_url: data.image_url
        };

        await createUser(userData);
        console.log('New user created:', userData);
        break;
      }

      case 'user.updated': {
        const updatedData = {
          name: `${data.first_name} ${data.last_name}`,
          email: data.email_addresses[0].email_address,
          image_url: data.image_url
        };

        await updateUser(data.id, updatedData);
        console.log(` User updated: ${data.id}`);
        break;
      }

      case 'user.deleted': {
        await deleteUser(data.id);
        console.log(`🗑️ User deleted: ${data.id}`);
        break;
      }

      default:
        console.log(' Unhandled event type:', type);
    }

    res.status(200).json({ message: 'Webhook processed' });
  } catch (error) {
    console.error(' Webhook error:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export default clerkWebhooks;
