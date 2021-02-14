#!/usr/bin/env bash
mkdir -p /node/coverage
chown -R node:node /node/coverage

npm run test:cov

./scripts/wait-for-it.sh api:3000 -s -t 0 -- \
npm run test:e2e
