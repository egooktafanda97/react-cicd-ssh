import { AliasOptions, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//@ts-ignore
import path from "path";
//@ts-ignore
const root = path.resolve(__dirname, "src");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      "@": root,
    } as AliasOptions,
  },
  preview: {
    port: 8060,
    strictPort: true,
  },
  server: {
    port: 8060,
    strictPort: true,
    host: true
  },
});
