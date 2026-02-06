import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Separate config for building the web component bundle
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: false, // Don't clear - we want both builds in dist
    lib: {
      entry: path.resolve(__dirname, 'src/web-component.tsx'),
      name: 'NexaCoreAd',
      fileName: () => 'nexacore-ad.js',
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        assetFileNames: 'nexacore-ad[extname]'
      }
    }
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  }
});
