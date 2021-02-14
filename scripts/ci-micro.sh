#!/usr/bin/env bash
sudo chown -R $USER /node

./scripts/wait-for-it.sh nats:4222 -s -t 0 -- \
npm run start:micro
