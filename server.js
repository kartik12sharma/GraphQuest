import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from '/backend/db/connection.js';
import mstRoutes from './backend/routes/mst.js';
import tspRoutes from './backend/routes/tsp.js';
import userRoutes from './backend/routes/users.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/api/mst', mstRoutes);
app.use('/api/tsp', tspRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

try {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.error('Failed to connect to MongoDB:', error);
  process.exit(1);
}