#!/usr/bin/env bash

chown -R node:node /node
chown -R node:node /node/dist

./scripts/wait-for-it.sh nats:4222 -s -t 0 -- \
npm run start
