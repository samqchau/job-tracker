#Dockerfile for React client

#Build react client
FROM node:10.16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent

#copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["npm", "start"]