#!/usr/bin/env bash

if [ "$NODE_ENV" == "ci" ]; then
    ./build-deploy/wait-for-it.sh nats:4222 -s -t 0 -- \
    npx concurrently --raw "npm:start:dev -- micro"
else
    ./build-deploy/wait-for-it.sh nats:4222 -s -t 0 -- \
    npx concurrently --raw "npm:start:dev -- api" "npm:start:dev -- micro"
fi
