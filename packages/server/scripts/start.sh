#!/bin/sh

npx ts-node-dev --require dotenv/config --respawn --transpile-only src/index.ts
