import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import fetch from 'node-fetch'; // Add this

dotenv.config({ path: './config.env' });

console.log('ATLAS_URI:', process.env.ATLAS_URI);
console.log('PORT:', process.env.PORT);
console.log('JWT_SECRET:', process.env.JWT_SECRET);

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send('<h1>API Server is Running</h1><p>Use /api/user endpoints for registration and login, /api/generate-image for image generation.</p>');
});

// New endpoint for image generation
app.post('/api/generate-image', async (req, res) => {
    try {
        const { prompt } = req.body; // Expect prompt from frontend
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const apiKey = process.env.IMAGE_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'API key not configured' });
        }

        const path = 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image';
        const headers = {
            Accept: 'application/json',
            Authorization: `Bearer ${apiKey}`
        };

        const body = {
            steps: 40,
            width: 1024,
            height: 1024,
            seed: 0, // You can make this dynamic if desired
            cfg_scale: 5,
            samples: 1,
            text_prompts: [
                { text: prompt, weight: 1 },
                { text: 'blurry, bad', weight: -1 }
            ],
        };

        const response = await fetch(path, {
            headers,
            method: 'POST',
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Non-200 response: ${await response.text()}`);
        }

        const responseJSON = await response.json();
        const image = responseJSON.artifacts[0]; // Take the first image

        // Save image locally (optional, for debugging)
        const fs = require('fs');
        const outputPath = `./out/txt2img_${image.seed}.png`;
        if (!fs.existsSync('./out')) fs.mkdirSync('./out');
        fs.writeFileSync(outputPath, Buffer.from(image.base64, 'base64'));

        // Return image URL or base64 data to frontend
        const imageUrl = `http://localhost:5000/images/txt2img_${image.seed}.png`; // Serve via backend
        res.json({ imageUrl });
    } catch (error) {
        console.error('Image generation error:', error.message);
        res.status(500).json({ error: 'Failed to generate image' });
    }
});

// Serve static images (optional)
app.use('/images', express.static('out'));

mongoose
    .connect(process.env.ATLAS_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});