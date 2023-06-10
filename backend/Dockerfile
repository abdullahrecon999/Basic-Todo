FROM node:19-buster-slim

LABEL maintainer="Abdullah"
LABEL version="1.0"
LABEL description="This is the backend server for the TODO app"

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV MONGOURI=mongodb://mongo:27017/todo
EXPOSE 3000
CMD [ "npm", "start" ]