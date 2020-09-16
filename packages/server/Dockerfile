FROM node:lts-alpine
RUN apk --no-cache add openssh=8.1_p1-r0 rsync=3.1.3-r2
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npx pnpm install
COPY src/ ./src/
COPY tsconfig.json tsconfig.build.json webpack.config.ts ./
RUN npx webpack --mode production
RUN npx pnpm prune --production
COPY wilsjs.pem ./

RUN rsync \
  --compress \
  --links \
  --recursive \
  --rsh "ssh -i /app/wilsjs.pem -o StrictHostKeyChecking=accept-new" \
  --verbose \
  /app/node_modules \
  /app/build/* \
  alpine@wils.ca:/home/alpine/

ENTRYPOINT ["/bin/sh"]
