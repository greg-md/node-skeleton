#!/usr/bin/env bash

ls -all

mkdir -p /node /node/dist /node/coverage

ls -all

chmod -R 777 /node/dist /node/coverage

ls -all

echo "USER GROUP"
echo $USER
echo $GROUP

chown -R 1001:116 /node/dist /node/coverage

ls -all

npm run test:cov

./scripts/wait-for-it.sh api:3000 -s -t 0 -- \
npm run test:e2e
