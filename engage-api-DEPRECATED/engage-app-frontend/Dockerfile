FROM node:12.13-alpine

RUN apk update && apk upgrade

WORKDIR /app

EXPOSE 19000
EXPOSE 19001

COPY package.json .
COPY package-lock.json .

RUN  npm install --global expo-cli

RUN npm install

COPY . .
CMD ["npm", "start"]
