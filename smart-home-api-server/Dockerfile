FROM node:18-alpine

#Create an app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 5000

CMD ["npm", "start"]