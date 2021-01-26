FROM node:current-alpine AS build
WORKDIR /app

COPY package.json ./
RUN npx pnpm install

COPY src/ ./src/
COPY tsconfig.json webpack.config.ts ./
RUN npm run build

RUN pnpm prune --production

FROM node:current-alpine
WORKDIR /app
COPY --from=build dist/* ./
COPY --from=build node_modules/ ./node_modules/

ENTRYPOINT [ "true" ]
