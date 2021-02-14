#!/usr/bin/env bash

ls -all

mkdir -p /node /node/dist /node/coverage

ls -all

chmod -R 777 /node/dist /node/coverage

ls -all

npm run test:cov

./scripts/wait-for-it.sh api:3000 -s -t 0 -- \
npm run test:e2e
