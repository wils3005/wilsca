FROM node:lts-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY src/ ./src/
COPY tsconfig.json tsconfig.build.json webpack.config.ts ./
RUN npm run build
RUN npm prune --production

FROM node:lts-alpine
WORKDIR /app
COPY --from=build node_modules/ ./node_modules/
CMD ["node", "server.js"]
