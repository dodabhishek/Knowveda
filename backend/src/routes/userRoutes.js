import express from 'express';
import { getAllUsers, createUser,updateUser } from '../models/user.model.js';

const router = express.Router();

// GET /api/users - fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/createUser', async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.put('/updateUser/:id', async (req, res) => {
    try {
      const user = await updateUser(req.params.id, req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
export default router;
