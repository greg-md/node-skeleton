#!/usr/bin/env bash

if [[ -z "${CI_ENV}" ]]; then
    ./scripts/wait-for-it.sh api:3000 -s -t 0 -- \
    npm run test:dev
else
    ./scripts/wait-for-it.sh api:3000 -s -t 0 -- \
    npm run test:ci
fi
