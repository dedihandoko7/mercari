FROM node:20.12-alpine
WORKDIR /usr/src/app

COPY package*.json ./
COPY . .
COPY ../shared ./shared
 EXPOSE 3001

RUN npm install
 CMD [ "npm","run","dev"]
