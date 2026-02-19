import { Router } from 'express';

const router = Router();

router.get('/puzzle', (req, res) => {
  res.json({ message: 'TSP puzzle endpoint' });
});

router.post('/submit', (req, res) => {
  res.json({ message: 'TSP submit endpoint' });
});

export default router;