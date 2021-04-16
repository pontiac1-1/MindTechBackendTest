FROM node:alpine

WORKDIR /usr/src/app

COPY package.json package.json

RUN npm install

RUN npm install -g typeorm

COPY . .

CMD npm run prestart:prod && typeorm migration:run && node dist/main.js