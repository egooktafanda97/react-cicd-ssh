# Gunakan Node.js 20 sebagai base image
FROM node:20
WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 8060

CMD [ "serve", "-s", "dist", "-p", "8060" ]
