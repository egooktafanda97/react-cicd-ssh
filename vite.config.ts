import { AliasOptions, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//@ts-ignore
import path from "path";
//@ts-ignore
const root = path.resolve(__dirname, "src");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/sso/",
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
    host: true,
    allowedHosts: true,
  },
  server: {
    port: 8060,
    strictPort: true,
<<<<<<< HEAD
    host: true,
    allowedHosts: true,
=======
    host: true
>>>>>>> 824c6bfeb5068f1f1044b60185b0684245fdc6b9
  },
});
