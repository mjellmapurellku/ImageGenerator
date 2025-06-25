import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        open: true // Optional: Opens browser automatically
    },
    root: '.', // Ensure root is the project directory
    build: {
        outDir: 'dist' // Default output directory
    }
});