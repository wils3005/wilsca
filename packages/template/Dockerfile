FROM node:lts-alpine as build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY src/ ./src/
COPY tsconfig.json tsconfig.build.json webpack.config.ts ./
RUN npm run build

FROM node:lts-alpine
WORKDIR /app
COPY --from=build node_modules/ ./node_modules/
COPY --from=build build/ ./
CMD ["node", "server.js"]
