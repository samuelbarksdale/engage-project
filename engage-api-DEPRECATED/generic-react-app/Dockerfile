FROM node:12.13-alpine
RUN apk update && apk upgrade
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]
