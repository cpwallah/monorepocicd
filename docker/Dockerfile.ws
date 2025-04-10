FROM node:22-slim

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY ./packages ./packages
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml

COPY ./packages.json ./packages.json
COPY ./turbo.json ./turbo.json

COPY ./apps/ws ./apps/ws

RUN pnpm install
RUN cd packages/db && pnpm prisma generate && cd ../..
RUN pnpm run build

EXPOSE 8081

CMD ["pnpm","start"]