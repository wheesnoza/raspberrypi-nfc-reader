FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
ENV NODE_ENV=development
COPY package.json package-lock.json* ./
RUN npm ci

FROM deps AS dev
COPY tsconfig.json ./
COPY src ./src
CMD ["npm", "run", "dev"]

FROM deps AS builder
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:20-alpine AS prod
ENV NODE_ENV=production \
    PORT=3000
WORKDIR /app

RUN apk add --no-cache wget

RUN addgroup -S nodegrp && adduser -S nodeuser -G nodegrp
USER nodeuser
COPY --chown=nodeuser:nodegrp package.json ./
RUN npm ci --omit=dev
COPY --chown=nodeuser:nodegrp --from=builder /app/dist ./dist
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://127.0.0.1:${PORT}/health || exit 1

  CMD ["node", "dist/server.js"]
