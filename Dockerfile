FROM node:14 AS development

# RUN apt-get update

RUN npm i -g npm@latest

WORKDIR /node
COPY package*.json ./
RUN npm ci && npm cache clean --force
ENV PATH /node/node_modules/.bin:$PATH

COPY . .

FROM development AS production-builder-api

RUN npm run build api

FROM development AS production-builder-micro

RUN npm run build micro

FROM node:14-alpine AS production

# RUN apk update && apk add --no-cache bash

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /node
COPY package*.json ./
RUN npm ci --production && npm cache clean --force

CMD ["node", "main"]

FROM production AS production-api

WORKDIR /node/api
COPY --from=production-builder-api /node/dist/apps/api .
RUN chown -R node:node /node/api
USER node

FROM production AS production-micro

WORKDIR /node/micro
COPY --from=production-builder-micro /node/dist/apps/micro .
RUN chown -R node:node /node/micro
USER node
