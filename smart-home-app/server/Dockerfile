FROM node:18-alpine

WORKDIR /app/server

COPY package.json ./server

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "dev"]