import { Router } from 'express';
import { User } from '../models/user';

const router = Router();

router.get('', async (_req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});

router.post('', async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create user', error });
  }
});

export default router;
