FROM node:12.13-alpine
RUN apk update && apk upgrade
RUN apk add yarn
WORKDIR /app
COPY package.json .
RUN yarn
COPY . .
CMD ["yarn", "start"]
