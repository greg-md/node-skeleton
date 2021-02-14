#!/usr/bin/env bash

mkdir -p /node /node/dist /node/coverage

chmod -R 777 /node/dist /node/coverage

npm run test:cov

./scripts/wait-for-it.sh api:3000 -s -t 0 -- \
npm run test:e2e
