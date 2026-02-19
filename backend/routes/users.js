import { Router } from 'express';

const router = Router();

router.get('/stats', (req, res) => {
  res.json({ message: 'Users stats endpoint' });
});

router.post('/create', (req, res) => {
  res.json({ message: 'Users create endpoint' });
});

export default router;