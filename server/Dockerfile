#  Dockerfile for Node Express Backend

FROM node:12.18.2-alpine3.12

# Create App Directory
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN npm install --silent

# Copy app source code
COPY . .

# Exports
EXPOSE 5000

CMD ["npm","start"]