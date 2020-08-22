FROM node:lts-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY src/ ./src/
COPY tsconfig.json tsconfig.build.json webpack.config.ts ./
RUN npx webpack --mode production
RUN npm prune --production

FROM node:lts-alpine
WORKDIR /app
COPY --from=build /app/node_modules/ ./node_modules/
COPY --from=build /app/build/ ./
CMD ["node", "server.js"]
