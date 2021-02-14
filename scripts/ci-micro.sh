#!/usr/bin/env bash

mkdir -p /node/dist

./scripts/wait-for-it.sh nats:4222 -s -t 0 -- \
npm run start:micro
