FROM node:19

WORKDIR /src

ADD package.json /src

COPY . .
RUN npm install --production
RUN npm run build

ADD . /src

EXPOSE 3000

CMD ["npm", "start"]