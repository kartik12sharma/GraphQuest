import { Router } from 'express';

const router = Router();

router.get('/puzzle', (req, res) => {
  res.json({ message: 'MST puzzle endpoint' });
});

router.post('/submit', (req, res) => {
  res.json({ message: 'MST submit endpoint' });
});

export default router;