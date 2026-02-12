# Backend Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat python3 make g++ openssl
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Generate Prisma Client
COPY prisma ./prisma/
COPY prisma.config.ts ./
RUN npx prisma generate

# Build the source code
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nestjs
RUN adduser --system --uid 1001 nestjs

# Copy built application
COPY --from=builder --chown=nestjs:nestjs /app/dist ./dist
COPY --from=builder --chown=nestjs:nestjs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nestjs /app/package.json ./package.json
COPY --from=builder --chown=nestjs:nestjs /app/prisma ./prisma
COPY --from=builder --chown=nestjs:nestjs /app/prisma.config.ts ./prisma.config.ts

USER nestjs

EXPOSE 5000

CMD ["node", "dist/main"]