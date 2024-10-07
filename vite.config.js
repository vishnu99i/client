// import path from "path";
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });


// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy requests to /api/jokes to your backend
      '/api': {
        target: 'https://server-app-six.vercel.app',
        changeOrigin: true,
        secure: false,  // If using HTTPS and self-signed certificates, set this to false
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
});