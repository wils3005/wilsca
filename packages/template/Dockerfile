FROM node:lts-alpine AS install
WORKDIR /app
COPY packages/ ./packages/
COPY lerna.json package.json package-lock.json ./
RUN npx lerna exec "npm ci"
RUN npm ci

FROM node:lts-alpine AS build
WORKDIR /app
COPY --from=install /app/node_modules/ ./node_modules/
ARG PACKAGE_NAME=""
ARG ROOT="packages/$PACKAGE_NAME"
COPY $ROOT/src/ ./src/
COPY $ROOT/package.json $ROOT/tsconfig.json $ROOT/tsconfig.build.json $ROOT/webpack.config.ts ./
RUN npx ts-node --require dotenv/config node_modules/.bin/webpack --mode production
RUN npm prune --production

FROM node:lts-alpine
WORKDIR /app
ARG PACKAGE_NAME=""
ARG ROOT="packages/$PACKAGE_NAME"
COPY --from=build $ROOT/node_modules/ ./node_modules/
COPY --from=build $ROOT/build/ ./
CMD ["node", "server.js"]
