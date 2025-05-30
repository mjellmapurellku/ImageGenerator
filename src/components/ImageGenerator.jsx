import React, { useState } from 'react';
import axios from 'axios';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateImage = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/api/image/generate-image', {
        prompt,
      });
      setImages(response.data.images); // Now base64 strings
    } catch (err) {
      setError('Failed to generate images. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Generate Images</h2>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a description (e.g., A futuristic city)"
        style={{ width: '300px', padding: '10px', margin: '10px' }}
      />
      <button
        onClick={handleGenerateImage}
        disabled={loading || !prompt}
        style={{ padding: '10px 20px' }}
      >
        {loading ? 'Generating...' : 'Generate Image'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ marginTop: '20px' }}>
        {images.length > 0 ? (
          images.map((image, index) => (
            <img
              key={index}
              src={`data:image/png;base64,${image}`} // Handle base64 image
              alt={`Generated ${index}`}
              style={{ maxWidth: '300px', margin: '10px' }}
            />
          ))
        ) : (
          <p>No images generated yet.</p>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;
