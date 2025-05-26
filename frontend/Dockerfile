FROM node:18

WORKDIR /app

COPY package.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY vite.config.js ./
COPY . .

RUN npm install
RUN npm run build

RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "3000"]