import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js'; // Make sure this path matches your file name

dotenv.config({ path: './config.env' }); // load environment variables from config.env

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log(' MongoDB connected'))
.catch((err) => console.error(' MongoDB connection error:', err));

// Routes
app.use('/api/user', userRoutes); // e.g., /api/register or /api/login

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
