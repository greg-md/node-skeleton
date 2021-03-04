#!/usr/bin/env bash

if [ "$NODE_ENV" == "ci" ]; then
    ./build-deploy/wait-for-it.sh nats:4222 -s -t 0 -- \
    npx concurrently --raw "npm:test:cov" "npm:test:e2e"
else
    ./build-deploy/wait-for-it.sh nats:4222 -s -t 0 -- \
    npx concurrently --raw "npm:test:watch" "npm:test:e2e -- --watch"
fi
