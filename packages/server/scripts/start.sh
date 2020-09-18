#!/bin/sh

../../node_modules/ts-node-dev/bin/ts-node-dev \
  --require dotenv/config \
  --respawn \
  --transpile-only \
  src/index.ts
