import { Router } from 'express';
import { getDB } from '../db/connection.js';

const router = Router();

router.post('/create', async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const db = getDB();
    const collection = db.collection('users');

    const existingUser = await collection.findOne({ sessionId: req.session.id });
    if (existingUser) {
      return res.status(200).json(existingUser);
    }

    const newUser = {
      username,
      sessionId: req.session.id,
      createdAt: new Date(),
      stats: {
        mst: { total: 0, correct: 0 },
        tsp: { total: 0, correct: 0 },
      },
    };

    await collection.insertOne(newUser);
    req.session.username = username;
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection('users');

    const user = await collection.findOne({ sessionId: req.session.id });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

router.delete('/reset', async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection('users');

    const result = await collection.updateOne(
      { sessionId: req.session.id },
      {
        $set: {
          'stats.mst': { total: 0, correct: 0 },
          'stats.tsp': { total: 0, correct: 0 },
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'Progress reset successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset progress' });
  }
});

export default router;