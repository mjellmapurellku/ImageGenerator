import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import imageApi from './routes/imageAPI.js';

dotenv.config({ path: './config.env' });

const app = express();
app.use(cors());
app.use(express.json()); // Ensure this is before routes

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' MongoDB connected'))
  .catch((err) => console.error(' MongoDB connection error:', err));

app.use('/api', userRoutes);
app.use('/api/image', imageApi);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});