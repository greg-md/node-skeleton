#!/usr/bin/env bash

if [ "$NODE_ENV" == "ci" ]; then
    ./build-deploy/wait-for-it.sh api:3000 -s -t 0 -- \
    npm run test:ci
else
    ./build-deploy/wait-for-it.sh api:3000 -s -t 0 -- \
    npm run test:dev
fi
