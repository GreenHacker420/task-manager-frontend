import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Fallback configuration using regular React plugin instead of SWC
// Use this if SWC causes build issues in deployment environments
// To use: rename this file to vite.config.ts and rename the current vite.config.ts to vite.config.swc.ts

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Proxy API requests to backend during development
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Optimize build for production
  build: {
    // Output to the dist directory for Netlify deployment
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  // Configure preview server
  preview: {
    port: 8080,
    host: true, // Listen on all addresses
  },
}));
