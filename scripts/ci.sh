#!/usr/bin/env bash

echo "GITHUB_WORKSPACE:"

echo $GITHUB_WORKSPACE

npm run test:cov

./scripts/wait-for-it.sh api:3000 -s -t 0 -- \
npm run test:e2e
