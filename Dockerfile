FROM node:lts as builder

# Create app directory

WORKDIR /usr/src/app

# Install app dependencies

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

FROM node:lts-slim

# Create app directory

WORKDIR /usr/src/app

# Install app dependencies

COPY package.json yarn.lock ./

RUN yarn

COPY . .

CMD [ "node", "dist/main.js" ]