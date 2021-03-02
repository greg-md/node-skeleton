#!/usr/bin/env bash

if [ "$NODE_ENV" == "ci" ]; then
    ./scripts/wait-for-it.sh api:3000 -s -t 0 -- \
    npm run test:ci
else
    ./scripts/wait-for-it.sh api:3000 -s -t 0 -- \
    npm run test:dev
fi
