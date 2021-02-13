#!/usr/bin/env bash
./scripts/wait-for-it.sh prisma:4466 -s -t 0 -- \
./scripts/wait-for-it.sh prisma-gameplay:4467 -s -t 0 -- \
./scripts/wait-for-it.sh redis:6379 -s -t 0 -- \
npm run migrate && npm run test:cov
