#!/usr/bin/env bash
./scripts/wait-for-it.sh nats:4222 -s -t 0 -- \
npm run start
