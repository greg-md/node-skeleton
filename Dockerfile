FROM node:14 AS builder

RUN apt-get update

RUN npm i -g npm@latest

RUN npm i -g @nestjs/cli

RUN mkdir -p /node /node/dist

RUN chown -R node:node /node

USER node

WORKDIR /node
COPY package*.json ./
ENV PATH /node/node_modules/.bin:$PATH

FROM builder AS development

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

RUN npm ci && npm cache clean --force

COPY . .

COPY ./scripts/docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]

FROM development AS dev-api

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

CMD ["./scripts/dev-api.sh"]

FROM development AS dev-micro

CMD ["./scripts/dev-micro.sh"]

FROM development AS ci

ARG NODE_ENV=ci
ENV NODE_ENV $NODE_ENV

CMD ["./scripts/ci.sh"]

FROM builder AS prod-builder

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

RUN npm ci && npm cache clean --force

COPY . .

RUN npm run build api
RUN npm run build micro

FROM node:14-alpine AS production

RUN apk update && apk add --no-cache bash

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

COPY ./scripts/docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]

COPY ./scripts/healthcheck.js /healthcheck.js
HEALTHCHECK --interval=30s CMD node /healthcheck.js

FROM production AS prod-api

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

WORKDIR /node/api
COPY --from=production-build /node/dist/apps/api .
RUN chown -R node:node /node/api
USER node

CMD ["node", "main"]

FROM production AS prod-micro

WORKDIR /node/micro
COPY --from=production-build /node/dist/apps/micro .
RUN chown -R node:node /node/micro
USER node

CMD ["node", "main"]
