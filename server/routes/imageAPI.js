import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await axios.post(
      'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image',
      {
        text_prompts: [{ text: prompt }],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        steps: 30,
        samples: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    console.log('Stability AI response:', response.data);
    const images = response.data.artifacts.map((artifact) => artifact.base64); // Base64 images
    res.json({ images });
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

export default router;