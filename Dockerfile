# Gunakan Node.js 20 sebagai base image
FROM node:20

# Set working directory di dalam container
WORKDIR /app

# Install PM2 secara global
RUN npm install -g pm2

# Salin hanya package.json dan package-lock.json untuk menginstal dependencies
COPY package.json package-lock.json ./

# Install dependencies tanpa devDependencies (karena sudah dibangun di luar Docker)
RUN npm install --omit=dev

# Salin direktori build hasil dari proses build di luar Docker
COPY dist ./dist

# Perintah untuk menjalankan PM2 dan serve build Vite React
CMD ["pm2-runtime", "serve", "dist", "--spa", "--port", "8060"]
