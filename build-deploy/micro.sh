#!/usr/bin/env bash
./build-deploy/wait-for-it.sh nats:4222 -s -t 0 -- \
npm run start:dev micro
